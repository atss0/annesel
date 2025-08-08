'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'

type Props = {
    site: {
        name: string
        email?: string
        phone?: string
        address?: string
    }
    categories: {
        id: number
        name: string
        slug: string
    }[]
}

export default function FooterClient({ site, categories }: Props) {
    const currentYear = new Date().getFullYear()

    const footerLinks = {
        Hakkımızda: [
            { name: 'Hakkımızda', href: '/hakkimizda' },
            { name: 'İletişim', href: '/iletisim' },
        ],
        Destek: [
            { name: 'SSS', href: '/sss' },
            { name: 'Gizlilik Politikası', href: '/gizlilik' },
            { name: 'Kullanım Şartları', href: '/kullanim-sartlari' },
            { name: 'Çerez Politikası', href: '/cerez-politikasi' },
        ],
    }

    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Logo */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center space-x-3 mb-6">
                            <Image src="/logo.png" alt="Annesel Logo" width={40} height={40} className="w-10 h-10" />
                            <span className="text-2xl font-bold text-white">{site.name}</span>
                        </Link>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Hamilelikten çocuk gelişimine, bebek bakımından anne sağlığına kadar annelik yolculuğunuzun her anında size rehberlik eden tavsiyeler ve deneyimler.
                        </p>
                    </div>

                    {/* İçerik: Kategoriler */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">İçerik</h3>
                        <ul className="space-y-3">
                            {categories.map((cat) => (
                                <li key={cat.id}>
                                    <Link
                                        href={`/kategori/${cat.slug}`}
                                        className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
                                    >
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Diğer link grupları */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h3 className="text-lg font-semibold mb-4 text-white">{title}</h3>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* İletişim */}
                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                                <Mail className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-400">E-posta</div>
                                <div className="text-white">{site.email || 'info@annesel.com'}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Alt metin */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm mb-4 md:mb-0">
                        © {currentYear} {site.name}. Tüm hakları saklıdır.
                    </p>
                    <div className="flex space-x-6 text-sm">
                        <Link href="/gizlilik" className="text-gray-400 hover:text-purple-400">Gizlilik</Link>
                        <Link href="/kullanim-sartlari" className="text-gray-400 hover:text-purple-400">Şartlar</Link>
                        <Link href="/cerez-politikasi" className="text-gray-400 hover:text-purple-400">Çerezler</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}