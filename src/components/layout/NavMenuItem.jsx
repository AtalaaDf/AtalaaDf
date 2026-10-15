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
        className={`group relative flex items-center gap-2 px-3 py-1.5 font-sans text-sm font-medium transition-colors duration-200 cursor-pointer ${
          isActive ? 'text-white' : 'text-white/60 hover:text-white'
        } ${className}`}
      >
        {IconComponent && (
          <IconComponent
            className={`text-base transition-colors duration-200 ${
              isActive ? 'text-white' : 'text-white/60 group-hover:text-white'
            }`}
            aria-hidden="true"
          />
        )}
        <span>{label}</span>

        {isActive && (
          <span
            className="absolute -bottom-1 left-3 right-3 h-[2px] rounded-full bg-white transition-all duration-200"
            aria-hidden="true"
          />
        )}
      </button>
    </li>
  )
}
