import { Button } from '@/components/ui/button'
import { ArrowRight, Heart, Users, BookOpen } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-300 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-pink-300 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-purple-400 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 mb-8 shadow-sm border border-purple-200">
            <Heart className="h-4 w-4 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-purple-800">Annelik yolculuğunuzda yanınızdayız</span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="text-purple-600">Annesel</span> ile
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Annelik Deneyimi
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Hamilelikten çocuk gelişimine, bebek bakımından anne sağlığına kadar
            annelik yolculuğunuzun her anında size rehberlik eden tavsiyeler ve deneyimler.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/blog">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer">
                Tüm Blog Yazılarını Keşfet
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="/hakkimizda">
              <Button variant="outline" size="lg" className="border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-3 rounded-full cursor-pointer">
                Hakkımızda
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
