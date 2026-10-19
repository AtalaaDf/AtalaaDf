export default function SocialCircleLink({
  label,
  icon: Icon,
  href,
  placeholder = false,
}) {
  return (
    <a
      href={href} target="_blank" rel="noopener noreferrer"
      aria-label={placeholder ? `${label} (URL belum diisi)` : label}
      aria-disabled={placeholder || undefined}
      title={placeholder ? `Placeholder: isi URL ${label}` : label}
      onClick={placeholder ? (event) => event.preventDefault() : undefined}
      className={`flex size-11 items-center justify-center rounded-full border border-white/[0.08] bg-transparent text-muted transition-all duration-200 ${
        placeholder
          ? 'cursor-not-allowed opacity-70'
          : 'hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon className="size-4" aria-hidden="true" />
    </a>
  )
}
