import { getPostsBySearch } from '@/lib/api'

export default async function AramaPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams // Await searchParams here
  const query = params.q || ''
  const posts = await getPostsBySearch(query)

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">
      {"\""}{query}{"\""} için sonuçlar
      </h1>
      {posts.length === 0 ? (
        <p>Sonuç bulunamadı.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post: any) => (
            <li key={post.id} className="border p-4 rounded shadow">
              <a href={`/blog/${post.slug}`} className="text-lg font-semibold text-purple-700 hover:underline">
                {post.title.rendered}
              </a>
              <div
                className="text-sm text-gray-600 mt-2"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}