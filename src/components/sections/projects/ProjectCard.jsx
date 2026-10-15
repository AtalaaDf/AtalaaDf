import { LuExternalLink, LuImage } from 'react-icons/lu'

export default function ProjectCard({ project }) {
  const { title, description, image, technologies = [], visitUrl = '#' } = project

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-card p-5 sm:p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-2xl">
      <div>
        {/* Gambar Project */}
        <div className="relative mb-5 flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl bg-black/40 border border-white/5">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-white/40">
              <LuImage className="text-3xl sm:text-4xl" aria-hidden="true" />
              <span className="font-sans text-xs tracking-wider">Preview Gambar</span>
            </div>
          )}
        </div>

        {/* Judul & Deskripsi */}
        <h4 className="font-sans text-lg sm:text-xl font-bold text-white mb-2 tracking-normal">
          {title}
        </h4>
        <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Daftar Teknologi */}
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-white/10 px-3 py-1 font-sans text-[11px] sm:text-xs font-medium text-white/90"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Tautan Visit Project */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-end">
        <a
          href={visitUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm font-semibold text-white/80 transition-colors hover:text-white cursor-pointer"
        >
          <span>Visit Project</span>
          <LuExternalLink className="text-sm" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
