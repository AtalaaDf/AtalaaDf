import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LuHouse, LuBriefcase, LuPhone } from 'react-icons/lu'
import { PROJECTS_DROPDOWN_LINKS } from '../../data/navLinks'
import { PROJECTS_QUARTERS_DATA } from '../../data/projects'
import { dropdownVariants } from '../../animations/navbar'
import { useProjectQuarter } from '../../hooks/ProjectQuarterContext'

const DROPDOWN_ICONS = {
  home: LuHouse,
  about: LuBriefcase,
  contact: LuPhone,
}

export default function ProjectsDropdown({ onSelectSection }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { selectedQuarterId, setSelectedQuarterId } = useProjectQuarter()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSelect = (id) => {
    onSelectSection(id)
    setIsOpen(false)
  }

  const handleSelectQuarter = (quarterId) => {
    setSelectedQuarterId(quarterId)
    document.getElementById('projects')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className="relative flex items-center">
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="font-sans text-sm font-semibold tracking-wide text-white">
          Projects
        </span>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label="Buka menu navigasi cepat"
          className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-200 hover:bg-white/20 active:scale-95 cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-3 w-3 fill-white/80 transition-transform duration-200 ${
              isOpen ? 'rotate-90' : 'rotate-0'
            }`}
            aria-hidden="true"
          >
            <polygon points="6,4 18,12 6,20" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute top-[calc(100%+12px)] -right-2 sm:right-0 flex min-w-[190px] flex-col gap-1 rounded-2xl border border-white/20 bg-glass/95 p-2 shadow-2xl backdrop-blur-md z-50"
          >
            {/* Header Quarters */}
            <div className="px-2.5 pt-1 pb-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/40">
              Quarters
            </div>
            {PROJECTS_QUARTERS_DATA.map((quarter) => {
              const isActive = selectedQuarterId === quarter.id
              return (
                <button
                  key={quarter.id}
                  type="button"
                  onClick={() => handleSelectQuarter(quarter.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-left font-sans text-xs font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-white/20 text-white font-semibold'
                      : 'text-white/80 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    )}
                    {quarter.quarter}
                  </span>
                  <span className="text-[10px] text-white/45">{quarter.year}</span>
                </button>
              )
            })}

            <div className="my-1 border-t border-white/10" />

            {/* Header Navigasi Halaman */}
            <div className="px-2.5 pt-1 pb-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/40">
              Navigasi Halaman
            </div>
            {PROJECTS_DROPDOWN_LINKS.map((item) => {
              const IconComp = DROPDOWN_ICONS[item.id]
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className="flex w-full items-center gap-2 rounded-xl px-2.5 py-1.5 text-left font-sans text-xs font-medium text-white/80 hover:bg-white/15 hover:text-white transition-colors cursor-pointer"
                >
                  {IconComp && <IconComp className="text-xs shrink-0" aria-hidden="true" />}
                  <span>{item.label}</span>
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
