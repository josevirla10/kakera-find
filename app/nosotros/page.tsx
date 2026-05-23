import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conocé a Kakera Labs, el estudio indie detrás de Kakera Find.',
}

export default function NosotrosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-content-primary mb-2">Nosotros</h1>
      <p className="text-sm text-content-tertiary mb-10">Kakera Labs · 欠片</p>

      <div className="space-y-10">

        <section>
          <h2 className="text-lg font-semibold text-content-primary mb-3">¿Qué es Kakera Find?</h2>
          <p className="text-content-secondary leading-relaxed">
            Kakera Find es un buscador curado de productos anime — figuras, merch, periféricos kawaii y más.
            Lo construimos porque queríamos un lugar limpio donde encontrar todo sin ruido ni distracciones.
          </p>
          <p className="text-content-secondary leading-relaxed mt-3">
            Agregamos listados de MercadoLibre, AliExpress y otras tiendas para que puedas comparar
            y encontrar lo que buscás en un solo lugar.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-content-primary mb-3">Kakera Labs</h2>
          <p className="text-content-secondary leading-relaxed">
            Somos un estudio indie independiente que crea aplicaciones para ayudar a las personas y entretenerlas.
            Nos enfocamos en proyectos creativos y accesibles, sin complejidad innecesaria.
          </p>
          <p className="text-content-secondary leading-relaxed mt-3">
            Kakera Find es uno de nuestros proyectos — hecho con cariño para la comunidad anime hispanohablante.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-content-primary mb-4">Contacto</h2>
          <div className="flex flex-col gap-3">
            <a
              href="mailto:kakeralabs@gmail.com"
              className="flex items-center gap-3 text-content-secondary hover:text-accent transition-colors"
            >
              <span className="text-lg">✉️</span>
              <span>kakeralabs@gmail.com</span>
            </a>
            <a
              href="https://instagram.com/kakeralabs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-content-secondary hover:text-accent transition-colors"
            >
              <span className="text-lg">📸</span>
              <span>@kakeralabs</span>
            </a>
            <a
              href="https://x.com/KakeraLabs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-content-secondary hover:text-accent transition-colors"
            >
              <span className="text-lg">𝕏</span>
              <span>@KakeraLabs</span>
            </a>
            <a
              href="https://kakeralabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-content-secondary hover:text-accent transition-colors"
            >
              <span className="text-lg">🌐</span>
              <span>kakeralabs.com</span>
            </a>
          </div>
        </section>

        <section className="bg-surface-secondary rounded-2xl p-6 border border-border-subtle">
          <p className="text-sm text-content-secondary leading-relaxed">
            Kakera Find participa en programas de afiliados. Al hacer clic en un enlace y realizar una compra,
            podemos recibir una comisión sin costo adicional para vos.
          </p>
        </section>

      </div>
    </div>
  )
}
