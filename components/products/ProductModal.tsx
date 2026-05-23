'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { Product } from '@/types/product'
import { Badge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'

const SOURCE_LABEL: Record<Product['source'], string> = {
  mercadolibre: 'MercadoLibre',
  aliexpress: 'AliExpress',
}

const ACCENT = '#8b7cf8'
const SITE = 'find.kakeralabs.com'

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 3
): number {
  const words = text.split(' ')
  let line = ''
  let lineY = y
  let lines = 0
  for (const word of words) {
    const test = line + word + ' '
    if (ctx.measureText(test).width > maxWidth && line) {
      if (lines >= maxLines - 1) {
        const truncated = line.trimEnd() + '…'
        ctx.fillText(truncated, x, lineY)
        return lineY + lineHeight
      }
      ctx.fillText(line.trimEnd(), x, lineY)
      line = word + ' '
      lineY += lineHeight
      lines++
    } else {
      line = test
    }
  }
  ctx.fillText(line.trimEnd(), x, lineY)
  return lineY + lineHeight
}

async function generateShareCard(product: Product): Promise<File | null> {
  try {
    const W = 600
    const IMG_H = 600
    const INFO_H = 220
    const H = IMG_H + INFO_H

    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext('2d')!

    // Image section background
    ctx.fillStyle = '#f4f3ff'
    ctx.fillRect(0, 0, W, IMG_H)

    // Load product image via proxy (bypasses CORS)
    const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(product.thumbnail)}`
    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    await new Promise<void>((resolve) => {
      img.onload = () => resolve()
      img.onerror = () => resolve()
      img.src = proxyUrl
    })

    if (img.naturalWidth > 0) {
      // Cover: fill square, crop center
      const scale = Math.max(W / img.naturalWidth, IMG_H / img.naturalHeight)
      const dw = img.naturalWidth * scale
      const dh = img.naturalHeight * scale
      const dx = (W - dw) / 2
      const dy = (IMG_H - dh) / 2
      ctx.drawImage(img, dx, dy, dw, dh)
    }

    // Info panel
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, IMG_H, W, INFO_H)

    // Thin top border on info panel
    ctx.fillStyle = '#ece9ff'
    ctx.fillRect(0, IMG_H, W, 2)

    // Source badge
    ctx.fillStyle = product.source === 'aliexpress' ? '#ff6600' : '#ffe600'
    ctx.beginPath()
    ctx.roundRect(24, IMG_H + 20, product.source === 'aliexpress' ? 80 : 100, 22, 6)
    ctx.fill()
    ctx.fillStyle = product.source === 'aliexpress' ? '#ffffff' : '#333333'
    ctx.font = 'bold 12px system-ui, sans-serif'
    ctx.fillText(SOURCE_LABEL[product.source], 32, IMG_H + 35)

    // Title
    ctx.fillStyle = '#1a1a2e'
    ctx.font = 'bold 20px system-ui, sans-serif'
    wrapText(ctx, product.title, 24, IMG_H + 68, W - 48, 26, 2)

    // Price
    ctx.fillStyle = ACCENT
    ctx.font = 'bold 28px system-ui, sans-serif'
    ctx.fillText(formatPrice(product.price, product.currency), 24, IMG_H + 148)

    // Branding strip
    ctx.fillStyle = '#f4f3ff'
    ctx.fillRect(0, H - 44, W, 44)
    ctx.fillStyle = ACCENT
    ctx.font = 'bold 14px system-ui, sans-serif'
    ctx.fillText('✨ Encontrado en', 24, H - 17)
    ctx.fillStyle = '#1a1a2e'
    ctx.font = 'bold 14px system-ui, sans-serif'
    ctx.fillText(SITE, 167, H - 17)

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => resolve(blob ? new File([blob], 'kakera-find.png', { type: 'image/png' }) : null),
        'image/png'
      )
    })
  } catch {
    return null
  }
}

interface Props {
  product: Product
  onClose: () => void
}

export function ProductModal({ product, onClose }: Props) {
  const [sharing, setSharing] = useState(false)
  const [copied, setCopied] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose()
  }

  const shareText = `¡Lo encontré en Kakera Find! 🌸\n${product.title}\n\nConseguilo acá 👉 ${product.permalink}`

  async function share(target: 'native' | 'whatsapp') {
    setSharing(true)
    try {
      const file = await generateShareCard(product)

      if (target === 'native') {
        if (file && navigator.canShare?.({ files: [file] })) {
          await navigator.share({ files: [file], text: shareText })
        } else if (navigator.share) {
          await navigator.share({ title: product.title, url: product.permalink, text: shareText })
        } else {
          await navigator.clipboard.writeText(shareText)
        }
        return
      }

      // WhatsApp: image via native share (user picks WA), fallback wa.me text
      if (file && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text: shareText })
      } else {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')
      }
    } catch { /* cancelled */ }
    finally { setSharing(false) }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4"
    >
      <div className="relative w-full sm:max-w-lg bg-surface rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[92dvh] flex flex-col">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-surface/80 backdrop-blur-sm text-content-secondary hover:text-content-primary transition-colors"
          aria-label="Cerrar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative w-full aspect-square bg-surface-secondary shrink-0">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 512px"
            unoptimized
          />
          <div className="absolute top-3 left-3">
            <Badge variant={product.source}>{SOURCE_LABEL[product.source]}</Badge>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4 p-5 overflow-y-auto">
          <div className="flex flex-col gap-1">
            <p className="text-base font-semibold text-content-primary leading-snug">{product.title}</p>
            <p className="text-2xl font-bold text-accent">{formatPrice(product.price, product.currency)}</p>
          </div>

          {/* CTA */}
          <a
            href={product.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-xl text-center transition-colors"
          >
            Ver producto en {SOURCE_LABEL[product.source]} →
          </a>

          {/* Share */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-content-tertiary uppercase tracking-wide">
              Compartir {sharing && <span className="normal-case font-normal">— generando imagen…</span>}
            </p>
            <div className="flex gap-2">
              {/* Compartir (nativo con imagen) */}
              <button
                onClick={() => share('native')}
                disabled={sharing}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 border border-border-subtle rounded-xl text-sm text-content-secondary hover:text-content-primary hover:border-accent transition-colors disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Compartir
              </button>

              {/* WhatsApp */}
              <button
                onClick={() => share('whatsapp')}
                disabled={sharing}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 border border-border-subtle rounded-xl text-sm text-content-secondary hover:text-green-600 hover:border-green-400 transition-colors disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </button>

              {/* Copiar */}
              <button
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 border border-border-subtle rounded-xl text-sm text-content-secondary hover:text-content-primary hover:border-accent transition-colors"
              >
                {copied ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-green-500">Copiado</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copiar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
