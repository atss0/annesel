import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

type BreadcrumbItem = {
  label: string
  href?: string
}

type Props = {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: Props) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Ana Sayfa',
        item: 'https://annesel.com'
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        ...(item.href && { item: `https://annesel.com${item.href}` })
      }))
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="flex items-center hover:text-purple-600 transition-colors">
          <Home className="h-4 w-4 mr-2" />
          <span className="sr-only">Ana Sayfa</span>
        </Link>
        
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight className="h-4 w-4 text-gray-400" />
            {item.href ? (
              <Link href={item.href} className="hover:text-purple-600 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium">{item.label}</span>
            )}
          </div>
        ))}
      </nav>
    </>
  )
}
