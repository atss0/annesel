// lib/api.ts (OPTIMIZE: ISR + _fields + dedupe + tags)
import { cache } from 'react';

const WP_V2 = (process.env.WORDPRESS_API_URL || '').replace(/\/$/, '');        // .../wp-json/wp/v2
if (!WP_V2) throw new Error('WORDPRESS_API_URL missing');
const API_ROOT = WP_V2.replace(/\/wp\/v2$/, '');                               // .../wp-json

// Küçük yardımcı: URL kurucu
function buildUrl(path: string, params?: Record<string, string | number | undefined>) {
  const u = new URL(path, WP_V2 + '/');
  if (params) for (const [k, v] of Object.entries(params)) if (v !== undefined) u.searchParams.set(k, String(v));
  return u.toString();
}

// ---------- SITE ----------
export const getSiteSettings = cache(async () => {
  const res = await fetch(API_ROOT, { next: { revalidate: 3600, tags: ['wp:site'] } });
  if (!res.ok) throw new Error('Site ayarları alınamadı');
  const j = await res.json() as { name?: string; description?: string; url?: string; home?: string };
  return {
    name: j.name ?? 'Site',
    description: j.description ?? '',
    url: j.home || j.url || process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  };
});

// ---------- CATEGORIES ----------
export const getCategories = cache(async () => {
  const url = buildUrl('categories', {
    per_page: 100,
    orderby: 'name',    // alfabetik
    order: 'asc',
    // description'ı da çekiyoruz
    _fields: 'id,name,slug,count,description',
  });

  const res = await fetch(url, { next: { revalidate: 300, tags: ['wp:categories'] } });
  if (!res.ok) throw new Error('Kategoriler alınamadı');

  const data = await res.json() as { id:number; name:string; slug:string; count:number; description?:string }[];
  return data.filter(c => c.slug.toLowerCase() !== 'uncategorized'); // sabit: uncategorized hariç
});

// ---------- POSTS (LISTE) ----------
export const getAllPosts = cache(async () => {
  // NOT: “tüm yazılar” çok büyük olabilir; yine de _fields ile hafiflettik
  const url = buildUrl('posts', {
    per_page: 20,                       // istersen artır ↓
    _fields: 'id,slug,title,date,excerpt,author,featured_media,categories',
    status: 'publish',
  });
  const res = await fetch(url, { next: { revalidate: 60, tags: ['wp:posts'] } });
  if (!res.ok) throw new Error('Yazılar çekilemedi');
  return res.json();
});

export async function getPaginatedPosts(page = 1, perPage = 20) {
  const url = buildUrl('posts', {
    page, per_page: perPage,
    status: 'publish',
    _fields: 'id,slug,title,date,excerpt,author,featured_media,categories',
  });
  const res = await fetch(url, { next: { revalidate: 60, tags: ['wp:posts'] } });
  if (!res.ok) throw new Error('Yazılar alınamadı');

  const totalPages = Number(res.headers.get('X-WP-TotalPages') || 0);
  const posts = await res.json();
  return { posts, totalPages };
}

// ---------- POSTS (TEKIL) ----------
export async function getBlogPostBySlug(slug: string) {
  // Tekil içerikte _embed işine yarıyor; yine de alanları kısıtlayalım
  const url = buildUrl('posts', {
    slug,
    _embed: 1,
    _fields:
      'id,slug,title,date,content,excerpt,author,featured_media,categories,tags,_links',
  });
  const res = await fetch(url, { next: { revalidate: 60, tags: [`wp:post:${slug}`] } });
  if (!res.ok) return null;
  const posts = await res.json();
  return posts?.[0] || null;
}

export async function getPostById(id: string) {
  const u = new URL(`posts/${id}`, WP_V2 + '/');
  u.searchParams.set('_embed', '1');
  u.searchParams.set(
    '_fields',
    'id,slug,title,date,content,excerpt,author,featured_media,categories,tags,_links'
  );
  const res = await fetch(u.toString(), { next: { revalidate: 60, tags: [`wp:post-id:${id}`] } });
  if (!res.ok) throw new Error('Yazı bulunamadı');
  return res.json();
}

