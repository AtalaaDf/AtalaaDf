import SectionTitle from '../../ui/SectionTitle'

export default function AboutCard() {
  return (
    <div className="w-full max-w-[1267px] rounded-3xl lg:rounded-[36px] bg-card border border-white/5 p-6 sm:p-12 lg:pt-[50px] lg:pl-[90px] shadow-sm">
      <SectionTitle fontFamily="sans" className="text-2xl sm:text-3xl lg:text-[1.8vw] mb-4">
        About Me
      </SectionTitle>
      <div className="min-h-[120px] sm:min-h-[160px] text-white/60 font-sans text-sm sm:text-base leading-relaxed">
        {/* Placeholder teks */}
      </div>
    </div>
  )
}
