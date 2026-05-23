import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
  fullWidth?: boolean
}

export function Button({
  variant = 'primary',
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center px-4 py-2 rounded-[9px] text-sm font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed'
  const styles = {
    primary: 'bg-accent hover:bg-accent-hover text-white',
    outline:
      'border border-border-subtle hover:border-border-hover text-content-primary hover:bg-surface-secondary',
  }
  return (
    <button
      className={`${base} ${styles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