// ---------- POSTS (KATEGORI) ----------
import { CATEGORIES_BY_URL } from '@/data/categories';
// Daha hızlı kategori listesi: _embed yok, toplu media fetch
export async function getPostsByCategorySlug(slug: string) {
  const cat = CATEGORIES_BY_URL[slug as keyof typeof CATEGORIES_BY_URL];
  if (!cat) return [];

  const base = process.env.WORDPRESS_API_URL!.replace(/\/$/, ''); // .../wp-json/wp/v2

  // 1) Post listesi: minimal alanlar + featured_media ID
  const listUrl = new URL(`${base}/posts`);
  listUrl.searchParams.set('categories', String(cat.id));
  listUrl.searchParams.set('per_page', '10');
  listUrl.searchParams.set('status', 'publish');
  listUrl.searchParams.set(
    '_fields',
    'id,slug,date,title.rendered,excerpt.rendered,featured_media'
  );

  const res = await fetch(listUrl.toString(), {
    next: { revalidate: 120, tags: [`wp:cat:${cat.id}`] }, // revalidate süresini biraz artırdık
  });
  if (!res.ok) return [];
  const posts: any[] = await res.json();

  // Medya ID'leri yoksa direkt dön
  const mediaIds = [...new Set(posts.map(p => p.featured_media).filter(Boolean))];
  if (mediaIds.length === 0) {
    return posts.map(p => ({ ...p, _image: null }));
  }

  // 2) Tek seferde medya bilgileri
  // Not: WP REST include param’ı "1,2,3" şeklinde çalışır
  const mediaUrl = new URL(`${base}/media`);
  mediaUrl.searchParams.set('include', mediaIds.join(','));
  mediaUrl.searchParams.set(
    '_fields',
    'id,source_url,media_details.sizes.medium_large.source_url,media_details.sizes.full.source_url'
  );

  const mres = await fetch(mediaUrl.toString(), {
    next: { revalidate: 300, tags: mediaIds.map(id => `wp:media:${id}`) },
  });
  const medias: any[] = mres.ok ? await mres.json() : [];
  const mediaMap = new Map<number, any>(medias.map(m => [m.id, m]));

  // 3) Postlara görseli iliştir
  return posts.map(p => {
    const m = mediaMap.get(p.featured_media);
    const img =
      m?.media_details?.sizes?.medium_large?.source_url ||
      m?.source_url ||
      m?.media_details?.sizes?.full?.source_url ||
      null;

    return { ...p, _image: img };
  });
}

// ---------- SEARCH ----------
export async function getPostsBySearch(query: string) {
  const url = buildUrl('posts', {
    search: encodeURIComponent(query),
    status: 'publish',
    _fields: 'id,slug,title,date,excerpt,author,featured_media,categories',
  });
  const res = await fetch(url, { next: { revalidate: 60, tags: ['wp:search'] } });
  if (!res.ok) return [];
  return res.json();
}

// ---------- PAGES ----------
export async function getPageBySlug(slug: string) {
  const url = buildUrl('pages', {
    slug,
    _fields: 'id,slug,title,content,excerpt,date',
  });
  const res = await fetch(url, { next: { revalidate: 600, tags: [`wp:page:${slug}`] } });
  if (!res.ok) throw new Error('Sayfa bulunamadı');
  const data = await res.json();
  return data?.[0] || null;
}

// ---------- STATIC PARAMS (Hafif versiyon) ----------
export async function generateStaticParams() {
  // Minimal veri: sadece slug’lar (ilk sayfa — gerekirse artır)
  const postsUrl = buildUrl('posts', {
    per_page: 100,
    _fields: 'slug',
    status: 'publish',
  });
  const catsUrl = buildUrl('categories', {
    per_page: 100,
    _fields: 'slug',
  });

  const [postsRes, catsRes] = await Promise.all([
    fetch(postsUrl, { next: { revalidate: 3600 } }),
    fetch(catsUrl, { next: { revalidate: 3600 } }),
  ]);
  if (!postsRes.ok) throw new Error('Yazılar alınamadı');
  if (!catsRes.ok) throw new Error('Kategoriler alınamadı');

  const posts = await postsRes.json() as { slug: string }[];
  const categories = await catsRes.json() as { slug: string }[];

  return {
    posts: posts.map(p => ({ slug: p.slug })),
    categories: categories
      .filter(c => c.slug !== 'uncategorized')
      .map(c => ({ slug: c.slug })),
  };
}