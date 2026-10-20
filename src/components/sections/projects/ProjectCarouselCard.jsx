import { LuImage, LuExternalLink, LuClock } from 'react-icons/lu'

export default function ProjectCarouselCard({ project, onClick }) {
  const { title, description, image, technologies = [], quarterLabel, quarterYear, isProgress, progressText } = project

  if (isProgress) {
    return (
      <div
        className="group relative flex-shrink-0 w-[280px] sm:w-[340px] lg:w-[400px] flex flex-col justify-between overflow-hidden rounded-2xl lg:rounded-3xl border border-dashed border-white/20 bg-card/60 backdrop-blur-sm p-6 lg:p-8 select-none transition-all duration-300 hover:border-white/35"
      >
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-sans text-[10px] lg:text-xs font-medium text-white/80">
              {quarterYear} · {quarterLabel}
            </span>
          </div>
          <LuClock className="text-white/40 text-lg" aria-hidden="true" />
        </div>

        <div className="my-8 text-center">
          <span className="font-sans text-xl sm:text-2xl lg:text-3xl font-bold tracking-widest text-white/90">
            {progressText || 'ON PROGRES.....'}
          </span>
          <p className="mt-3 font-sans text-xs sm:text-sm text-white/50 leading-relaxed max-w-[260px] mx-auto">
            Project untuk quarter ini sedang dalam tahap pengerjaan.
          </p>
        </div>

        <div className="flex items-center justify-center">
          <span className="rounded-full bg-white/5 px-3 py-1 font-sans text-[10px] lg:text-xs font-medium text-white/60 border border-white/10">
            Coming Soon
          </span>
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
      className="group relative flex-shrink-0 w-[280px] sm:w-[340px] lg:w-[400px] flex flex-col overflow-hidden rounded-2xl lg:rounded-3xl border border-white/10 bg-card transition-all duration-300 hover:border-white/25 hover:shadow-[0_8px_40px_rgba(255,255,255,0.06)] cursor-pointer select-none"
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
        <div className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 backdrop-blur-sm border border-white/15">
          <span className="font-sans text-[10px] lg:text-xs font-medium text-white/90 tracking-wide">
            {quarterYear} · {quarterLabel}
          </span>
        </div>

        {/* Hover view indicator */}
        <div className="absolute top-3 right-3 rounded-full bg-black/50 p-2 backdrop-blur-sm border border-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-white/80">
          <LuExternalLink className="text-xs" aria-hidden="true" />
        </div>
      </div>

      {/* Konten Card */}
      <div className="flex flex-1 flex-col justify-between p-4 lg:p-6">
        <div>
          <h3 className="mb-2 font-serif text-base lg:text-lg font-bold text-white tracking-normal line-clamp-1">
            {title}
          </h3>
          <p className="mb-4 font-sans text-xs lg:text-sm leading-relaxed text-white/60 line-clamp-2">
            {description}
          </p>
        </div>

        {/* Teknologi */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
          {technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-white/8 px-2.5 py-1 font-sans text-[10px] lg:text-xs font-medium text-white/75 border border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl lg:rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-white/[0.03] to-transparent" />
    </div>
  )
}
