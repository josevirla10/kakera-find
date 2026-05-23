import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de Kakera Find — cómo tratamos tu información.',
}

export default function PrivacidadPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-content-primary mb-2">Política de Privacidad</h1>
      <p className="text-sm text-content-tertiary mb-10">Última actualización: mayo 2026</p>

      <div className="space-y-8 text-content-secondary">

        <section>
          <h2 className="text-lg font-semibold text-content-primary mb-2">1. Quiénes somos</h2>
          <p className="leading-relaxed">
            Kakera Find (<strong>find.kakeralabs.com</strong>) es un servicio operado por <strong>Kakera Labs</strong>.
            Esta política describe cómo tratamos la información cuando usás el sitio.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-content-primary mb-2">2. Datos que recopilamos</h2>
          <p className="leading-relaxed">Kakera Find <strong>no requiere registro</strong> ni cuenta de usuario. No recopilamos nombre, email ni ningún dato personal de forma directa.</p>
          <p className="leading-relaxed mt-3">La única información que procesamos es:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Términos de búsqueda</strong> — las palabras que ingresás en el buscador se usan únicamente para realizar la consulta a las APIs de terceros y mostrar resultados. No se almacenan.</li>
            <li><strong>Datos técnicos de sesión</strong> — tu dirección IP y tipo de navegador pueden quedar registrados temporalmente en los logs del servidor (Vercel) por razones de seguridad y estabilidad.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-content-primary mb-2">3. APIs y servicios de terceros</h2>
          <p className="leading-relaxed">Para mostrarte resultados de productos, Kakera Find se conecta a las siguientes APIs externas:</p>
          <ul className="list-disc list-inside mt-3 space-y-2">
            <li>
              <strong>MercadoLibre</strong> — cuando buscás un producto, tu consulta se envía a la API pública de MercadoLibre para obtener listados. Aplicá su{' '}
              <a href="https://www.mercadolibre.com.ar/privacidad" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">política de privacidad</a>.
            </li>
            <li>
              <strong>AliExpress</strong> — de forma similar, las búsquedas se consultan en la API de AliExpress Affiliate. Aplicá su{' '}
              <a href="https://www.aliexpress.com/p/policy/privacy.html" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">política de privacidad</a>.
            </li>
            <li>
              <strong>Vercel</strong> — la infraestructura del sitio corre en Vercel, que puede registrar datos técnicos de acceso. Ver su{' '}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">política de privacidad</a>.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-content-primary mb-2">4. Cookies</h2>
          <p className="leading-relaxed">
            Kakera Find no usa cookies propias de seguimiento ni publicidad. Los filtros de búsqueda (fuente, orden, precio) se almacenan en la URL, no en tu dispositivo.
          </p>
          <p className="leading-relaxed mt-3">
            Los sitios de terceros a los que te redirijamos (MercadoLibre, AliExpress) pueden usar sus propias cookies, sujetas a sus respectivas políticas.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-content-primary mb-2">5. Links de afiliados</h2>
          <p className="leading-relaxed">
            Al hacer clic en "Ver producto", sos redirigido al sitio del vendedor con un link de afiliado. Esto puede generar una comisión para Kakera Labs sin costo extra para vos. A partir de ese momento, la política de privacidad del sitio de destino aplica.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-content-primary mb-2">6. Analytics</h2>
          <p className="leading-relaxed">
            Actualmente no utilizamos herramientas de analytics de terceros (Google Analytics, etc.). Si en el futuro incorporamos alguna, actualizaremos esta política e informaremos a los usuarios.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-content-primary mb-2">7. Menores de edad</h2>
          <p className="leading-relaxed">
            Kakera Find no está dirigido a menores de 13 años y no recopila intencionalmente información de ellos.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-content-primary mb-2">8. Cambios a esta política</h2>
          <p className="leading-relaxed">
            Podemos actualizar esta política ocasionalmente. La fecha de "última actualización" al inicio de la página refleja la versión vigente.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-content-primary mb-2">9. Contacto</h2>
          <p className="leading-relaxed">
            Para consultas sobre privacidad, escribinos a{' '}
            <a href="mailto:kakeralabs@gmail.com" className="text-accent hover:underline">kakeralabs@gmail.com</a>.
          </p>
        </section>

      </div>
    </div>
  )
}
