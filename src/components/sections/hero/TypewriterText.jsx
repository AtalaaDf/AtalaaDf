import { motion, useReducedMotion } from 'framer-motion'
import { useTypewriter } from '../../../hooks/useTypewriter'
import { caretVariants } from '../../../animations/typewriter'

export default function TypewriterText({ className = '' }) {
  const prefersReducedMotion = useReducedMotion()
  const { displayedText } = useTypewriter()

  return (
    <div
      className={`flex h-[38px] min-h-[38px] items-center font-serif text-[clamp(16px,5vw,22px)] font-normal text-white sm:h-[2.5vw] sm:text-[24px] lg:text-[2.2vw] ${className}`}
      aria-live="polite"
    >
      <span>{displayedText}</span>
      <motion.span
        variants={caretVariants}
        animate={prefersReducedMotion ? false : 'blink'}
        className="ml-1.5 inline-block h-[1.3em] w-[3px] rounded-full bg-white align-middle"
        aria-hidden="true"
      />
    </div>
  )
}
