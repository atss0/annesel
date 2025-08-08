import { MetadataRoute } from 'next'
import { getAllPosts, getCategories } from '@/lib/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://annesel.com' // Replace with your actual domain

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/gizlilik`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/kullanim-sartlari`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // Blog posts
  const posts = await getAllPosts()
  const postPages = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.modified),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Categories
  const categories = await getCategories()
  const categoryPages = categories
    .filter((cat: any) => cat.slug !== 'uncategorized')
    .map((category: any) => ({
      url: `${baseUrl}/kategori/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  return [...staticPages, ...postPages, ...categoryPages]
}