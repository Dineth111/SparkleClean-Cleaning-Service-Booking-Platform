import { useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import BookingForm from '../components/BookingForm'
import Gallery from '../components/Gallery'
import Reviews from '../components/Reviews'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

function Home() {
  const [selectedService, setSelectedService] = useState('')

  const handleServiceBook = (serviceName) => {
    setSelectedService(serviceName)
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative overflow-hidden bg-slate-50 text-slate-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[34rem] bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.12),transparent_34%),radial-gradient(circle_at_top_right,rgba(30,58,95,0.12),transparent_32%)]" />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Services onBookNow={handleServiceBook} />
        <BookingForm key={selectedService || 'booking-default'} selectedService={selectedService} />
        <Gallery />
        <Reviews />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}

export default Home
