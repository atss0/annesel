import { CATEGORIES_BY_URL } from "@/data/categories";

const API_URL = process.env.WORDPRESS_API_URL

export async function getAllPosts() {
  const res = await fetch(`${API_URL}/posts?_embed`, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error('Yazılar çekilemedi')
  return res.json()
}

export async function getPaginatedPosts(page: number = 1, perPage: number = 20) {
  const res = await fetch(`${process.env.WORDPRESS_API_URL}/posts?_embed&page=${page}&per_page=${perPage}`, {
    next: { revalidate: 60 }
  })

  if (!res.ok) throw new Error('Yazılar alınamadı')

  const totalPosts = Number(res.headers.get('X-WP-Total')) // toplam yazı
  const totalPages = Number(res.headers.get('X-WP-TotalPages')) // toplam sayfa
  const posts = await res.json()

  return { posts, totalPages }
}

export async function getBlogPostBySlug(slug: string) {
  const res = await fetch(`${API_URL}/posts?slug=${slug}&_embed`)
  const posts = await res.json()
  return posts[0] || null
}

export async function getPostsByCategorySlug(slug: string) {
  const cat = CATEGORIES_BY_URL[slug as keyof typeof CATEGORIES_BY_URL];
  if (!cat) return [];

  const base = process.env.WORDPRESS_API_URL; // https://example.com/wp-json/wp/v2
  const url = new URL(`${base}/posts`);
  url.searchParams.set('categories', String(cat.id));
  url.searchParams.set('per_page', '10');
  url.searchParams.set('_embed', '1');
  url.searchParams.set('status', 'publish');

  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) return [];
  return res.json();
}

export async function getPostById(id: string) {
  const res = await fetch(`${API_URL}/posts/${id}?_embed`)
  if (!res.ok) throw new Error('Yazı bulunamadı')
  return res.json()
}

export async function getSiteSettings() {
  const res = await fetch(process.env.WORDPRESS_API_URL?.replace('/wp/v2', '') || '')
  if (!res.ok) throw new Error('Site ayarları alınamadı')
  return res.json()
}

export async function getCategories() {
  const res = await fetch(`${process.env.WORDPRESS_BASE_URL}/wp/v2/categories`)
  if (!res.ok) throw new Error('Kategoriler alınamadı')
  return res.json()
}

export async function getPostsBySearch(query: string) {
  const res = await fetch(`${process.env.WORDPRESS_API_URL}/posts?search=${encodeURIComponent(query)}&_embed`)
  if (!res.ok) return []
  return res.json()
}

export async function getPageBySlug(slug: string) {
  const res = await fetch(`${process.env.WORDPRESS_API_URL}/pages?slug=${slug}`)
  if (!res.ok) throw new Error("Sayfa bulunamadı")
  const data = await res.json()
  return data[0] // çünkü tek sayfa gelir
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  const categories = await getCategories()

  return {
    posts: posts.map((post: any) => ({
      slug: post.slug,
    })),
    categories: categories
      .filter((cat: any) => cat.slug !== 'uncategorized')
      .map((category: any) => ({
        slug: category.slug,
      })),
  }
}