import { motion } from 'framer-motion'
import { useTypewriter } from '../../../hooks/useTypewriter'
import { caretVariants } from '../../../animations/typewriter'

export default function TypewriterText({ className = '' }) {
  const { displayedText } = useTypewriter()

  return (
    <div
      className={`flex items-center h-[2.5vw] min-h-[38px] font-serif text-[2.2vw] font-normal text-white ${className}`}
      aria-live="polite"
    >
      <span>{displayedText}</span>
      <motion.span
        variants={caretVariants}
        animate="blink"
        className="ml-1.5 inline-block h-[1.3em] w-[3px] rounded-full bg-white align-middle"
        aria-hidden="true"
      />
    </div>
  )
}
