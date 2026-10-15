import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LuHouse, LuBriefcase, LuPhone } from 'react-icons/lu'
import { PROJECTS_DROPDOWN_LINKS } from '../../data/navLinks'
import { dropdownVariants } from '../../animations/navbar'

const DROPDOWN_ICONS = {
  home: LuHouse,
  about: LuBriefcase,
  contact: LuPhone,
}

export default function ProjectsDropdown({ onSelectSection }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

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

  return (
    <div ref={dropdownRef} className="relative flex items-center">
      <div className="flex items-center gap-3">
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
            className={`h-3 w-3 fill-triangle-dark transition-transform duration-200 ${
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
          <motion.ul
            variants={dropdownVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute top-[calc(100%+12px)] -right-2 flex flex-col gap-1 rounded-2xl border border-white/20 bg-glass/95 p-1.5 shadow-2xl backdrop-blur-md min-w-[140px]"
          >
            {PROJECTS_DROPDOWN_LINKS.map((item) => {
              const IconComp = DROPDOWN_ICONS[item.id]
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(item.id)}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left font-sans text-xs font-medium text-white/80 hover:bg-white/15 hover:text-white transition-colors cursor-pointer"
                  >
                    {IconComp && <IconComp className="text-sm shrink-0" aria-hidden="true" />}
                    <span>{item.label}</span>
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
