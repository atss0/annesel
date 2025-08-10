// components/FeaturedPosts.tsx
import { getAllPosts } from '@/lib/api'
import FeaturedPostsClient from './featured-posts-client'

export default async function FeaturedPosts() {
  const allPosts = await getAllPosts()

  // Görsel ve yazar içermeyenleri filtrele
  const filtered = allPosts.filter(
    (post: any) =>
      post._embedded?.['wp:featuredmedia']?.[0]?.source_url &&
      post._embedded?.author?.[0]?.name
  )

  function getReadingTime(htmlContent: string): string {
    const text = htmlContent.replace(/<[^>]*>/g, '') // HTML etiketlerini kaldır
    const wordCount = text.trim().split(/\s+/).length
    const minutes = Math.ceil(wordCount / 200)
    return `${minutes} dk`
  }

  // Rastgele sırala ve 3 tanesini al
  const selectedPosts = filtered.sort(() => 0.5 - Math.random()).slice(0, 3)

  const postsWithReadTime = selectedPosts.map((post: any) => ({
    ...post,
    readTime: getReadingTime(post.content.rendered),
  }))

  return <FeaturedPostsClient posts={postsWithReadTime} />
}