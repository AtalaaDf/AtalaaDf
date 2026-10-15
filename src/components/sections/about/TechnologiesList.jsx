import { TECHNOLOGIES_DATA } from '../../../data/technologies'
import Chip from '../../ui/Chip'
import SectionTitle from '../../ui/SectionTitle'

export default function TechnologiesList() {
  return (
    <div className="w-full flex flex-col gap-5">
      <SectionTitle fontFamily="sans" className="text-2xl sm:text-3xl lg:text-[1.8vw]">
        Technologies I Use
      </SectionTitle>
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {TECHNOLOGIES_DATA.map((tech) => (
          <Chip
            key={tech}
            className="px-5 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm cursor-default transition-all duration-200 hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_8px_20px_rgba(0,0,0,0.6)] hover:border hover:border-white/20"
          >
            {tech}
          </Chip>
        ))}
      </div>
    </div>
  )
}
