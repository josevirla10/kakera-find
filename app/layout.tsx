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
  openGraph: {
    title: 'Kakera Find',
    description: 'Descubrí los mejores productos anime en un solo lugar.',
    siteName: 'Kakera Find',
    locale: 'es_AR',
    type: 'website',
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
