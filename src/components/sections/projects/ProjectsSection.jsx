import { AnimatePresence } from 'framer-motion'
import { PROJECTS_QUARTERS_DATA } from '../../../data/projects'
import ProjectQuarterPanel from './ProjectQuarterPanel'
import { useDragProgress } from '../../../hooks/useDragProgress'

export default function ProjectsSection() {
  const { activeQuarter, trackRef, dragProps } = useDragProgress({
    totalQuarters: PROJECTS_QUARTERS_DATA.length,
  })

  const currentQuarter = PROJECTS_QUARTERS_DATA[activeQuarter] || PROJECTS_QUARTERS_DATA[0]

  return (
    <section
      id="projects"
      className="relative flex min-h-screen w-full items-start overflow-hidden bg-base"
      aria-label="Section Projects"
    >
      {/* Track yang berlanjut dari About, di posisi horizontal yang sama (24.4%) */}
      <div className="absolute left-[16%] top-0 bottom-0 -translate-x-1/2 z-20 flex flex-col items-center select-none">
        <div
          ref={trackRef}
          {...dragProps}
          className="relative flex-1 w-[22px] sm:w-[28px] lg:w-[1.4vw] min-w-[20px] rounded-full border-[4px] sm:border-[5px] border-black bg-[#1c1c1c] overflow-hidden shadow-xl cursor-grab active:cursor-grabbing touch-none"
          aria-label="Track navigasi Quarter Projects"
        >
          {/* Thumb yang bergerak sesuai quarter aktif */}
          <div
            className="absolute left-0 right-0 h-[70px] sm:h-[90px] rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.9)] transition-[top] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              top: `${(activeQuarter / (PROJECTS_QUARTERS_DATA.length - 1)) * 85}%`,
            }}
          />
        </div>

        {/* Badge Quarter di kanan track, bergerak bersama thumb */}
        <div
          className="absolute left-[calc(100%+10px)]"
          style={{
            top: `${(activeQuarter / (PROJECTS_QUARTERS_DATA.length - 1)) * 85}%`,
            transition: 'top 300ms cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          <div className="inline-flex flex-col items-center justify-center rounded-xl border border-white/20 bg-[#181818] px-3 sm:px-4 py-2 shadow-2xl whitespace-nowrap">
            <span className="font-sans text-[10px] sm:text-xs font-semibold tracking-wider text-white">
              {currentQuarter.year}
            </span>
            <span className="font-sans text-[10px] sm:text-xs font-semibold tracking-wider text-white">
              {currentQuarter.quarter}
            </span>
          </div>
        </div>
      </div>

      {/* Konten quarter di kanan track */}
      <div className="w-full flex flex-col items-center py-24 pl-[20%] pr-6 sm:pr-12">
        <AnimatePresence mode="wait">
          <ProjectQuarterPanel key={currentQuarter.id} quarterData={currentQuarter} />
        </AnimatePresence>
      </div>
    </section>
  )
}
