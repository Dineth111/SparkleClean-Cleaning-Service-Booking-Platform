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
    <div className="bg-white">
      <Navbar />
      <Hero />
      <About />
      <Services onBookNow={handleServiceBook} />
      <BookingForm selectedService={selectedService} />
      <Gallery />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home
