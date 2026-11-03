import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import HeroLeftColumn from './HeroLeftColumn'
import HomeShapes from './HomeShapes'

export default function HeroSection() {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.65], [0, -120])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-base pt-16 pb-8 lg:pt-0 lg:pb-0"
      aria-label="Section Home"
    >
      <motion.div
        style={{ opacity, y }}
        className="grid w-full grid-cols-1 items-center gap-4 sm:gap-8 lg:grid-cols-2"
      >
        <HeroLeftColumn />
        <HomeShapes className="hidden lg:flex" />
      </motion.div>
    </section>
  )
}
