import { LuImage, LuExternalLink, LuClock } from 'react-icons/lu'
import { Badge } from '../../ui/Badge'

export default function ProjectCarouselCard({ project, onClick }) {
  const { title, description, image, technologies = [], quarterLabel, quarterYear, isProgress, progressText } = project

  if (isProgress) {
    return (
      <div
        className="group relative flex-shrink-0 w-[280px] sm:w-[340px] lg:w-[400px] flex flex-col justify-between overflow-hidden rounded-xl border border-dashed border-white/20 bg-[#1e1e1e]/60 backdrop-blur-sm p-6 lg:p-8 select-none transition-all duration-300 hover:border-white/35"
      >
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="flex items-center gap-1.5 py-1 px-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-sans text-[11px] font-medium text-white/80">
              {quarterYear} · {quarterLabel}
            </span>
          </Badge>
          <LuClock className="text-white/40 text-base" aria-hidden="true" />
        </div>

        <div className="my-8 text-center">
          <span className="font-sans text-xl sm:text-2xl font-bold tracking-widest text-white/90">
            {progressText || 'ON PROGRESS.....'}
          </span>
          <p className="mt-3 font-sans text-xs text-white/50 leading-relaxed max-w-[260px] mx-auto">
            Project untuk quarter ini sedang dalam tahap pengerjaan.
          </p>
        </div>

        <div className="flex items-center justify-center">
          <Badge variant="outline" className="text-white/60 text-[11px] py-0.5">
            Coming Soon
          </Badge>
        </div>
      </div>
    )
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      className="group relative flex-shrink-0 w-[280px] sm:w-[340px] lg:w-[400px] flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#1e1e1e] transition-all duration-300 hover:border-white/25 hover:shadow-md cursor-pointer select-none"
    >
      {/* Gambar Project */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-white/5 via-white/[0.02] to-black/40">
        {image ? (
          <img
            src={image}
            alt={title}
            draggable={false}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-white/30">
            <LuImage className="text-3xl lg:text-4xl" aria-hidden="true" />
            <span className="font-sans text-[10px] lg:text-xs tracking-wider">Preview Project</span>
          </div>
        )}

        {/* Quarter Badge overlay */}
        <div className="absolute top-3 left-3">
          <Badge variant="default" className="bg-black/60 backdrop-blur-sm border-white/20 text-[11px]">
            {quarterYear} · {quarterLabel}
          </Badge>
        </div>

        {/* Hover view indicator */}
        <div className="absolute top-3 right-3 rounded-md bg-black/50 p-1.5 backdrop-blur-sm border border-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-white/80">
          <LuExternalLink className="text-xs" aria-hidden="true" />
        </div>
      </div>

      {/* Konten Card */}
      <div className="flex flex-1 flex-col justify-between p-4 lg:p-5">
        <div>
          <h3 className="mb-1.5 font-serif text-base lg:text-lg font-bold text-white tracking-normal line-clamp-1">
            {title}
          </h3>
          <p className="mb-3 font-sans text-xs leading-relaxed text-white/60 line-clamp-2">
            {description}
          </p>
        </div>

        {/* Teknologi */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
          {technologies.slice(0, 4).map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-[10px] font-normal py-0 px-2 text-white/70"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
