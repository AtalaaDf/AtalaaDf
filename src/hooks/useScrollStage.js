import { useState, useEffect, useRef } from 'react'
import { CONNECTOR_STAGE_THRESHOLDS } from '../data/scrollStages'

// Hook untuk mendeteksi stage aktif dan arah scroll berdasarkan progress wrapper
export function useScrollStage(wrapperRef, thresholds = CONNECTOR_STAGE_THRESHOLDS) {
  const [stage, setStage] = useState(thresholds[0]?.stage ?? 1)
  const [direction, setDirection] = useState('down')
  const prevStageRef = useRef(thresholds[0]?.stage ?? 1)

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
      let newStage = thresholds[0]?.stage ?? 1
      for (let i = thresholds.length - 1; i >= 0; i--) {
        if (progress >= thresholds[i].threshold) {
          newStage = thresholds[i].stage
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
  }, [wrapperRef, thresholds])

  return { stage, direction }
}
