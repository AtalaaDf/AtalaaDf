// Ambang batas progress scroll untuk stage koreografi di ConnectorSection
// Progress 0.0 = puncak wrapper, 1.0 = dasar wrapper
export const CONNECTOR_STAGE_THRESHOLDS = [
  { stage: 1, name: 'connector', threshold: 0.0 },
  { stage: 2, name: 'acakan1', threshold: 0.35 },
  { stage: 3, name: 'acakan2', threshold: 0.68 },
]

// Tinggi total wrapper koreografi connector (kelipatan viewport height)
export const CONNECTOR_WRAPPER_HEIGHT_VH = 260

// Alias untuk kompatibilitas
export const SCROLL_STAGE_THRESHOLDS = CONNECTOR_STAGE_THRESHOLDS
export const SCROLL_WRAPPER_HEIGHT_VH = CONNECTOR_WRAPPER_HEIGHT_VH
