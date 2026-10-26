import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export const Button = forwardRef(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      type = 'button',
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: 'bg-white text-black hover:bg-white/90 active:scale-[0.98]',
      secondary:
        'bg-white/10 text-white hover:bg-white/15 border border-white/10 active:scale-[0.98]',
      outline:
        'border border-white/20 bg-transparent text-white hover:bg-white/5 active:scale-[0.98]',
      ghost: 'text-white/80 hover:bg-white/10 hover:text-white',
      link: 'text-white underline-offset-4 hover:underline p-0 h-auto',
    }

    const sizes = {
      default: 'h-10 px-5 py-2 text-sm',
      sm: 'h-8 px-3.5 text-xs',
      lg: 'h-11 px-7 text-sm sm:text-base',
      icon: 'h-10 w-10 p-0',
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-sans font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none',
          variants[variant] || variants.default,
          sizes[size] || sizes.default,
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
