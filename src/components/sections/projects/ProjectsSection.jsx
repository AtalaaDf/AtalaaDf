import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useProjectsCarousel } from '../../../hooks/useProjectsCarousel'
import ProjectsHeader from './ProjectsHeader'
import ProjectsCarousel from './ProjectsCarousel'
import ProjectDetailModal from './ProjectDetailModal'

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null)
  const {
    scrollRef,
    repeatedProjects,
    handleNavClick,
    pointerHandlers,
    handleCardClick,
  } = useProjectsCarousel()

  return (
    <>
      <section
        id="projects"
        className="relative w-full bg-base py-16 lg:py-24 overflow-hidden"
        aria-label="Section Projects"
      >
        <ProjectsHeader onNavClick={handleNavClick} />

        <ProjectsCarousel
          scrollRef={scrollRef}
          repeatedProjects={repeatedProjects}
          pointerHandlers={pointerHandlers}
          onCardClick={(proj) => handleCardClick(proj, setSelectedProject)}
        />
      </section>

      {/* Modal detail card */}
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
