export default function PillButton({
  children,
  onClick,
  type = 'button',
  disabled = false,
  ariaLabel,
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center rounded-full border border-white/15 bg-chip px-7 py-3 font-sans text-sm font-medium text-white/90 backdrop-blur-sm transition-all duration-200 ease-out hover:border-white/30 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
