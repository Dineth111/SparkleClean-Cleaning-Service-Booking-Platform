import { useEffect, useState } from 'react'
import api from '../api/axios'

function Services({ onBookNow }) {
  const [services, setServices] = useState([])

  useEffect(() => {
    const loadServices = async () => {
      const res = await api.get('/api/services')
      setServices(res.data)
    }
    loadServices()
  }, [])

  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="mb-10 text-center text-3xl font-bold text-primary">Our Services</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div key={service._id} className="overflow-hidden rounded-xl bg-white shadow">
            <img src={service.imageUrl} alt={service.name} className="h-52 w-full object-cover" />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-primary">{service.name}</h3>
              <p className="mt-2 text-slate-600">{service.description}</p>
              <p className="mt-3 font-bold text-accent">${service.price}</p>
              <button
                onClick={() => onBookNow(service.name)}
                className="mt-4 rounded-lg bg-primary px-4 py-2 text-white"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services
