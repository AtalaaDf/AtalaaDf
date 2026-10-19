import { motion } from 'framer-motion'
import PillButton from '../../ui/PillButton'
import TypewriterText from './TypewriterText'
import { heroTextVariants } from '../../../animations/typewriter'
import { SOCIAL_LINKS } from '../../../data/socialLinks'
import SocialCircleLink from '../../ui/SocialCircleLink'

export default function HeroLeftColumn({ onDiscussClick }) {
  const handleClick = () => {
    if (onDiscussClick) {
      onDiscussClick()
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.div
      variants={heroTextVariants}
      initial="hidden"
      animate="visible"
      className="z-10 flex w-full flex-col items-center justify-center px-5 text-center lg:items-start lg:px-0 lg:pl-[11.3vw] lg:text-left"
    >
      {/* Nama */}
      <h1 className="font-serif text-[42px] sm:text-[64px] lg:text-[5.4vw] font-bold text-white tracking-tight leading-none mb-3 sm:mb-5">
        AtalaaDf
      </h1>

      {/* Subjudul */}
      <div className="mb-6 sm:mb-10">
        <TypewriterText className="justify-center lg:justify-start" />
      </div>

      {/* Tombol Let's Discuss */}
      <div className="hidden lg:block">
        <PillButton
          onClick={handleClick}
          ariaLabel="Buka form diskusi pada section kontak"
          className="px-7 py-3 text-sm font-normal sm:px-9 sm:py-3.5 lg:text-[1.3vw]"
        >
          Let&apos;s Discuss
        </PillButton>
      </div>
      <nav
        aria-label="Social media"
        className="flex items-center gap-3 lg:hidden"
      >
        {SOCIAL_LINKS.map((social) => (
          <SocialCircleLink key={social.id} {...social} />
        ))}
      </nav>
    </motion.div>
  )
}
