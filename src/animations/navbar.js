export const navbarPillVariants = {
  default: {
    width: 'auto',
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  projects: {
    width: 'auto',
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export const navbarContentVariants = {
  initial: {
    opacity: 0,
    y: 2,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -2,
    transition: {
      duration: 0.15,
      ease: 'easeIn',
    },
  },
}

export const dropdownVariants = {
  initial: {
    opacity: 0,
    y: -8,
    scale: 0.96,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.96,
    transition: {
      duration: 0.15,
      ease: 'easeIn',
    },
  },
}
