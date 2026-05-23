'use client'

import { SearchBar } from '@/components/search/SearchBar'

// TODO: i18n
export function Hero() {
  return (
    <section className="bg-surface-secondary pt-16 pb-24 sm:pt-20 sm:pb-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-border-subtle text-xs text-content-tertiary font-medium shadow-card">
          ✨ Curaduría anime — todo nuevo
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-content-primary leading-tight tracking-tight">
          Encontrá todo lo que{' '}
          <span className="text-accent">el anime</span>
          <br className="hidden sm:block" /> te inspira
        </h1>
        <p className="text-lg sm:text-xl text-content-secondary max-w-xl">
          Figuras, periféricos, merch y más — todo en un lugar
        </p>
        <div className="w-full max-w-xl mt-2">
          <SearchBar size="lg" />
        </div>
        <p className="text-xs text-content-tertiary">
          Probá:{' '}
          {['Nendoroid', 'Teclado kawaii', 'Figura Genshin', 'Setup anime'].map((term) => (
            <a
              key={term}
              href={`/buscar?q=${encodeURIComponent(term)}`}
              className="underline underline-offset-2 hover:text-accent transition-colors mr-2"
            >
              {term}
            </a>
          ))}
        </p>
      </div>
    </section>
  )
}
