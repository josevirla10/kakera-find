'use client'

// TODO: i18n
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center gap-4">
      <span className="text-5xl">😿</span>
      <h2 className="text-xl font-bold text-content-primary">Algo salió mal</h2>
      <p className="text-sm text-content-secondary max-w-sm">
        No pudimos cargar los productos. Por favor intentá de nuevo.
      </p>
      {process.env.NODE_ENV === 'development' && (
        <p className="text-xs text-content-tertiary font-mono">{error.message}</p>
      )}
      <button
        onClick={reset}
        className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-[9px] transition-colors"
      >
        Reintentar
      </button>
    </div>
  )
}
