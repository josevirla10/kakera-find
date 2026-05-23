import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description: 'Términos y condiciones de uso de Kakera Find.',
}

export default function TerminosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-content-primary mb-2">Términos y Condiciones</h1>
      <p className="text-sm text-content-tertiary mb-10">Última actualización: mayo 2026</p>

      <div className="prose prose-sm text-content-secondary space-y-8">

        <section>
          <h2 className="text-lg font-semibold text-content-primary mb-2">1. Aceptación de los términos</h2>
          <p>Al acceder y utilizar Kakera Find (<strong>find.kakeralabs.com</strong>), aceptás estos Términos y Condiciones en su totalidad. Si no estás de acuerdo con alguna parte, te pedimos que no uses el sitio.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-content-primary mb-2">2. Descripción del servicio</h2>
          <p>Kakera Find es una plataforma de búsqueda y descubrimiento de productos anime operada por <strong>Kakera Labs</strong>. El sitio agrega listados de tiendas de terceros (como MercadoLibre y AliExpress) y los presenta de forma organizada para facilitar la búsqueda.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-content-primary mb-2">3. Enlaces de afiliados</h2>
          <p>Kakera Find participa en programas de afiliados. Cuando hacés clic en un enlace de producto y realizás una compra, podemos recibir una comisión sin costo adicional para vos. Esto nos ayuda a mantener el sitio gratuito.</p>
          <p className="mt-2">Los precios, disponibilidad y condiciones de cada producto son responsabilidad exclusiva del vendedor en la plataforma correspondiente (MercadoLibre, AliExpress, etc.).</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-content-primary mb-2">4. Uso aceptable</h2>
          <p>Acordás no usar el sitio para:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Actividades ilegales o fraudulentas</li>
            <li>Scraping automatizado masivo sin autorización</li>
            <li>Interferir con el funcionamiento normal del sitio</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-content-primary mb-2">5. Propiedad intelectual</h2>
          <p>El diseño, logo y contenido propio de Kakera Find son propiedad de Kakera Labs. Los nombres, imágenes y marcas de productos corresponden a sus respectivos dueños.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-content-primary mb-2">6. Limitación de responsabilidad</h2>
          <p>Kakera Find actúa como intermediario informativo. No somos responsables por transacciones realizadas en sitios de terceros, calidad de productos, entregas, ni disputas entre compradores y vendedores.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-content-primary mb-2">7. Privacidad</h2>
          <p>No recopilamos datos personales más allá de los necesarios para el funcionamiento del sitio. No vendemos información de usuarios a terceros.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-content-primary mb-2">8. Modificaciones</h2>
          <p>Kakera Labs se reserva el derecho de modificar estos términos en cualquier momento. Los cambios se publicarán en esta página con la fecha de actualización.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-content-primary mb-2">9. Contacto</h2>
          <p>Para consultas sobre estos términos, escribinos a <a href="mailto:kakeralabs@gmail.com" className="text-accent hover:underline">kakeralabs@gmail.com</a>.</p>
        </section>

      </div>
    </div>
  )
}
