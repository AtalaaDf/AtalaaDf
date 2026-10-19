import SectionTitle from '../../ui/SectionTitle'
import ContactPreview from './ContactPreview'

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="flex min-h-0 w-full flex-col items-center bg-base px-4 pt-16 pb-8 sm:px-8 lg:min-h-screen lg:pt-[8.5vw] lg:pb-20"
    >
      <SectionTitle
        id="contact-title"
        fontFamily="sans"
        className="text-center text-[clamp(2rem,10vw,3rem)] sm:text-6xl lg:text-[3.8vw]"
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
