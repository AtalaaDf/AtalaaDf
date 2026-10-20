import { useState, useRef, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import { PROJECTS_QUARTERS_DATA } from '../../../data/projects'
import ProjectCarouselCard from './ProjectCarouselCard'
import ProjectDetailModal from './ProjectDetailModal'

function getAllProjects() {
  const all = []
  PROJECTS_QUARTERS_DATA.forEach((quarter) => {
    if (quarter.isProgress) {
      all.push({
        id: quarter.id,
        title: quarter.title || quarter.quarter,
        description: 'Project sedang dalam proses pengerjaan.',
        isProgress: true,
        progressText: quarter.progressText || 'ON PROGRES.....',
        quarterLabel: quarter.quarter,
        quarterYear: quarter.year,
        technologies: ['Coming Soon'],
      })
    } else if (quarter.projects?.length) {
      quarter.projects.forEach((proj) => {
        all.push({
          ...proj,
          quarterLabel: quarter.quarter,
          quarterYear: quarter.year,
        })
      })
    }
  })
  return all
}

export default function ProjectsSection() {
  const allProjects = getAllProjects()
  const [selectedProject, setSelectedProject] = useState(null)

  const scrollRef = useRef(null)
  const animationRef = useRef(null)
  const inertiaAnimRef = useRef(null)
  const navAnimRef = useRef(null)
  const scrollPosRef = useRef(0)
  const isDraggingRef = useRef(false)
  const lastMoveXRef = useRef(0)
  const lastMoveTimeRef = useRef(0)
  const velocityRef = useRef(0)
  const dragDistanceRef = useRef(0)

  const REPEAT_COUNT = 4
  const repeatedProjects = []
  for (let i = 0; i < REPEAT_COUNT; i++) {
    allProjects.forEach((proj, idx) => {
      repeatedProjects.push({
        ...proj,
        _key: `${i}-${idx}-${proj.id}`,
      })
    })
  }

  const stopInertia = useCallback(() => {
    if (inertiaAnimRef.current) {
      cancelAnimationFrame(inertiaAnimRef.current)
      inertiaAnimRef.current = null
    }
  }, [])

  const stopNavAnim = useCallback(() => {
    if (navAnimRef.current) {
      cancelAnimationFrame(navAnimRef.current)
      navAnimRef.current = null
    }
  }, [])

  const resetScrollLoop = useCallback(() => {
    const container = scrollRef.current
    if (!container || allProjects.length === 0) return

    const singleSetWidth = container.scrollWidth / REPEAT_COUNT
    const currentScroll = container.scrollLeft

    if (currentScroll >= singleSetWidth * 2.5) {
      const adjusted = currentScroll - singleSetWidth
      container.scrollLeft = adjusted
      scrollPosRef.current = adjusted
    } else if (currentScroll <= singleSetWidth * 0.5) {
      const adjusted = currentScroll + singleSetWidth
      container.scrollLeft = adjusted
      scrollPosRef.current = adjusted
    }
  }, [allProjects.length])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const singleSetWidth = container.scrollWidth / REPEAT_COUNT
    container.scrollLeft = singleSetWidth
    scrollPosRef.current = singleSetWidth

    let lastTime = performance.now()

    const autoScroll = (time) => {
      if (!isDraggingRef.current && !inertiaAnimRef.current && !navAnimRef.current) {
        const delta = time - lastTime
        scrollPosRef.current += 0.8 * (delta / 16.67)
        container.scrollLeft = scrollPosRef.current
        resetScrollLoop()
      }
      lastTime = time
      animationRef.current = requestAnimationFrame(autoScroll)
    }

    animationRef.current = requestAnimationFrame(autoScroll)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      stopInertia()
      stopNavAnim()
    }
  }, [resetScrollLoop, stopInertia, stopNavAnim])

  const handlePointerDown = (e) => {
    stopInertia()
    stopNavAnim()
    isDraggingRef.current = true
    lastMoveXRef.current = e.clientX
    lastMoveTimeRef.current = performance.now()
    velocityRef.current = 0
    dragDistanceRef.current = 0

    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grabbing'
      scrollPosRef.current = scrollRef.current.scrollLeft
    }
  }

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current || !scrollRef.current) return

    const currentX = e.clientX
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

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false

    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab'
      scrollPosRef.current = scrollRef.current.scrollLeft
    }

    if (Math.abs(velocityRef.current) > 0.15) {
      let vel = velocityRef.current * 16
      const decay = 0.94

      const stepInertia = () => {
        if (!scrollRef.current || Math.abs(vel) < 0.5 || isDraggingRef.current) {
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
  const handleWheel = (e) => {
    if (!scrollRef.current) return
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      stopInertia()
      stopNavAnim()
      scrollPosRef.current += e.deltaX
      scrollRef.current.scrollLeft = scrollPosRef.current
      resetScrollLoop()
    }
  }

  const handleNavClick = (direction) => {
    stopInertia()
    stopNavAnim()
    if (!scrollRef.current) return

    const container = scrollRef.current
    const step = direction === 'left' ? -420 : 420
    const startScroll = container.scrollLeft
    const duration = 300
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

  const handleProjectClick = (project) => {
    if (project.isProgress) return
    if (dragDistanceRef.current < 6) {
      setSelectedProject(project)
    }
  }

  return (
    <>
      <section
        id="projects"
        className="relative w-full bg-base py-16 lg:py-24 overflow-hidden"
        aria-label="Section Projects"
      >
        {/* Header Section dengan navigasi kontrol */}
        <div className="mb-8 lg:mb-12 px-6 lg:px-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.8vw] font-bold text-white tracking-normal">
              Projects
            </h2>
            <p className="mt-2 font-sans text-sm sm:text-base lg:text-[1vw] text-white/60 max-w-xl">
              Kumpulan project yang telah dikerjakan selama perjalanan GDGoC.
            </p>
          </div>

          {/* Tombol Panah Navigasi Manual */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => handleNavClick('left')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all hover:bg-white/15 hover:text-white active:scale-95 cursor-pointer backdrop-blur-sm"
              aria-label="Geser ke kiri"
            >
              <LuChevronLeft className="text-xl" />
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('right')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all hover:bg-white/15 hover:text-white active:scale-95 cursor-pointer backdrop-blur-sm"
              aria-label="Geser ke kanan"
            >
              <LuChevronRight className="text-xl" />
            </button>
          </div>
        </div>

        {/* Carousel Container - Full Edge to Edge */}
        <div
          ref={scrollRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onWheel={handleWheel}
          className="flex gap-5 lg:gap-8 overflow-x-hidden w-full cursor-grab select-none touch-pan-y py-4 px-6 lg:px-12"
          style={{ scrollBehavior: 'auto' }}
        >
          {repeatedProjects.map((proj) => (
            <ProjectCarouselCard
              key={proj._key}
              project={proj}
              onClick={() => handleProjectClick(proj)}
            />
          ))}
        </div>
      </section>

      {/* Detail Modal dengan backdrop blur */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
