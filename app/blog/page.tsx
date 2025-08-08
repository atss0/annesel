// app/blog/page.tsx

import { headers } from 'next/headers'
import { getPaginatedPosts } from '@/lib/api'
import BlogClient from '@/components/blog-client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog Yazıları - Annelik Rehberi ve Uzman Tavsiyeleri',
  description: 'Annelik yolculuğunuzda size rehberlik eden blog yazıları. Hamilelik, bebek bakımı, çocuk gelişimi ve anne sağlığı hakkında uzman tavsiyeleri ve deneyimler.',
  keywords: [
    'anne blog',
    'annelik yazıları',
    'bebek bakımı blog',
    'hamilelik blog',
    'çocuk gelişimi yazıları',
    'anne sağlığı blog',
    'ebeveynlik tavsiyeleri',
    'annelik deneyimleri'
  ],
  openGraph: {
    title: 'Blog Yazıları - Annelik Rehberi ve Uzman Tavsiyeleri',
    description: 'Annelik yolculuğunuzda size rehberlik eden blog yazıları ve uzman tavsiyeleri.',
    type: 'website',
    url: '/blog',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Annesel Blog Yazıları',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Yazıları - Annelik Rehberi',
    description: 'Annelik yolculuğunuzda size rehberlik eden blog yazıları ve uzman tavsiyeleri.',
  },
  alternates: {
    canonical: '/blog',
  },
}

export default async function BlogPage() {
  const headersList = headers()
  const url = new URL((await headersList).get('x-url') || 'http://localhost:3000')
  const pageParam = url.searchParams.get('page') || '1'
  const currentPage = parseInt(pageParam, 10) || 1

  const { posts, totalPages } = await getPaginatedPosts(currentPage)

  return <BlogClient posts={posts} totalPages={totalPages} currentPage={currentPage} />
}
