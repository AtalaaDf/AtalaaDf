export default function ShapeOutline({
  src,
  alt = 'Shape Outline',
  name = 'Shape',
  className = '',
  style = {},
  ...props
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`pointer-events-none select-none object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] ${className}`}
        style={style}
        {...props}
      />
    )
  }

  return (
    <div
      role="img"
      aria-label={alt || name}
      className={`pointer-events-none flex items-center justify-center rounded-2xl border-2 border-dashed border-white/40 text-center font-sans text-xs tracking-wider text-white/70 shadow-[0_0_20px_rgba(255,255,255,0.2)] ${className}`}
      style={style}
      {...props}
    >
      <span className="px-2 py-1 bg-black/40 rounded">
        {name || 'Placeholder Shape'}
      </span>
    </div>
  )
}
