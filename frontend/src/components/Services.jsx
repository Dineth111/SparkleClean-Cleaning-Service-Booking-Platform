import { useEffect, useState } from 'react'
import api from '../api/axios'

function Services({ onBookNow }) {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true)
        setError('')
        const res = await api.get('/api/services')
        setServices(res.data)
      } catch {
        setError('Failed to load services. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    loadServices()
  }, [])

  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="mb-10 text-center text-3xl font-bold text-primary">Our Services</h2>
      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-red-700">
          {error}
        </p>
      )}

      {!error && loading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((card) => (
            <div key={card} className="overflow-hidden rounded-xl bg-white shadow">
              <div className="h-52 animate-pulse bg-slate-200" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
                <div className="h-10 w-32 animate-pulse rounded-lg bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!error && !loading && (
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
      )}
    </section>
  )
}

export default Services
