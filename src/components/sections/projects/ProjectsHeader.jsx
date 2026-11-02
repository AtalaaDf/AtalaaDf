import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'

export default function ProjectsHeader({ onNavClick }) {
  return (
    <div className="mb-8 lg:mb-12 px-6 lg:px-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.8vw] font-bold text-white tracking-normal">
          Projects
        </h2>
        <p className="mt-2 font-sans text-sm sm:text-base lg:text-[1vw] text-white/60 max-w-xl">
          Kumpulan project yang telah dikerjakan selama perjalanan GDGoC.
        </p>
      </div>

      {/* Tombol Panah Navigasi Manual */}
      <div className="flex items-center gap-2 self-start sm:self-auto">
        <button
          type="button"
          onClick={() => onNavClick('left')}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all hover:bg-white/15 hover:text-white active:scale-95 cursor-pointer backdrop-blur-sm"
          aria-label="Geser ke kiri"
        >
          <LuChevronLeft className="text-lg" />
        </button>
        <button
          type="button"
          onClick={() => onNavClick('right')}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all hover:bg-white/15 hover:text-white active:scale-95 cursor-pointer backdrop-blur-sm"
          aria-label="Geser ke kanan"
        >
          <LuChevronRight className="text-lg" />
        </button>
      </div>
    </div>
  )
}

