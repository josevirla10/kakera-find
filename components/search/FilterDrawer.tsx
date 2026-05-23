'use client'

import { useState } from 'react'
import { SearchFilters } from './SearchFilters'

export function FilterDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* TODO: i18n */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2 bg-surface-input border border-border-subtle rounded-[9px] text-sm text-content-secondary hover:border-border-hover transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 9h10M11 14h2" />
        </svg>
        Filtros
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 bg-surface z-50 shadow-xl flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle">
              <h2 className="font-semibold text-content-primary">Filtros</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-content-tertiary hover:text-content-primary transition-colors p-1"
                aria-label="Cerrar filtros"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <SearchFilters />
            </div>
          </div>
        </>
      )}
    </>
  )
}
