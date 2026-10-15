import AboutShapes from './AboutShapes'
import AboutCard from './AboutCard'
import TechnologiesList from './TechnologiesList'

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen w-full overflow-hidden bg-base"
      aria-label="Section About"
    >
      {/* Shapes */}
      <AboutShapes />

      {/* Konten */}
      <div className="relative z-10 w-full flex flex-col justify-center pl-[40%] pr-6 sm:pr-10 lg:pr-16 py-24 lg:py-28">
        <div className="flex flex-col gap-8 max-w-[840px]">
          <AboutCard />
          <TechnologiesList />
        </div>
      </div>
    </section>
  )
}
