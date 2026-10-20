import AboutShapes from './AboutShapes'
import AboutCard from './AboutCard'
import TechnologiesList from './TechnologiesList'

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-0 w-full flex-col overflow-x-clip lg:overflow-visible bg-base lg:min-h-screen lg:flex-row"
      aria-label="Section About"
    >
      {/* Shapes */}
      <AboutShapes />

      {/* Konten */}
      <div className="relative z-10 w-full flex flex-col justify-center px-5 pt-6 pb-6 sm:px-10 lg:w-full lg:pl-[40%] lg:pr-16 lg:py-28">
        <div className="flex max-w-[840px] flex-col gap-4 lg:gap-8">
          <AboutCard />
          <TechnologiesList />
        </div>
      </div>
    </section>
  )
}
