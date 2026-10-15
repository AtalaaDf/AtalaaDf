export default function SectionTitle({
  as: HeadingTag = 'h2',
  children,
  fontFamily = 'serif',
  className = '',
  ...props
}) {
  const fontClass =
    fontFamily === 'sans' ? 'font-sans font-semibold' : 'font-serif font-bold'

  return (
    <HeadingTag
      className={`text-white tracking-normal ${fontClass} ${className}`}
      {...props}
    >
      {children}
    </HeadingTag>
  )
}
