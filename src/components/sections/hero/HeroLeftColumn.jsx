import { motion } from 'framer-motion'
import PillButton from '../../ui/PillButton'
import TypewriterText from './TypewriterText'
import { heroTextVariants } from '../../../animations/typewriter'

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
      className="flex flex-col items-start justify-center pl-[6vw] lg:pl-[11.3vw] z-10"
    >
      {/* Nama */}
      <h1 className="font-serif text-[42px] sm:text-[64px] lg:text-[5.4vw] font-bold text-white tracking-tight leading-none mb-3 sm:mb-5">
        AtalaaDf
      </h1>

      {/* Subjudul */}
      <div className="mb-6 sm:mb-10">
        <TypewriterText />
      </div>

      {/* Tombol Let's Discuss */}
      <PillButton
        onClick={handleClick}
        ariaLabel="Buka form diskusi pada section kontak"
        className="px-7 py-3 sm:px-9 sm:py-3.5 text-sm lg:text-[1.3vw] font-normal"
      >
        Let&apos;s Discuss
      </PillButton>
    </motion.div>
  )
}
