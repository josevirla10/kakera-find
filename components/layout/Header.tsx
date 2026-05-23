import Link from 'next/link'
import Image from 'next/image'
import { SearchBar } from '@/components/search/SearchBar'

// TODO: i18n
export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-surface border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-6">
        {/* Logo */}
        <Link href="/" className="shrink-0 group flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Kakera Find"
            width={36}
            height={36}
            className="rounded-full"
          />
          <div className="flex flex-col leading-none">
            <span className="text-[10px] font-semibold text-accent tracking-[0.2em] uppercase">
              Kakera
            </span>
            <span className="text-xl font-bold text-content-primary -mt-0.5 group-hover:text-accent transition-colors">
              Find
            </span>
          </div>
        </Link>

        {/* Search — desktop */}
        <div className="hidden md:flex flex-1 max-w-md">
          <SearchBar size="sm" />
        </div>

        {/* Nav — desktop */}
        <nav className="hidden md:flex items-center gap-1 ml-auto shrink-0">
          <Link
            href="/#categorias"
            className="px-3 py-2 text-sm text-content-secondary hover:text-content-primary hover:bg-surface-secondary rounded-lg transition-colors"
          >
            Categorías
          </Link>
          <Link
            href="/buscar?q=novedades+anime+2024"
            className="px-3 py-2 text-sm text-content-secondary hover:text-content-primary hover:bg-surface-secondary rounded-lg transition-colors"
          >
            Novedades
          </Link>
          <Link
            href="/nosotros"
            className="px-3 py-2 text-sm text-content-secondary hover:text-content-primary hover:bg-surface-secondary rounded-lg transition-colors"
          >
            Nosotros
          </Link>
        </nav>

        {/* Hamburger — mobile placeholder */}
        {/* TODO: implement mobile nav drawer */}
        <button
          className="md:hidden ml-auto p-2 text-content-secondary hover:text-content-primary transition-colors"
          aria-label="Abrir menú"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Search row — mobile only */}
      <div className="md:hidden px-4 pb-3 pt-2 bg-surface border-t border-border-subtle">
        <SearchBar size="sm" />
      </div>
    </header>
  )
}
