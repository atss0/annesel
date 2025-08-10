import { notFound } from 'next/navigation'
import { getBlogPostBySlug } from '@/lib/api'
import { Metadata } from 'next'
import Breadcrumb from '@/components/breadcrumb'
import Image from 'next/image'
import { Clock, User, Calendar, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Comments from '@/components/comments/comments'
import styles from '@/styles/wordpress-content.module.css'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const post = await getBlogPostBySlug(resolvedParams.slug)

  if (!post) {
    return {
      title: 'Yazı Bulunamadı - Annesel'
    }
  }

  const title = post.title.rendered
  const description = post.excerpt?.rendered?.replace(/<[^>]+>/g, '')?.slice(0, 160) || 'Annesel blog yazısı'
  const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/logo.png'
  const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Genel'
  const publishedTime = post.date
  const modifiedTime = post.modified

  return {
    title,
    description,
    keywords: [
      'annelik',
      'bebek bakımı',
      'hamilelik',
      'çocuk gelişimi',
      'anne sağlığı',
      category.toLowerCase()
    ],
    authors: [{ name: 'Annesel Ekibi' }],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/blog/${resolvedParams.slug}`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime,
      modifiedTime,
      section: category,
      tags: [category, 'annelik', 'bebek bakımı'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: `/blog/${resolvedParams.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const post = await getBlogPostBySlug(resolvedParams.slug)

  if (!post) return notFound()

  const category = post._embedded?.['wp:term']?.[0]?.[0]
  const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
  const publishDate = new Date(post.date)
  const modifiedDate = new Date(post.modified)

  // Calculate reading time
  const wordCount = post.content.rendered.replace(/<[^>]*>/g, '').split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 200)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title.rendered,
    description: post.excerpt?.rendered?.replace(/<[^>]+>/g, '')?.slice(0, 160),
    image: image,
    datePublished: post.date,
    dateModified: post.modified,
    wordCount: wordCount,
    author: {
      '@type': 'Organization',
      name: 'Annesel',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Annesel',
      logo: {
        '@type': 'ImageObject',
        url: 'https://annesel.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://annesel.com/blog/${resolvedParams.slug}`,
    },
    articleSection: category?.name,
    keywords: [category?.name, 'annelik', 'bebek bakımı'].filter(Boolean).join(', '),
  }

  const breadcrumbItems = [
    { label: 'Blog', href: '/blog' },
    ...(category ? [{ label: category.name, href: `/kategori/${category.slug}` }] : []),
    { label: post.title.rendered }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <article className="max-w-4xl mx-auto">
          {/* Featured Image */}
          {image && (
            <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={image || "/placeholder.svg"}
                alt={post.title.rendered}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <header className="mb-8">
            {/* Category Badge */}
            {category && (
              <div className="mb-4">
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                  <Tag className="h-3 w-3 mr-1" />
                  {category.name}
                </Badge>
              </div>
            )}

            <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900 leading-tight">
              {post.title.rendered}
            </h1>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 pb-6 border-b border-gray-200">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>Annesel Ekibi</span>
              </div>

              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <time dateTime={post.date}>
                  {publishDate.toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>

              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{readingTime} dakika okuma</span>
              </div>

              {post.modified !== post.date && (
                <div className="text-xs text-gray-500">
                  Güncellendi: {modifiedDate.toLocaleDateString('tr-TR')}
                </div>
              )}
            </div>
          </header>

          {/* Article Content */}
          <div
            className={styles.wordpressContent}
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Bu makale {wordCount} kelime içeriyor ve yaklaşık {readingTime} dakikada okunabilir.
              </div>

              {category && (
                <div className="text-sm">
                  <span className="text-gray-600">Kategori: </span>
                  <a
                    href={`/kategori/${category.slug}`}
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    {category.name}
                  </a>
                </div>
              )}
            </div>
          </footer>

          <section className="mt-16">
            <Comments postId={post.id} />
          </section>
        </article>
      </div>
    </>
  )
}
