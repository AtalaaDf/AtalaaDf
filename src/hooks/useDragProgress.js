import { useState, useRef, useCallback } from 'react'

export function useDragProgress({ totalQuarters = 4 } = {}) {
  const [activeQuarter, setActiveQuarter] = useState(0)
  const trackRef = useRef(null)
  const isDraggingRef = useRef(false)

  const updateQuarterFromPointer = useCallback(
    (clientY) => {
      if (!trackRef.current) return
      const rect = trackRef.current.getBoundingClientRect()
      const relativeY = clientY - rect.top
      const rawProgress = Math.max(0, Math.min(1, relativeY / rect.height))
      const targetIndex = Math.min(
        totalQuarters - 1,
        Math.floor(rawProgress * totalQuarters)
      )
      setActiveQuarter(targetIndex)
    },
    [totalQuarters]
  )

  const handlePointerDown = useCallback(
    (e) => {
      isDraggingRef.current = true
      updateQuarterFromPointer(e.clientY)

      const onPointerMove = (moveEvent) => {
        if (!isDraggingRef.current) return
        updateQuarterFromPointer(moveEvent.clientY)
      }

      const onPointerUp = () => {
        isDraggingRef.current = false
        window.removeEventListener('pointermove', onPointerMove)
        window.removeEventListener('pointerup', onPointerUp)
      }

      window.addEventListener('pointermove', onPointerMove)
      window.addEventListener('pointerup', onPointerUp)
    },
    [updateQuarterFromPointer]
  )

  const selectQuarter = useCallback(
    (index) => {
      if (index >= 0 && index < totalQuarters) {
        setActiveQuarter(index)
      }
    },
    [totalQuarters]
  )

  return {
    activeQuarter,
    selectQuarter,
    trackRef,
    dragProps: {
      onPointerDown: handlePointerDown,
    },
  }
}
