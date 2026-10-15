import HeroLeftColumn from './HeroLeftColumn'
import HomeShapes from './HomeShapes'

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-base pt-20 lg:pt-0"
    >
      <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-2">
        <HeroLeftColumn />
        <HomeShapes />
      </div>
    </section>
  )
}
