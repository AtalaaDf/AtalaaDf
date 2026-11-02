import { useRef, useEffect, useCallback, useMemo } from 'react'
import { getAllProjects } from '../data/projects'
import { useProjectQuarter } from './ProjectQuarterContext'

const REPEAT_COUNT = 4

export function useProjectsCarousel() {
  const allProjects = useMemo(() => getAllProjects(), [])
  const { targetQuarter } = useProjectQuarter()

  const scrollRef = useRef(null)
  const animationRef = useRef(null)
  const inertiaAnimRef = useRef(null)
  const navAnimRef = useRef(null)
  const scrollPosRef = useRef(0)

  // Drag & pointer refs
  const isDraggingRef = useRef(false)
  const isHoveredRef = useRef(false)
  const startXRef = useRef(0)
  const startYRef = useRef(0)
  const lastMoveXRef = useRef(0)
  const lastMoveTimeRef = useRef(0)
  const velocityRef = useRef(0)
  const dragDistanceRef = useRef(0)
  const isDirectionLockedRef = useRef(null)

  // Duplikasi 4 set untuk infinite looping mulus di kedua arah
  const repeatedProjects = useMemo(() => {
    const list = []
    for (let i = 0; i < REPEAT_COUNT; i++) {
      allProjects.forEach((proj, idx) => {
        list.push({
          ...proj,
          _key: `${i}-${idx}-${proj.id}`,
        })
      })
    }
    return list
  }, [allProjects])

  // Hentikan animasi inersia
  const stopInertia = useCallback(() => {
    if (inertiaAnimRef.current) {
      cancelAnimationFrame(inertiaAnimRef.current)
      inertiaAnimRef.current = null
    }
  }, [])

  // Hentikan animasi navigasi manual
  const stopNavAnim = useCallback(() => {
    if (navAnimRef.current) {
      cancelAnimationFrame(navAnimRef.current)
      navAnimRef.current = null
    }
  }, [])

  // Reset infinite scroll saat mendekati batas luar
  const resetScrollLoop = useCallback(() => {
    const container = scrollRef.current
    if (!container || allProjects.length === 0) return

    const singleSetWidth = container.scrollWidth / REPEAT_COUNT
    if (!singleSetWidth) return

    const currentScroll = container.scrollLeft

    // Jika lewat set ke-2, geser mundur 1 set
    if (currentScroll >= singleSetWidth * 2.5) {
      const adjusted = currentScroll - singleSetWidth
      container.scrollLeft = adjusted
      scrollPosRef.current = adjusted
    }
    // Jika mendekati set ke-0, geser maju 1 set
    else if (currentScroll <= singleSetWidth * 0.5) {
      const adjusted = currentScroll + singleSetWidth
      container.scrollLeft = adjusted
      scrollPosRef.current = adjusted
    }
  }, [allProjects.length])

  // Pusatkan Card Quarter 1 di tengah viewport pada saat inisialisasi
  const centerQ1 = useCallback(() => {
    const container = scrollRef.current
    if (!container || allProjects.length === 0) return

    const cards = container.children
    const targetCard = cards[allProjects.length] || cards[0]
    if (targetCard) {
      const targetScroll =
        targetCard.offsetLeft - (container.clientWidth - targetCard.offsetWidth) / 2
      container.scrollLeft = targetScroll
      scrollPosRef.current = targetScroll
    }
  }, [allProjects.length])

  // Fungsi scroll halus ke quarter tertentu
  const scrollToQuarter = useCallback(
    (quarterId) => {
      stopInertia()
      stopNavAnim()
      const container = scrollRef.current
      if (!container || allProjects.length === 0) return

      const targetIndexInSet = allProjects.findIndex(
        (p) => p.quarterId === quarterId || p.id === quarterId
      )
      if (targetIndexInSet === -1) return

      const cards = container.children
      const currentScroll = container.scrollLeft

      // Cari posisi scroll terdekat di antara set kartu yang di-repeat
      let closestScroll = null
      let minDiff = Infinity

      for (let i = 0; i < REPEAT_COUNT; i++) {
        const cardIdx = i * allProjects.length + targetIndexInSet
        const card = cards[cardIdx]
        if (card) {
          const scrollPos =
            card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2
          const diff = Math.abs(scrollPos - currentScroll)
          if (diff < minDiff) {
            minDiff = diff
            closestScroll = scrollPos
          }
        }
      }

      if (closestScroll === null) return

      const startScroll = currentScroll
      const step = closestScroll - startScroll
      const duration = 500
      const startTime = performance.now()

      const animateToTarget = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const ease = 1 - Math.pow(1 - progress, 3)
        const newPos = startScroll + step * ease

        scrollPosRef.current = newPos
        container.scrollLeft = newPos
        resetScrollLoop()

        if (progress < 1) {
          navAnimRef.current = requestAnimationFrame(animateToTarget)
        } else {
          navAnimRef.current = null
        }
      }

      navAnimRef.current = requestAnimationFrame(animateToTarget)
    },
    [allProjects, resetScrollLoop, stopInertia, stopNavAnim]
  )

  // Tanggapi request scroll quarter dari dropdown navbar
  useEffect(() => {
    if (targetQuarter?.id) {
      scrollToQuarter(targetQuarter.id)
    }
  }, [targetQuarter, scrollToQuarter])

  // Inisialisasi posisi tengah Q1 & auto-scroll kontinu
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const rafId = requestAnimationFrame(() => {
      centerQ1()
    })

    let lastTime = performance.now()

    const autoScroll = (time) => {
      if (
        !isHoveredRef.current &&
        !isDraggingRef.current &&
        !inertiaAnimRef.current &&
        !navAnimRef.current
      ) {
        const delta = time - lastTime
        scrollPosRef.current += 0.65 * (delta / 16.67)
        container.scrollLeft = scrollPosRef.current
        resetScrollLoop()
      }
      lastTime = time
      animationRef.current = requestAnimationFrame(autoScroll)
    }

    animationRef.current = requestAnimationFrame(autoScroll)

    return () => {
      cancelAnimationFrame(rafId)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      stopInertia()
      stopNavAnim()
    }
  }, [centerQ1, resetScrollLoop, stopInertia, stopNavAnim])

  // Pointer Down (Mouse / Touch)
  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return
    stopInertia()
    stopNavAnim()

    isDraggingRef.current = true
    isDirectionLockedRef.current = null
    dragDistanceRef.current = 0

    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0

    startXRef.current = clientX
    startYRef.current = clientY
    lastMoveXRef.current = clientX
    lastMoveTimeRef.current = performance.now()
    velocityRef.current = 0

    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grabbing'
      scrollPosRef.current = scrollRef.current.scrollLeft
    }
  }

  // Pointer Move
  const handlePointerMove = (e) => {
    if (!isDraggingRef.current || !scrollRef.current) return

    const currentX = e.clientX ?? e.touches?.[0]?.clientX ?? 0
    const currentY = e.clientY ?? e.touches?.[0]?.clientY ?? 0

    if (!isDirectionLockedRef.current) {
      const deltaTotalX = currentX - startXRef.current
      const deltaTotalY = currentY - startYRef.current

      if (Math.abs(deltaTotalX) > 6 || Math.abs(deltaTotalY) > 6) {
        if (Math.abs(deltaTotalY) > Math.abs(deltaTotalX)) {
          isDirectionLockedRef.current = 'vertical'
          isDraggingRef.current = false
          if (scrollRef.current) {
            scrollRef.current.style.cursor = 'grab'
          }
          return
        } else {
          isDirectionLockedRef.current = 'horizontal'
        }
      } else {
        return
      }
    }

    if (isDirectionLockedRef.current !== 'horizontal') return

    const deltaX = lastMoveXRef.current - currentX
    dragDistanceRef.current += Math.abs(deltaX)

    scrollPosRef.current += deltaX
    scrollRef.current.scrollLeft = scrollPosRef.current

    const now = performance.now()
    const dt = now - lastMoveTimeRef.current
    if (dt > 0) {
      velocityRef.current = deltaX / dt
    }
    lastMoveXRef.current = currentX
    lastMoveTimeRef.current = now

    resetScrollLoop()
  }

  // Pointer Up / Leave
  const handlePointerUp = () => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false

    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab'
      scrollPosRef.current = scrollRef.current.scrollLeft
    }

    if (Math.abs(velocityRef.current) > 0.15) {
      let vel = velocityRef.current * 15
      const decay = 0.94

      const stepInertia = () => {
        if (!scrollRef.current || Math.abs(vel) < 0.4 || isDraggingRef.current) {
          inertiaAnimRef.current = null
          return
        }
        scrollPosRef.current += vel
        scrollRef.current.scrollLeft = scrollPosRef.current
        vel *= decay
        resetScrollLoop()
        inertiaAnimRef.current = requestAnimationFrame(stepInertia)
      }

      inertiaAnimRef.current = requestAnimationFrame(stepInertia)
    }
  }

  // Wheel horizontal murni
  const handleWheel = (e) => {
    if (!scrollRef.current) return
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 8) {
      stopInertia()
      stopNavAnim()
      scrollPosRef.current += e.deltaX
      scrollRef.current.scrollLeft = scrollPosRef.current
      resetScrollLoop()
    }
  }

  // Tombol navigasi manual panah kiri & kanan
  const handleNavClick = (direction) => {
    stopInertia()
    stopNavAnim()
    if (!scrollRef.current) return

    const container = scrollRef.current
    const cards = container.children
    const cardWidth = cards[0] ? cards[0].offsetWidth + 32 : 432
    const step = direction === 'left' ? -cardWidth : cardWidth
    const startScroll = container.scrollLeft
    const duration = 350
    const startTime = performance.now()

    const animateNav = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      const newPos = startScroll + step * ease

      scrollPosRef.current = newPos
      container.scrollLeft = newPos
      resetScrollLoop()

      if (progress < 1) {
        navAnimRef.current = requestAnimationFrame(animateNav)
      } else {
        navAnimRef.current = null
      }
    }

    navAnimRef.current = requestAnimationFrame(animateNav)
  }

  // Klik card project (hanya jika bukan hasil drag panjang)
  const handleCardClick = (project, onSelect) => {
    if (project.isProgress) return
    if (dragDistanceRef.current < 6) {
      onSelect(project)
    }
  }

  const pointerHandlers = {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUp,
    onPointerLeave: () => {
      isHoveredRef.current = false
      handlePointerUp()
    },
    onPointerEnter: () => {
      isHoveredRef.current = true
    },
    onWheel: handleWheel,
  }

  return {
    scrollRef,
    repeatedProjects,
    handleNavClick,
    pointerHandlers,
    handleCardClick,
    scrollToQuarter,
  }
}

