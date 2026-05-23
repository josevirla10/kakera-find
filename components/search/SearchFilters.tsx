'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { FormEvent } from 'react'

// TODO: i18n
const SOURCE_OPTIONS = [
  { value: 'all', label: 'Todas las fuentes' },
  { value: 'mercadolibre', label: 'MercadoLibre' },
  { value: 'aliexpress', label: 'AliExpress' },
]

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevancia' },
  { value: 'price_asc', label: 'Precio: menor a mayor' },
  { value: 'price_desc', label: 'Precio: mayor a menor' },
]

export function SearchFilters() {
  const router = useRouter()
  const params = useSearchParams()

  const fuente = params.get('fuente') ?? 'all'
  const orden = params.get('orden') ?? 'relevance'
  const precioMin = params.get('precioMin') ?? ''
  const precioMax = params.get('precioMax') ?? ''

  function updateParam(key: string, value: string, isDefault: boolean) {
    const next = new URLSearchParams(params.toString())
    if (isDefault) {
      next.delete(key)
    } else {
      next.set(key, value)
    }
    router.push(`/buscar?${next.toString()}`)
  }

  function handlePriceSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const min = (form.elements.namedItem('precioMin') as HTMLInputElement).value
    const max = (form.elements.namedItem('precioMax') as HTMLInputElement).value
    const next = new URLSearchParams(params.toString())
    min ? next.set('precioMin', min) : next.delete('precioMin')
    max ? next.set('precioMax', max) : next.delete('precioMax')
    router.push(`/buscar?${next.toString()}`)
  }

  function clearPrices() {
    const next = new URLSearchParams(params.toString())
    next.delete('precioMin')
    next.delete('precioMax')
    router.push(`/buscar?${next.toString()}`)
  }

  return (
    <aside className="flex flex-col gap-6 w-52 shrink-0">
      {/* Source */}
      {/* TODO: i18n */}
      <div>
        <h3 className="text-xs font-semibold text-content-tertiary uppercase tracking-widest mb-3">
          Fuente
        </h3>
        <div className="flex flex-col gap-2">
          {SOURCE_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="fuente"
                value={opt.value}
                checked={fuente === opt.value}
                onChange={() => updateParam('fuente', opt.value, opt.value === 'all')}
                className="w-4 h-4 accent-[#8b7cf8]"
              />
              <span className="text-sm text-content-secondary group-hover:text-content-primary transition-colors">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-xs font-semibold text-content-tertiary uppercase tracking-widest mb-3">
          Ordenar
        </h3>
        <select
          value={orden}
          onChange={(e) =>
            updateParam('orden', e.target.value, e.target.value === 'relevance')
          }
          className="w-full bg-surface-input border border-border-subtle rounded-[8px] px-3 py-2 text-sm text-content-primary focus:border-accent focus:outline-none transition-colors"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Price range */}
      <div>
        <h3 className="text-xs font-semibold text-content-tertiary uppercase tracking-widest mb-3">
          Precio
        </h3>
        <form onSubmit={handlePriceSubmit} className="flex flex-col gap-2">
          <input
            type="number"
            name="precioMin"
            defaultValue={precioMin}
            placeholder="Mínimo"
            min={0}
            className="w-full bg-surface-input border border-border-subtle rounded-[8px] px-3 py-2 text-sm text-content-primary placeholder:text-content-tertiary focus:border-accent focus:outline-none transition-colors"
          />
          <input
            type="number"
            name="precioMax"
            defaultValue={precioMax}
            placeholder="Máximo"
            min={0}
            className="w-full bg-surface-input border border-border-subtle rounded-[8px] px-3 py-2 text-sm text-content-primary placeholder:text-content-tertiary focus:border-accent focus:outline-none transition-colors"
          />
          <button
            type="submit"
            className="w-full py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-[8px] transition-colors"
          >
            Aplicar
          </button>
          {(precioMin || precioMax) && (
            <button
              type="button"
              onClick={clearPrices}
              className="w-full py-1.5 text-content-tertiary text-xs hover:text-content-secondary transition-colors"
            >
              Limpiar filtro
            </button>
          )}
        </form>
      </div>
    </aside>
  )
}
