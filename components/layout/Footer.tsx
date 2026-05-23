import Link from 'next/link'
import { CATEGORIES } from '@/lib/categories'

// TODO: i18n
export function Footer() {
  return (
    <footer className="bg-surface-secondary border-t border-border-subtle mt-auto" id="sobre-nosotros">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col leading-none">
              <span className="text-[10px] font-semibold text-accent tracking-[0.2em] uppercase">
                Kakera
              </span>
              <span className="text-xl font-bold text-content-primary -mt-0.5">Find</span>
              <span className="text-[11px] text-content-tertiary mt-1">by Kakera Labs</span>
            </div>
            <p className="text-sm text-content-secondary leading-relaxed">
              Descubrí productos anime cuidadosamente seleccionados, todos en un lugar. Un proyecto
              indie de Kakera Labs para fans del anime.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold text-content-tertiary uppercase tracking-widest mb-4">
              Categorías
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categoria/${cat.slug}`}
                    className="text-sm text-content-secondary hover:text-accent transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xs font-semibold text-content-tertiary uppercase tracking-widest mb-4">
              Kakera Labs
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/nosotros" className="text-sm text-content-secondary hover:text-accent transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-sm text-content-secondary hover:text-accent transition-colors">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-sm text-content-secondary hover:text-accent transition-colors">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <a href="mailto:kakeralabs@gmail.com" className="text-sm text-content-secondary hover:text-accent transition-colors">
                  kakeralabs@gmail.com
                </a>
              </li>
              <li>
                <a href="https://instagram.com/kakeralabs" target="_blank" rel="noopener noreferrer" className="text-sm text-content-secondary hover:text-accent transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://x.com/KakeraLabs" target="_blank" rel="noopener noreferrer" className="text-sm text-content-secondary hover:text-accent transition-colors">
                  X / Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border-subtle flex flex-col gap-2">
          <p className="text-xs text-content-tertiary leading-relaxed max-w-2xl">
            Kakera Find participa en programas de afiliados. Al hacer clic en un enlace y realizar
            una compra, podemos recibir una comisión sin costo adicional para vos. Los precios y
            la disponibilidad pueden variar.
          </p>
          <p className="text-xs text-content-tertiary">
            © {new Date().getFullYear()} Kakera Labs. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
