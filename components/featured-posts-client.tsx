'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, User, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  posts: any[]
}

export default function FeaturedPostsClient({ posts }: Props) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-purple-200 text-purple-700">
            Öne Çıkan İçerikler
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            İlgini Çekebilecek Yazılar
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            İlginizi çekebilecek yazıları keşfedin
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => {
            const image = post._embedded['wp:featuredmedia'][0]?.source_url
            const author = 'Annesel Ekibi' // Static author for featured posts
            const category = post._embedded['wp:term'][0]?.[0]?.name || 'Genel'
            const excerpt = post.excerpt?.rendered?.replace(/<[^>]+>/g, '')?.slice(0, 100) + '...'

            return (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden relative p-0">
                <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-50" />
                <div className="relative overflow-hidden">
                  <Image
                    src={image}
                    alt={post.title.rendered}
                    width={400}
                    height={300}
                    className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 lg:h-80 h-48`}
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-purple-600 hover:bg-purple-700 text-white">
                      {category}
                    </Badge>
                  </div>
                </div>

                <CardContent className={`p-6 relative z-20`}>
                  <h3 className={`font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-200 lg:text-2xl text-lg'}`}>
                    <Link href={`/blog/${post.slug}`}>
                      {post.title.rendered}
                    </Link>
                  </h3>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        Annesel
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime || '1 dk'}
                      </div>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-center text-purple-600 hover:text-purple-700 font-medium group-hover:translate-x-1 transition-transform duration-200"
                    >
                      Oku
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Tüm Blog Yazılarını Gör
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}