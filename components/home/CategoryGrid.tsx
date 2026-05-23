import Link from 'next/link'
import { CATEGORIES } from '@/lib/categories'

// TODO: i18n
export function CategoryGrid() {
  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      id="categorias"
    >
      <h2 className="text-2xl font-bold text-content-primary mb-6">
        Explorá por categoría
      </h2>
      <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categoria/${cat.slug}`}
            className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl border border-border-subtle hover:border-border-hover hover:bg-surface-secondary hover:shadow-card transition-all duration-150 group text-center"
          >
            <span className="text-2xl">{cat.icon}</span>
            <span className="text-[11px] sm:text-xs font-medium text-content-secondary group-hover:text-content-primary leading-snug">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
