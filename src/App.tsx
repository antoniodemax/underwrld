import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Services } from './components/Services'
import { Stats } from './components/Stats'
import { Ticker } from './components/Ticker'
import { Work } from './components/Work'

function App() {
  return (
    <div className="min-h-svh bg-canvas text-ink">
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Services />
        <Stats />
        <Work />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
