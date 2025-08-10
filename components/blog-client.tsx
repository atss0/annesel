'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Clock, ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  posts: any[]
  currentPage: number
  totalPages: number
}

export default function BlogClient({ posts, currentPage, totalPages }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Blog Yazıları</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Annelik yolculuğunuzda ilgini çekebilecek içerikleri keşfedin.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => {
            const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
            const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Genel'
            const excerpt = post.excerpt?.rendered?.replace(/<[^>]+>/g, '')?.slice(0, 100) + '...'
            const title = post.title.rendered
            const date = new Date(post.date).toLocaleDateString('tr-TR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })

            return (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden relative p-0">
                <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10" />
                <div className="relative overflow-hidden">
                  <Image
                    src={image || '/placeholder.svg'}
                    alt={title}
                    width={400}
                    height={300}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105 lg:h-80 h-48"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-purple-600 text-white">{category}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-3 text-gray-900 group-hover:text-purple-600">
                    <Link href={`/blog/${post.slug}`}>{title}</Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      3 dk okuma
                    </div>
                    <div>{date}</div>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center text-purple-600 hover:text-purple-700 text-sm font-medium"
                  >
                    Devamını Oku
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
        {/* Pagination */}
        <div className="flex justify-center items-center space-x-4 mt-8">
          {currentPage > 1 && (
            <Button
              asChild
              disabled={currentPage <= 1}
              variant="outline"
              className="text-purple-700 border-purple-300 hover:bg-purple-50"
            >
              <Link href={`?page=${currentPage - 1}`}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                Önceki
              </Link>
            </Button>
          )}
          
          <span className="text-sm text-gray-600">
            Sayfa {currentPage} / {totalPages}
          </span>

          {currentPage < totalPages && (
            <Button
              asChild
              disabled={currentPage >= totalPages}
              variant="outline"
              className="text-purple-700 border-purple-300 hover:bg-purple-50"
            >
              <Link href={`?page=${currentPage + 1}`}>
                Sonraki
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          )}
        </div>
      </section>

      <div className="container mx-auto px-4 mt-16">
      </div>
    </div>
  )
}