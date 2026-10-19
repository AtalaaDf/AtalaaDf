import { useState, useEffect, useRef } from 'react'

export function useAutoRotate({ baseSpeed = 0.003 } = {}) {
  const [rotationAngle, setRotationAngle] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const isDraggingRef = useRef(false)
  const lastPointerXRef = useRef(0)
  const velocityRef = useRef(baseSpeed)
  const animFrameIdRef = useRef(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )
    const updateMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    updateMotionPreference()
    mediaQuery.addEventListener('change', updateMotionPreference)

    return () => {
      mediaQuery.removeEventListener('change', updateMotionPreference)
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return undefined

    let lastTime = performance.now()

    const updateLoop = (currentTime) => {
      const deltaTime = (currentTime - lastTime) / 16.67
      lastTime = currentTime

      if (!isDraggingRef.current) {
        velocityRef.current += (baseSpeed - velocityRef.current) * 0.04
        setRotationAngle((prev) => prev + velocityRef.current * deltaTime)
      }

      animFrameIdRef.current = requestAnimationFrame(updateLoop)
    }

    animFrameIdRef.current = requestAnimationFrame(updateLoop)

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current)
      }
    }
  }, [baseSpeed, prefersReducedMotion])

  const handlePointerDown = (e) => {
    isDraggingRef.current = true
    lastPointerXRef.current = e.clientX
    velocityRef.current = 0
  }

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return
    const deltaX = e.clientX - lastPointerXRef.current
    lastPointerXRef.current = e.clientX

    const deltaAngle = deltaX * 0.008
    velocityRef.current = deltaAngle
    setRotationAngle((prev) => prev + deltaAngle)
  }

  const handlePointerUp = () => {
    isDraggingRef.current = false
  }

  return {
    rotationAngle,
    dragProps: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerUp,
    },
  }
}
