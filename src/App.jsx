
import Navbar from './components/layout/Navbar'
import HeroSection from './components/sections/hero/HeroSection'
import ConnectorSection from './components/sections/connector/ConnectorSection'
import AboutSection from './components/sections/about/AboutSection'
import ProjectsSection from './components/sections/projects/ProjectsSection'

function App() {
  // State thumb track yang digunakan di About (dikirim lewat props, opsional untuk animasi)
  // AboutSection menerima trackRef dan dragProps jika ingin drag dari About langsung ke Projects
  return (
    <div className="min-h-screen bg-base text-main font-sans selection:bg-chip selection:text-main">
      <Navbar />

      <main>
        <HeroSection />
        <ConnectorSection />
        <AboutSection />
        <ProjectsSection />

        <section id="contact" className="min-h-screen flex items-center justify-center">
          {/* Section Contact */}
        </section>
      </main>
    </div>
  )
}

export default App
