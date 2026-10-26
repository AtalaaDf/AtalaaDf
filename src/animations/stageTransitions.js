// Durasi dan easing bersama untuk transisi antar stage
export const STAGE_TRANSITION = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1],
}

export const STAGE_SPRING = {
  type: 'spring',
  stiffness: 80,
  damping: 18,
  mass: 1,
}

// HomeShapes: naik ke atas sambil fade out
export const homeShapesExitUp = {
  visible: { opacity: 1, y: 0 },
  exitUp: {
    opacity: 0,
    y: '-30vh',
    transition: { ...STAGE_TRANSITION, duration: 0.7 },
  },
}

// HomeShapes: turun dari atas kembali ke posisi semula (arah naik)
export const homeShapesEnterDown = {
  hidden: { opacity: 0, y: '-30vh' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...STAGE_TRANSITION, duration: 0.7 },
  },
}

// ConnectorShapes: muncul dari bawah dengan fade
export const connectorShapesEnter = {
  hidden: { opacity: 0, y: '20vh' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...STAGE_TRANSITION, duration: 0.7 },
  },
}

// ConnectorShapes: keluar ke bawah dengan fade (arah naik dari stage 2 ke 0)
export const connectorShapesExit = {
  visible: { opacity: 1, y: 0 },
  exitDown: {
    opacity: 0,
    y: '20vh',
    transition: { ...STAGE_TRANSITION, duration: 0.6 },
  },
}

// AboutShapes: muncul dari bawah dengan fade
export const aboutShapesEnter = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...STAGE_TRANSITION, duration: 0.8 },
  },
}

// AboutContent: muncul dari bawah
export const aboutContentEnter = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...STAGE_TRANSITION, duration: 0.6, delay: 0.15 },
  },
}
