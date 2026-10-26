import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { LuX, LuExternalLink, LuImage } from 'react-icons/lu'
import { Badge } from '../../ui/Badge'
import { Button } from '../../ui/Button'

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
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal Dialog Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-[#1c1c1c] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-md bg-black/60 border border-white/15 text-white/70 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
          aria-label="Tutup detail project"
        >
          <LuX className="" />
        </button>

        {/* Gambar Project */}
        <div className="relative aspect-video w-full overflow-hidden bg-black/50">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-white/30">
              <LuImage className="text-4xl" aria-hidden="true" />
              <span className="font-sans text-xs tracking-wider">Preview Gambar</span>
            </div>
          )}

          {/* Quarter Badge */}
          <div className="absolute bottom-3 left-3">
            <Badge variant="default" className="bg-black/70 backdrop-blur-sm border-white/20 text-xs py-1 px-3">
              {quarterYear} · {quarterLabel}
            </Badge>
          </div>
        </div>

        {/* Konten Detail */}
        <div className="p-6">
          <h3 className="mb-2 font-serif text-xl sm:text-2xl font-bold text-white tracking-normal">
            {title}
          </h3>

          <p className="mb-5 font-sans text-xs sm:text-sm leading-relaxed text-white/65">
            {description}
          </p>

          {/* Teknologi */}
          <div className="mb-6 flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs font-normal"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* Tautan Visit */}
          <div className="flex items-center justify-end border-t border-white/10 pt-4">
            <a
              href={visitUrl}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
            >
              <Button size="sm" variant="default" className="flex items-center gap-2 text-xs">
                <span>Visit Project</span>
                <LuExternalLink className="text-xs" aria-hidden="true" />
              </Button>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
