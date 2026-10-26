import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export const Input = forwardRef(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          'flex h-11 w-full rounded-lg border border-white/15 bg-white/[0.03] px-3.5 py-2 font-sans text-sm text-white placeholder:text-white/30 transition-colors focus-visible:border-white/40 focus-visible:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
