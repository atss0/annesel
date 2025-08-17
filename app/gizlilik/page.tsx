import { getPageBySlug } from '@/lib/api'
import { notFound } from 'next/navigation'
import WordPressContent from '@/components/wordpress-content'

export default async function GizlilikPage() {
    const page = await getPageBySlug('gizlilik')
    if (!page) return notFound()

    return (
        <main className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-6">{page.title.rendered}</h1>
            <WordPressContent html={page.content.rendered} />
        </main>
    )
}