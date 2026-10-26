import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export const Textarea = forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[120px] w-full rounded-lg border border-white/15 bg-white/[0.03] px-3.5 py-3 font-sans text-sm text-white placeholder:text-white/30 transition-colors focus-visible:border-white/40 focus-visible:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50 resize-y',
        className
      )}
      {...props}
    />
  )
})

Textarea.displayName = 'Textarea'
