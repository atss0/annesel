import Image from "next/image"

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-white">
      <div className="text-center space-y-8">
        {/* Logo */}
        <div>
          <Image
            src="/logo.png"
            alt="Annesel"
            width={100}
            height={100}
            className="mx-auto opacity-90"
          />
        </div>

        {/* Büyük GIF spinner */}
        <div>
          <Image
            src="/spinner.gif"
            alt="Yükleniyor"
            width={120}  // büyütüldü
            height={120}
            unoptimized
            className="mx-auto"
          />
        </div>

        {/* Gradient & animasyonlu yazılar */}
        <div className="space-y-4">
          <h2
            className="text-3xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent animate-gradient-x"
          >
            Yükleniyor
          </h2>
          <p className="text-lg text-gray-600 animate-pulse">
            Lütfen bekleyin...
          </p>
        </div>
      </div>
    </div>
  )
}