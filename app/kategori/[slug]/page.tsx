// app/kategori/[slug]/page.tsx (örnek yol)
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPostsByCategorySlug, getCategories } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User, ArrowRight } from 'lucide-react';

export const revalidate = 300;

// ---- METADATA
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const categories = await getCategories();
  const category = categories.find((c: any) => c.slug === params.slug);

  if (!category) {
    return { title: 'Kategori Bulunamadı - Annesel' };
  }

  const title = `${category.name} - Annelik Rehberi ve Uzman Tavsiyeleri`;
  const description = category.description?.trim()
    || `${category.name} kategorisindeki annelik yazılarını keşfedin. Uzman tavsiyeleri ve deneyimler.`;

  return {
    title,
    description,
    keywords: [
      category.name.toLowerCase(),
      'annelik','bebek bakımı','hamilelik','çocuk gelişimi','anne sağlığı','ebeveynlik'
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `/kategori/${params.slug}`,
      images: [{ url: '/logo.png', width: 1200, height: 630, alt: `${category.name} - Annesel` }],
    },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: `/kategori/${params.slug}` },
    robots: { index: true, follow: true },
  };
}

// ---- PAGE
export default async function CategoryPage({ params }: { params: { slug?: string } }) {
  const slug = params.slug;
  if (!slug || slug === 'uncategorized') notFound();

  const categories = await getCategories();
  const category = categories.find((c: any) => c.slug === slug);
  if (!category) notFound();

  const posts = await getPostsByCategorySlug(slug);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-6">
            <span className="text-2xl font-bold">{category.name[0]}</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{category.name}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {category.description?.trim() || 'Bu kategorideki içerikleri keşfedin.'}
          </p>
          <div className="mt-6">
            <Badge className="bg-purple-100 text-purple-600 border-0 px-4 py-2">
              {posts.length} makale
            </Badge>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => {
                const image =
                  post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.medium_large?.source_url ||
                  post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
                  post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.full?.source_url ||
                  '/placeholder.svg';

                const author = 'Annesel Ekibi';
                const date = new Date(post.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
                const excerpt = (post.excerpt?.rendered || '').replace(/(<([^>]+)>)/gi, '');
                const title = post.title?.rendered || 'Başlık';

                return (
                  <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden relative p-0">
                    <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10" />
                    <div className="relative overflow-hidden">
                      <Image
                        src={image}
                        alt={title}
                        width={400}
                        height={300}
                        sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                        className="w-full object-cover transition-transform duration-300 group-hover:scale-105 lg:h-80 h-48"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-purple-100 text-purple-600 border-0">{category.name}</Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-200 line-clamp-2">
                        <Link href={`/blog/${post.slug}`}>{title}</Link>
                      </h3>

                      <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">{excerpt}</p>

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center"><User className="h-3 w-3 mr-1" />{author}</div>
                          <div className="flex items-center"><Clock className="h-3 w-3 mr-1" />3 dk okuma</div>
                        </div>
                        <div>{date}</div>
                      </div>

                      <Link href={`/blog/${post.slug}`} className="flex items-center text-purple-600 hover:text-purple-700 font-medium text-sm group-hover:translate-x-1 transition-transform duration-200">
                        Devamını Oku <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📝</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Henüz İçerik Yok</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">Bu kategoride henüz yayınlanmış makale bulunmuyor. Yakında yeni içerikler eklenecek.</p>
              <Link href="/blog" className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-medium transition-colors duration-200">
                Tüm Blog Yazılarını Gör <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}