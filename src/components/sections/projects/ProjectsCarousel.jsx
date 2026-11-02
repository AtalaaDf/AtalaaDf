import ProjectCarouselCard from './ProjectCarouselCard'

export default function ProjectsCarousel({
  scrollRef,
  repeatedProjects,
  pointerHandlers,
  onCardClick,
}) {
  return (
    <div
      ref={scrollRef}
      {...pointerHandlers}
      className="flex gap-5 lg:gap-8 overflow-x-hidden w-full cursor-grab select-none touch-pan-y py-4 px-6 lg:px-12"
      style={{ scrollBehavior: 'auto' }}
    >
      {repeatedProjects.map((proj) => (
        <ProjectCarouselCard
          key={proj._key}
          project={proj}
          onClick={() => onCardClick(proj)}
        />
      ))}
    </div>
  )
}

