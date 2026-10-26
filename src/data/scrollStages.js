// Ambang batas progress scroll untuk setiap stage koreografi
// Progress 0.0 = puncak wrapper, 1.0 = dasar wrapper
export const SCROLL_STAGE_THRESHOLDS = [
  { stage: 0, name: 'home', threshold: 0.0 },
  { stage: 1, name: 'connector', threshold: 0.15 },
  { stage: 2, name: 'acakan1', threshold: 0.35 },
  { stage: 3, name: 'acakan2', threshold: 0.55 },
  { stage: 4, name: 'about', threshold: 0.75 },
]

// Tinggi total wrapper (kelipatan viewport height)
export const SCROLL_WRAPPER_HEIGHT_VH = 450
