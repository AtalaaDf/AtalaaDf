export default function GlowImage({
  src,
  alt = 'Cahaya latar',
  className = '',
  style = {},
  ...props
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`pointer-events-none select-none object-contain ${className}`}
        style={style}
        {...props}
      />
    )
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none rounded-full bg-[radial-gradient(circle,rgba(140,155,160,0.45)_0%,rgba(140,155,160,0.15)_40%,transparent_70%)] ${className}`}
      style={style}
      {...props}
    />
  )
}
