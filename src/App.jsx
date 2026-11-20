import Hero from './components/Hero'
import BackgroundMusic from './components/BackgroundMusic'
import Countdown from './components/Countdown'
import Couples from './components/Couples'
import Schedule from './components/Schedule'
import FamilyInvite from './components/FamilyInvite'
import Venue from './components/Venue'
import Gallery from './components/Gallery'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import './App.css'

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function App() {
  return (
    <div className="page">
      <BackgroundMusic />
      <Hero onNavigate={scrollToId} />
      <Countdown />
      <Couples />
      <Schedule />
      <FamilyInvite />
      <Venue />
      <Gallery />
      <FAQ />
      <Footer />
    </div>
  )
}
