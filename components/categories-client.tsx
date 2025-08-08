"use client"

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { BookOpen } from 'lucide-react'
import { getCategoryMeta } from '@/lib/categoryMeta'

type Props = {
    categories: {
        id: number
        name: string
        slug: string
        description?: string
        count?: number
    }[]
}

export default function CategoriesClient({ categories }: Props) {
    return (
        <section className="py-16 lg:py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Kategoriler
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        İhtiyacınız olan konularda uzman içeriklere kolayca ulaşın
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories
                        .filter((cat) => cat.slug?.trim().toLowerCase() !== "uncategorized")
                        .map((cat) => {
                            const meta = getCategoryMeta(cat.slug)
                            const Icon = meta.icon

                            return (
                                <Link key={cat.id} href={`/kategori/${cat.slug}`}>
                                    <Card className={`group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300 ${meta.hoverColor} h-full`}>
                                        <CardContent className="p-6">
                                            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${meta.color}`}>
                                                <Icon className="h-6 w-6" />
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-200">
                                                {cat.name}
                                            </h3>

                                            <p className="text-gray-600 mb-3 leading-relaxed">
                                                {meta.description}
                                            </p>

                                            <div className="text-sm text-gray-500 font-medium">
                                                {cat.count} makale
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            )
                        })}
                </div>
            </div>
        </section>
    )
}