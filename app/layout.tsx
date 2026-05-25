import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Kakera Find — Descubrí productos anime',
    template: '%s | Kakera Find',
  },
  description:
    'Encontrá figuras, periféricos kawaii, merch anime y más. Curaduría de productos para fans del anime, por Kakera Labs.',
  keywords: ['anime', 'figuras', 'merch', 'kawaii', 'otaku', 'periféricos', 'nendoroid', 'kakera'],
  metadataBase: new URL('https://find.kakeralabs.com'),
  openGraph: {
    title: 'Kakera Find',
    description: 'Descubrí los mejores productos anime en un solo lugar.',
    siteName: 'Kakera Find',
    url: 'https://find.kakeralabs.com',
    locale: 'es_AR',
    type: 'website',
    images: [{ url: '/icon.png', width: 512, height: 512, alt: 'Kakera Find' }],
  },
  twitter: {
    card: 'summary',
    title: 'Kakera Find',
    description: 'Descubrí los mejores productos anime en un solo lugar.',
    images: ['/icon.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${geist.variable} h-full`}>
      {/* Capture beforeinstallprompt before React hydrates to avoid timing race */}
      <script dangerouslySetInnerHTML={{ __html: `window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();window.__pwaPrompt=e;document.dispatchEvent(new CustomEvent('pwa-prompt-ready'));});` }} />
      <body className="min-h-full flex flex-col bg-surface text-content-primary antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
