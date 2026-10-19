import { SOCIAL_LINKS } from '../../data/socialLinks'
import SocialCircleLink from '../ui/SocialCircleLink'

export default function Footer() {
  return (
    <footer className="flex flex-col items-center border-t border-white/10 bg-base px-4 pt-5 pb-3 sm:pt-5 sm:pb-3">
      <div
        aria-hidden="true"
        className="mb-5 h-px w-32 bg-white/[0.06]"
      />
      <nav aria-label="Social media" className="flex items-center gap-4">
        {SOCIAL_LINKS.map((social) => (
          <SocialCircleLink key={social.id} {...social} />
        ))}
      </nav>
      <p className="mt-3 font-sans text-xs text-muted sm:text-sm">
        © 2026 AtalaaDf
      </p>
    </footer>
  )
}
