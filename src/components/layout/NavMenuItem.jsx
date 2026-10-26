import { LuHouse, LuFolderKanban, LuBriefcase, LuPhone } from 'react-icons/lu'

const ICON_MAP = {
  home: LuHouse,
  about: LuBriefcase,
  projects: LuFolderKanban,
  contact: LuPhone,
}

export default function NavMenuItem({
  label,
  icon,
  isActive = false,
  onClick,
  className = '',
}) {
  const IconComponent = typeof icon === 'string' ? ICON_MAP[icon] : icon

  return (
    <li className="relative flex items-center">
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className={`group relative flex items-center gap-0 px-2 py-1.5 font-sans text-sm font-medium transition-colors duration-200 cursor-pointer sm:gap-2 sm:px-3 ${
          isActive ? 'text-white' : 'text-white/60 hover:text-white'
        } ${className}`}
      >
        {IconComponent && (
          <IconComponent
            className={`text-base transition-colors duration- ${
              isActive ? 'text-white' : 'text-white/60 group-hover:text-white'
            }`}
            aria-hidden="true"
          />
        )}
        <span className="sr-only sm:not-sr-only">{label}</span>

        {isActive && (
          <span
            className="absolute -bottom-1 left-2 right-2 h-[2px] rounded-full bg-white transition-all duration-200 sm:left-3 sm:right-3"
            aria-hidden="true"
          />
        )}
      </button>
    </li>
  )
}
