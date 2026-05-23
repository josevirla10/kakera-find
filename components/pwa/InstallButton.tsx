'use client'

import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallButton() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isIOS, setIsIOS] = useState(false)
  const [showIOSGuide, setShowIOSGuide] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Already installed as standalone app
    if (window.matchMedia('(display-mode: standalone)').matches) return

    // Register service worker (required for Android install prompt)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }

    // iOS detection — no beforeinstallprompt, show manual instructions
    const ua = navigator.userAgent
    if (/iPad|iPhone|iPod/.test(ua)) {
      setIsIOS(true)
      setVisible(true)
      return
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setPrompt(e as BeforeInstallPromptEvent)
      setVisible(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  if (!visible) return null

  const handleClick = async () => {
    if (isIOS) {
      setShowIOSGuide(true)
      return
    }
    if (!prompt) return
    await prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === 'accepted') setVisible(false)
    setPrompt(null)
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-accent border border-accent/40 rounded-lg hover:bg-accent/10 transition-colors shrink-0"
        aria-label="Instalar app"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" />
        </svg>
        Instalar
      </button>

      {showIOSGuide && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => setShowIOSGuide(false)}
        >
          <div
            className="w-full max-w-sm bg-surface rounded-2xl p-6 shadow-xl border border-border-subtle"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-content-primary">Instalar Kakera Find</h2>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="p-1 text-content-secondary hover:text-content-primary transition-colors"
                aria-label="Cerrar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <ol className="space-y-3 text-sm text-content-secondary">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/15 text-accent font-semibold text-xs flex items-center justify-center mt-0.5">1</span>
                <span>
                  Tocá el botón{' '}
                  <span className="inline-flex items-center gap-1 font-medium text-content-primary">
                    Compartir
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </span>{' '}
                  en la barra de Safari
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/15 text-accent font-semibold text-xs flex items-center justify-center mt-0.5">2</span>
                <span>
                  Deslizá y tocá{' '}
                  <span className="font-medium text-content-primary">&quot;Agregar a pantalla de inicio&quot;</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/15 text-accent font-semibold text-xs flex items-center justify-center mt-0.5">3</span>
                <span>Confirmá tocando <span className="font-medium text-content-primary">&quot;Agregar&quot;</span></span>
              </li>
            </ol>

            <p className="mt-4 text-xs text-content-tertiary text-center">
              Solo funciona desde Safari en iPhone/iPad
            </p>
          </div>
        </div>
      )}
    </>
  )
}
