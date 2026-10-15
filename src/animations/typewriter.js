export const caretVariants = {
  blink: {
    opacity: [0, 1, 0],
    transition: {
      duration: 0.9,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

export const heroTextVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}
