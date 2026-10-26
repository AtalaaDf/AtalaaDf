import { useState, useEffect, useRef } from 'react'
import { SCROLL_STAGE_THRESHOLDS, SCROLL_WRAPPER_HEIGHT_VH } from '../data/scrollStages'

// Hook untuk mendeteksi stage aktif dan arah scroll berdasarkan progress wrapper
export function useScrollStage(wrapperRef) {
  const [stage, setStage] = useState(0)
  const [direction, setDirection] = useState('down')
  const prevStageRef = useRef(0)

  useEffect(() => {
    const wrapper = wrapperRef?.current
    if (!wrapper) return

    const calculateStage = () => {
      const rect = wrapper.getBoundingClientRect()
      const wrapperHeight = wrapper.offsetHeight
      const viewportHeight = window.innerHeight

      // Berapa jauh puncak wrapper telah melewati atas viewport
      const scrolled = -rect.top
      // Total jarak scroll yang mungkin (wrapper tinggi dikurangi satu layar sticky)
      const maxScroll = wrapperHeight - viewportHeight

      if (maxScroll <= 0) return

      const progress = Math.max(0, Math.min(1, scrolled / maxScroll))

      // Tentukan stage berdasarkan ambang batas
      let newStage = 0
      for (let i = SCROLL_STAGE_THRESHOLDS.length - 1; i >= 0; i--) {
        if (progress >= SCROLL_STAGE_THRESHOLDS[i].threshold) {
          newStage = SCROLL_STAGE_THRESHOLDS[i].stage
          break
        }
      }

      if (newStage !== prevStageRef.current) {
        setDirection(newStage > prevStageRef.current ? 'down' : 'up')
        prevStageRef.current = newStage
        setStage(newStage)
      }
    }

    window.addEventListener('scroll', calculateStage, { passive: true })
    calculateStage()

    return () => {
      window.removeEventListener('scroll', calculateStage)
    }
  }, [wrapperRef])

  return { stage, direction }
}
