export default function Chip({
  children,
  className = '',
  icon = null,
  ...props
}) {
  return (
    <div
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-chip px-6 py-3 font-sans text-white shadow-[0_6px_12px_rgba(0,0,0,0.5)] select-none ${className}`}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </div>
  )
}
