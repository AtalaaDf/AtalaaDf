import { LuArrowDown } from 'react-icons/lu'

export default function DragHandle({ className = '', onDragClick }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Tombol lingkaran kaca */}
      <div
        role="button"
        tabIndex={0}
        onClick={onDragClick}
        aria-label="Tarik ke bawah untuk navigasi projects"
        className="flex h-[50px] w-[50px] sm:h-[70px] sm:w-[70px] lg:h-[3.1vw] lg:w-[3.1vw] items-center justify-center rounded-full border border-white/25 bg-glass shadow-lg backdrop-blur-sm cursor-grab active:cursor-grabbing hover:border-white/40 transition-colors"
      >
        <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-white/40" />
      </div>

      {/* Teks panduan Drag Down dan ikon panah */}
      <div className="flex items-center gap-2 text-white font-sans text-xs sm:text-sm lg:text-[1.2vw] select-none">
        <span>Drag Down</span>
        <LuArrowDown className="text-base sm:text-lg animate-bounce" aria-hidden="true" />
      </div>
    </div>
  )
}
