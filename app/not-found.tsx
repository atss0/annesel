import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <div className="text-8xl font-bold text-purple-200 mb-4">404</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Sayfa Bulunamadı
          </h1>
          <p className="text-gray-600 mb-8">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
            Ana sayfaya dönerek aradığınızı bulabilirsiniz.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Ana Sayfa
            </Link>
          </Button>
          <Button variant="outline" asChild className="border-purple-300 text-purple-700 hover:bg-purple-50">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Blog Yazıları
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
