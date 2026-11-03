import HeroLeftColumn from './HeroLeftColumn'
import HomeShapes from './HomeShapes'

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-base pt-16 pb-8 lg:pt-0 lg:pb-0"
      aria-label="Section Home"
    >
      <div className="grid w-full grid-cols-1 items-center gap-4 sm:gap-8 lg:grid-cols-2">
        <HeroLeftColumn />
        <HomeShapes className="hidden lg:flex" />
      </div>
    </section>
  )
}
