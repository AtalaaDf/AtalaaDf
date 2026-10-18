
import Navbar from './components/layout/Navbar'
import HeroSection from './components/sections/hero/HeroSection'
import ConnectorSection from './components/sections/connector/ConnectorSection'
import AboutSection from './components/sections/about/AboutSection'
import ProjectsSection from './components/sections/projects/ProjectsSection'
import ContactSection from './components/sections/contact/ContactSection'

function App() {
  return (
    <div className="min-h-screen bg-base text-main font-sans selection:bg-chip selection:text-main">
      <Navbar />

      <main>
        <HeroSection />
        <ConnectorSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  )
}

export default App
