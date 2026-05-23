'use client'

import { useState, useEffect, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'

// TODO: i18n
const PLACEHOLDERS = [
  'Figuras de anime...',
  'Periféricos kawaii...',
  'Merch oficial...',
  'Ropa otaku...',
  'Decoración anime...',
  'Setup kawaii...',
  'Cosplay...',
]

interface SearchBarProps {
  defaultValue?: string
  size?: 'sm' | 'lg'
}

export function SearchBar({ defaultValue = '', size = 'lg' }: SearchBarProps) {
  const router = useRouter()
  const [value, setValue] = useState(defaultValue)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)

  useEffect(() => {
    if (defaultValue) return
    const interval = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % PLACEHOLDERS.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [defaultValue])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const q = value.trim()
    if (!q) return
    router.push(`/buscar?q=${encodeURIComponent(q)}`)
  }

  const isLarge = size === 'lg'

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full gap-2">
      <div className="relative flex-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-content-tertiary pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={isLarge ? 'w-5 h-5' : 'w-4 h-4'}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.5 6.5a7.5 7.5 0 0 0 10.6 10.6z"
            />
          </svg>
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={PLACEHOLDERS[placeholderIndex]}
          className={`w-full bg-surface-input border border-border-subtle hover:border-border-hover focus:border-accent focus:outline-none rounded-[10px] text-content-primary placeholder:text-content-tertiary transition-colors duration-150 ${
            isLarge ? 'pl-11 pr-4 py-3.5 text-base' : 'pl-9 pr-3 py-2 text-sm'
          }`}
        />
      </div>
      {/* TODO: i18n */}
      <button
        type="submit"
        className={`bg-accent hover:bg-accent-hover text-white font-medium rounded-[10px] transition-colors duration-150 shrink-0 ${
          isLarge ? 'px-6 py-3.5 text-base' : 'px-4 py-2 text-sm'
        }`}
      >
        Buscar
      </button>
    </form>
  )
}
