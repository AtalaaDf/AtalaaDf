export const glowPulseVariants = {
  initial: {
    scale: 0.96,
    opacity: 0.75,
  },
  animate: {
    scale: [0.96, 1.04, 0.96],
    opacity: [0.75, 0.95, 0.75],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const shapeEntranceVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}
