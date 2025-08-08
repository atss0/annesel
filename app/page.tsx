import { Metadata } from 'next'
import Hero from '@/components/hero'
import FeaturedPosts from '@/components/featured-posts'
import Categories from '@/components/categories'
import Newsletter from '@/components/newsletter'

export const metadata: Metadata = {
  title: 'Annesel - Anne ve Çocuk Blog Sitesi | Annelik Rehberi',
  description: 'Annelik yolculuğunuzda size rehberlik eden Annesel blog sitesi. Hamilelik, bebek bakımı, çocuk gelişimi ve anne sağlığı hakkında uzman tavsiyeleri ve deneyimler.',
  keywords: [
    'annelik',
    'bebek bakımı',
    'hamilelik',
    'çocuk gelişimi',
    'anne sağlığı',
    'ebeveynlik',
    'doğum',
    'emzirme',
    'bebek beslenmesi',
    'çocuk psikolojisi',
    'hamilelik takibi',
    'bebek uyku düzeni',
    'anne blog',
    'çocuk bakımı'
  ],
  openGraph: {
    title: 'Annesel - Anne ve Çocuk Blog Sitesi | Annelik Rehberi',
    description: 'Annelik yolculuğunuzda size rehberlik eden uzman tavsiyeleri ve deneyimler. Hamilelik, bebek bakımı, çocuk gelişimi hakkında güncel bilgiler.',
    type: 'website',
    locale: 'tr_TR',
    url: '/',
    siteName: 'Annesel',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Annesel - Anne ve Çocuk Blog Sitesi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Annesel - Anne ve Çocuk Blog Sitesi',
    description: 'Annelik yolculuğunuzda size rehberlik eden uzman tavsiyeleri ve deneyimler.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedPosts />
      <Categories />
      <Newsletter />
    </main>
  )
}
