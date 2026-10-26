import { useState, useRef, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import { PROJECTS_QUARTERS_DATA } from '../../../data/projects'
import ProjectCarouselCard from './ProjectCarouselCard'
import ProjectDetailModal from './ProjectDetailModal'

// Susun semua project dari data quarter
function getAllProjects() {
  const all = []
  PROJECTS_QUARTERS_DATA.forEach((quarter) => {
    if (quarter.isProgress) {
      all.push({
        id: quarter.id,
        title: quarter.title || quarter.quarter,
        description: 'Project sedang dalam proses pengerjaan.',
        isProgress: true,
        progressText: quarter.progressText || 'ON PROGRESS.....',
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

  // Hentikan animasi inersia
  const stopInertia = useCallback(() => {
    if (inertiaAnimRef.current) {
      cancelAnimationFrame(inertiaAnimRef.current)
      inertiaAnimRef.current = null
    }
  }, [])

  // Hentikan animasi tombol nav
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
    // Card pertama dari set ke-1 (indeks = allProjects.length)
    const targetCard = cards[allProjects.length] || cards[0]
    if (targetCard) {
      const targetScroll =
        targetCard.offsetLeft - (container.clientWidth - targetCard.offsetWidth) / 2
      container.scrollLeft = targetScroll
      scrollPosRef.current = targetScroll
    }
  }, [allProjects.length])

  // Inisialisasi posisi tengah Q1 & auto-scroll kontinu
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    // Tunggu layout ter-render untuk menghitung posisi tengah yang akurat
    const rafId = requestAnimationFrame(() => {
      centerQ1()
    })

    let lastTime = performance.now()

    const autoScroll = (time) => {
      // Auto-scroll hanya berjalan saat tidak di-hover, tidak di-drag, dan tidak ada animasi manual
      if (
        !isHoveredRef.current &&
        !isDraggingRef.current &&
        !inertiaAnimRef.current &&
        !navAnimRef.current
      ) {
        const delta = time - lastTime
        // Kecepatan konstan 0.65px per 16.6ms
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
    startXRef.current = e.clientX
    startYRef.current = e.clientY
    lastMoveXRef.current = e.clientX
    lastMoveTimeRef.current = performance.now()
    velocityRef.current = 0
    dragDistanceRef.current = 0
    isDirectionLockedRef.current = null

    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grabbing'
      scrollPosRef.current = scrollRef.current.scrollLeft
    }
  }

  // Pointer Move: Deteksi arah agar scroll halaman vertikal tidak menggeser kartu
  const handlePointerMove = (e) => {
    if (!isDraggingRef.current || !scrollRef.current) return

    const currentX = e.clientX
    const currentY = e.clientY
    const deltaTotalX = currentX - startXRef.current
    const deltaTotalY = currentY - startYRef.current

    // Deteksi apakah pengguna berniat scroll vertikal atau horizontal
    if (!isDirectionLockedRef.current) {
      if (Math.abs(deltaTotalX) > 6 || Math.abs(deltaTotalY) > 6) {
        if (Math.abs(deltaTotalY) > Math.abs(deltaTotalX)) {
          // Arah dominan vertikal: batalkan drag kartu agar halaman bisa scroll normal
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

    // Terapkan perlambatan inersia jika ada kecepatan lempar
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

  // Wheel horizontal murni (touchpad swipe horizontal)
  const handleWheel = (e) => {
    if (!scrollRef.current) return
    // Hanya respon jika gerakan roda benar-benar horizontal dan disengaja
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
        {/* Header Section dengan judul dan tombol navigasi manual */}
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

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={() => {
            isHoveredRef.current = false
            handlePointerUp()
          }}
          onPointerEnter={() => {
            isHoveredRef.current = true
          }}
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
