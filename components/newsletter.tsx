"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, CheckCircle } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    setLoading(true)

    try {
      const res = await fetch('https://script.google.com/macros/s/AKfycbxlL7-tcSXoS8bAhfN0OUpd559ao5_xDkeceL_gDiI26UnorSwkomNEs3QJd9Z8IXmHDw/exec', {
        method: 'POST',
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({ email }),
      })

      const result = await res.json()

      if (result.success) {
        setIsSubscribed(true)
        setEmail('')
      } else {
        alert(result.message || 'Bu e-posta zaten kayıtlı.')
      }
    } catch (err) {
      alert('Bir hata oluştu. Lütfen tekrar deneyin.')
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-purple-600 to-pink-600">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8 lg:p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
              <Mail className="h-8 w-8 text-purple-600" />
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Annesel Bültenine Katılın
            </h2>

            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Haftalık olarak en güncel annelik tavsiyeleri, uzman makaleleri ve özel içerikleri
              e-posta kutunuzda bulun. Hiç spam yok, sadece değerli içerikler.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="E-posta adresiniz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-4 py-3 border-gray-300 focus:border-purple-400 focus:ring-purple-400"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 whitespace-nowrap"
                  >
                    {loading ? 'Gönderiliyor...' : 'Abone Ol'}
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Abone olarak <a href="/gizlilik" className="text-purple-600 hover:underline">gizlilik politikamızı</a> kabul etmiş olursunuz.
                </p>
              </form>
            ) : (
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-center text-green-600 mb-4">
                  <CheckCircle className="h-8 w-8 mr-2" />
                  <span className="text-lg font-semibold">Başarıyla abone oldunuz!</span>
                </div>
                <p className="text-gray-600">
                  Teşekkürler! İlk bültenimizi yakında e-posta kutunuzda bulacaksınız.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
