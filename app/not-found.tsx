import Link from 'next/link'

// TODO: i18n
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[55vh] px-4 text-center gap-4">
      <span className="text-6xl">🌸</span>
      <h2 className="text-2xl font-bold text-content-primary">Página no encontrada</h2>
      <p className="text-sm text-content-secondary max-w-sm">
        La página que buscás no existe o fue movida.
      </p>
      <Link
        href="/"
        className="mt-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-[9px] transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
