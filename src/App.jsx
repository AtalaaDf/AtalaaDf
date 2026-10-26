
import Navbar from './components/layout/Navbar'
import ScrollStage from './components/sections/stage/ScrollStage'
import ProjectsSection from './components/sections/projects/ProjectsSection'
import ContactSection from './components/sections/contact/ContactSection'
import Footer from './components/layout/Footer'

function App() {
  return (
    <div className="min-h-screen bg-base text-main font-sans selection:bg-chip selection:text-main">
      <Navbar />

      <main>
        <ScrollStage />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
