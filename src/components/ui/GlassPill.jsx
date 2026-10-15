export default function GlassPill({
  as: Component = 'div',
  children,
  className = '',
  ...props
}) {
  return (
    <Component
      className={`relative rounded-full bg-glass bg-gradient-to-b from-white/10 to-transparent border border-white/25 ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
