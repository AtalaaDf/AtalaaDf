import { LuExternalLink, LuImage } from 'react-icons/lu'

export default function ProjectCard({ project }) {
  const { title, description, image, technologies = [], visitUrl = '#' } = project

  return (
    <div className="group flex min-w-0 flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-card p-2 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-2xl sm:rounded-3xl sm:p-4 lg:p-6">
      <div>
        {/* Gambar Project */}
        <div className="relative mb-3 flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black/40 sm:mb-5 sm:rounded-2xl">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center gap-1 text-white/40">
              <LuImage className="text-xl sm:text-4xl" aria-hidden="true" />
              <span className="text-center font-sans text-[8px] tracking-wider sm:text-xs">Preview Gambar</span>
            </div>
          )}
        </div>

        {/* Judul & Deskripsi */}
        <h4 className="mb-1 text-sm font-bold tracking-normal text-white sm:mb-2 sm:text-xl">
          {title}
        </h4>
        <p className="mb-2 line-clamp-3 font-sans text-[9px] leading-relaxed text-white/70 sm:mb-4 sm:text-sm">
          {description}
        </p>

        {/* Daftar Teknologi */}
        <div className="mb-3 flex flex-wrap gap-1 sm:mb-6 sm:gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-white/10 px-1.5 py-1 font-sans text-[8px] font-medium text-white/90 sm:px-3 sm:text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Tautan Visit Project */}
      <div className="flex items-center justify-end border-t border-white/10 pt-2">
        <a
          href={visitUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex cursor-pointer items-center gap-1 font-sans text-[9px] font-semibold text-white/80 transition-colors hover:text-white sm:gap-1.5 sm:text-sm"
        >
          <span>Visit Project</span>
          <LuExternalLink className="text-xs sm:text-sm" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
