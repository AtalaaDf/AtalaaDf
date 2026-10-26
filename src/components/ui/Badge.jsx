import { cn } from '../../utils/cn'

export function Badge({ className, variant = 'default', children, ...props }) {
  const variants = {
    default: 'border-white/15 bg-white/10 text-white',
    secondary: 'border-white/10 bg-white/5 text-white/70',
    outline: 'border-white/20 text-white',
    success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
  }

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md border px-2.5 py-0.5 font-sans text-xs font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-white/40',
        variants[variant] || variants.default,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
