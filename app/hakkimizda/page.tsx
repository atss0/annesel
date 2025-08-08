import { getPageBySlug } from '@/lib/api'
import { notFound } from 'next/navigation'

export default async function HakkimizdaPage() {
  const page = await getPageBySlug('hakkimizda')
  if (!page) return notFound()

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">{page.title.rendered}</h1>
      <div
        className="prose max-w-none break-words overflow-hidden"
        dangerouslySetInnerHTML={{ __html: page.content.rendered }}
      />
    </main>
  )
}