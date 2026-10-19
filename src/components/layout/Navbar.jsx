import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '../../data/navLinks'
import { navbarPillVariants, navbarContentVariants } from '../../animations/navbar'
import { useActiveSection } from '../../hooks/useActiveSection'
import NavMenuItem from './NavMenuItem'
import ProjectsDropdown from './ProjectsDropdown'

export default function Navbar() {
  const { activeSection, scrollToSection } = useActiveSection([
    'home',
    'about',
    'projects',
    'contact',
  ])

  const isProjects = activeSection === 'projects'

  return (
    <header className="pointer-events-none fixed top-3 left-0 right-0 z-50 flex justify-center px-3 sm:top-6 sm:px-0">
      <motion.nav
        variants={navbarPillVariants}
        initial="default"
        animate={isProjects ? 'projects' : 'default'}
        className="pointer-events-auto relative flex h-12 max-w-full items-center justify-center rounded-full border border-white/20 bg-glass/85 px-2 shadow-lg backdrop-blur-md sm:px-6"
        aria-label="Navigasi Utama"
      >
        <AnimatePresence mode="wait">
          {isProjects ? (
            <motion.div
              key="projects-pill"
              variants={navbarContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex items-center"
            >
              <ProjectsDropdown onSelectSection={scrollToSection} />
            </motion.div>
          ) : (
            <motion.ul
              key="default-menu"
              variants={navbarContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex items-center gap-1 sm:gap-4 lg:gap-7"
            >
              {NAV_LINKS.map((item) => (
                <NavMenuItem
                  key={item.id}
                  label={item.label}
                  icon={item.icon}
                  isActive={activeSection === item.id}
                  onClick={() => scrollToSection(item.id)}
                />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  )
}
