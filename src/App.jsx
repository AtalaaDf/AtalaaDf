import Navbar from './components/layout/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-base text-main font-sans selection:bg-chip selection:text-main">
      <Navbar />

      <main>
        <section id="home" className="min-h-screen flex items-center justify-center">
          {/* Section Hero akan diimplementasikan pada langkah berikutnya */}
        </section>

        <section id="about" className="min-h-screen flex items-center justify-center">
          {/* Section About */}
        </section>

        <section id="projects" className="min-h-screen flex items-center justify-center">
          {/* Section Projects */}
        </section>

        <section id="contact" className="min-h-screen flex items-center justify-center">
          {/* Section Contact */}
        </section>
      </main>
    </div>
  )
}

export default App
