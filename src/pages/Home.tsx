import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Benefits from '../components/Benefits'
import Features from '../components/Features'
import AudioGuide from '../components/AudioGuide'
import AppDownload from '../components/AppDownload'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <Benefits />
        <Features />
        <AudioGuide />
        <AppDownload />
      </main>
      <Footer />
    </div>
  )
}
