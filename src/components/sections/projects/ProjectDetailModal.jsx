import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { LuX, LuExternalLink, LuImage } from 'react-icons/lu'

export default function ProjectDetailModal({ project, onClose }) {
  const { title, description, image, technologies = [], visitUrl = '#', quarterLabel, quarterYear } = project

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/15 bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 border border-white/20 text-white/80 transition-colors hover:bg-white/15 hover:text-white cursor-pointer backdrop-blur-sm"
          aria-label="Tutup detail project"
        >
          <LuX className="text-lg" />
        </button>

        {/* Gambar Project */}
        <div className="relative aspect-video w-full overflow-hidden bg-black/60">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-white/30">
              <LuImage className="text-5xl" aria-hidden="true" />
              <span className="font-sans text-sm tracking-wider">Preview Gambar</span>
            </div>
          )}

          {/* Quarter Badge */}
          <div className="absolute bottom-4 left-4 rounded-full bg-black/60 px-4 py-1.5 backdrop-blur-sm border border-white/15">
            <span className="font-sans text-xs font-semibold text-white/90 tracking-wide">
              {quarterYear} -- {quarterLabel}
            </span>
          </div>
        </div>

        {/* Konten Detail */}
        <div className="p-6 sm:p-8">
          <h3 className="mb-3 font-serif text-2xl sm:text-3xl font-bold text-white tracking-normal">
            {title}
          </h3>

          <p className="mb-6 font-sans text-sm leading-relaxed text-white/70">
            {description}
          </p>

          {/* Teknologi */}
          <div className="mb-6 flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-white/10 px-3 py-1.5 font-sans text-xs sm:text-sm font-medium text-white/85 border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Tautan Visit */}
          <div className="flex items-center justify-end border-t border-white/10 pt-4">
            <a
              href={visitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-white/20 cursor-pointer border border-white/15"
            >
              <span>Visit Project</span>
              <LuExternalLink className="text-sm" aria-hidden="true" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
