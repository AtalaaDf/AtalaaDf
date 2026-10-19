import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'

export default function ProjectQuarterPanel({ quarterData }) {
  const { title, isProgress, progressText, projects = [] } = quarterData

  return (
    <motion.div
      key={quarterData.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex min-h-0 w-full flex-col items-center justify-center lg:min-h-[420px]"
    >
      {isProgress ? (
        <div className="flex h-56 w-full items-center justify-center sm:h-72 lg:h-[360px]">
          <span className="font-sans text-2xl sm:text-4xl lg:text-5xl font-bold tracking-widest text-white select-none">
            {progressText || 'ON PROGRES.....'}
          </span>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center">
          {/* Judul Quarter */}
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 text-center tracking-normal">
            {title}
          </h3>

          {/* Grid 2 Card Project */}
          <div className="grid w-full grid-cols-2 gap-3 sm:gap-6 max-w-[980px]">
            {projects.map((proj) => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
