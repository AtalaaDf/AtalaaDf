import SectionTitle from '../../ui/SectionTitle'
import ContactPreview from './ContactPreview'

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="flex min-h-screen w-full flex-col items-center bg-base px-4 pt-32 pb-20 sm:px-8 lg:pt-[8.5vw]"
    >
      <SectionTitle
        id="contact-title"
        fontFamily="sans"
        className="text-center text-5xl sm:text-6xl lg:text-[3.8vw]"
      >
        Get in Touch
      </SectionTitle>
      <p className="mt-3 text-center text-base text-white/60 sm:text-lg lg:mt-2 lg:text-[1.3vw]">
        Let's connect with me, collab or just say hello
      </p>
      <ContactPreview />
    </section>
  )
}
