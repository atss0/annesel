"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

type Props = {
    site: {
        name: string
    }
    categories: {
        id: number
        name: string
        slug: string
    }[]
}

export default function HeaderClient({ site, categories }: Props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    console.log(categories)

    const staticPages = [
        { name: 'Hakkımızda', href: '/hakkimizda' },
        { name: 'İletişim', href: '/iletisim' }
    ]

    const organizationJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Annesel',
        url: 'https://annesel.com',
        logo: 'https://annesel.com/logo.png',
        description: 'Annelik yolculuğunuzda size rehberlik eden blog sitesi',
        sameAs: [
            // Add your social media URLs here
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            availableLanguage: 'Turkish'
        }
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
            />
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-purple-100 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-3">
                            <Image
                                src="/logo.png"
                                alt="Annesel Logo"
                                width={60}
                                height={60}
                                className="w-10 h-10 contain"
                            />
                            <span className="text-2xl font-bold text-purple-800">{site.name}</span>
                        </Link>

                        {/* Kategori Menü - Masaüstü */}
                        <nav className="hidden lg:flex items-center space-x-8">
                            {Array.isArray(categories) &&
                                categories
                                .filter(c => c.slug.toLowerCase() !== 'uncategorized') 
                                    .map((cat) => (
                                        <Link
                                            key={cat.id}
                                            href={`/kategori/${cat.slug}`}
                                            className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group"
                                        >
                                            {cat.name}
                                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full" />
                                        </Link>
                                    ))}

                            {staticPages.map((page) => (
                                <Link
                                    key={page.href}
                                    href={page.href}
                                    className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group"
                                >
                                    {page.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full" />
                                </Link>
                            ))}
                        </nav>

                        {/* Arama ve Mobil Menü Butonları */}
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="text-gray-600 hover:text-purple-600"
                            >
                                <Search className="h-5 w-5" />
                            </Button>

                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden text-gray-600 hover:text-purple-600"
                            >
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </Button>
                        </div>
                    </div>

                    {/* Arama Çubuğu */}
                    {isSearchOpen && (
                        <div className="py-4 border-t border-purple-100">
                            <div className="relative max-w-md mx-auto">
                                <Input
                                    type="search"
                                    placeholder="Blog yazılarında ara..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            window.location.href = `/arama?q=${encodeURIComponent(searchQuery)}`
                                        }
                                    }}
                                    className="pl-10 pr-4 py-2 w-full border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            </div>
                        </div>
                    )}

                    {/* Mobil Menü */}
                    {isMenuOpen && (
                        <div className="lg:hidden py-4 border-t border-purple-100">
                            <nav className="flex flex-col space-y-4">
                                {Array.isArray(categories) &&
                                    categories
                                        .filter((cat) => cat.slug.trim().toLowerCase() !== "uncategorized")
                                        .map((cat) => (
                                            <Link
                                                key={cat.id}
                                                href={`/kategori/${cat.slug}`}
                                                className="text-gray-700 hover:text-purple-600 font-medium py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors duration-200"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {cat.name}
                                            </Link>
                                        ))}

                                {staticPages.map((page) => (
                                    <Link
                                        key={page.href}
                                        href={page.href}
                                        className="text-gray-700 hover:text-purple-600 font-medium py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors duration-200"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {page.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </header>
        </>
    )
}
