import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Analytics from '@/components/analytics'
import { getSiteSettings } from '@/lib/api'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata() {
  const site = await getSiteSettings()

  return {
    title: {
      default: site.name,
      template: `%s | ${site.name}`
    },
    description: site.description,
    keywords: ['annelik', 'bebek bakımı', 'hamilelik', 'çocuk gelişimi', 'anne sağlığı', 'ebeveynlik', 'doğum', 'emzirme', 'bebek beslenmesi', 'çocuk psikolojisi'],
    authors: [{ name: 'Annesel Ekibi' }],
    creator: 'Annesel',
    publisher: 'Annesel',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: site.name,
      description: site.description,
      siteName: site.name,
      url: site.url,
      locale: 'tr_TR',
      type: 'website',
      images: [
        {
          url: '/logo.png',
          width: 1200,
          height: 630,
          alt: site.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: site.name,
      description: site.description,
      images: ['/logo.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
    alternates: {
      canonical: site.url,
      languages: {
        'tr-TR': site.url,
      },
    },
    metadataBase: new URL(site.url),
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" dir="ltr">
      <head>
        <link rel="canonical" href="/canonical-url" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="theme-color" content="#9333ea" />
        <meta name="msapplication-TileColor" content="#9333ea" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      </head>
      <body className={`flex flex-col min-h-screen ${inter.className}`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
