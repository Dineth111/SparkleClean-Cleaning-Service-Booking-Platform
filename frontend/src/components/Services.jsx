import PropTypes from 'prop-types'
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
    <section id="services" className="mx-auto max-w-6xl px-4 py-20 md:py-24">
      <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">Service Menu</p>
          <h2 className="mt-3 text-3xl font-black text-primary md:text-4xl">
            Choose the right cleaning package for your space.
          </h2>
          <p className="mt-3 text-slate-600 leading-7">
            Browse the cleaning categories we offer, compare the details at a glance, and jump
            straight into booking when you’re ready.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Services available</p>
          <p className="text-2xl font-black text-primary">8+</p>
        </div>
      </div>
      {error && (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-center text-red-700">
          {error}
        </p>
      )}

      {!error && loading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((card) => (
            <div key={card} className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
              <div className="h-52 animate-pulse bg-slate-200" />
              <div className="space-y-3 p-5">
                <div className="h-4 w-20 animate-pulse rounded-full bg-slate-200" />
                <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
                <div className="mt-4 h-11 w-32 animate-pulse rounded-full bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!error && !loading && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div key={service._id} className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative">
                <img src={service.imageUrl} alt={service.name} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute left-4 top-4 rounded-full bg-slate-950/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur">
                  {service.category || 'Service'}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-black text-primary">{service.name}</h3>
                  <p className="rounded-full bg-teal-50 px-3 py-1 text-sm font-extrabold text-accent">
                    ${service.price}
                  </p>
                </div>
                <p className="mt-3 min-h-24 text-slate-600 leading-7">{service.description}</p>
                <button
                  onClick={() => onBookNow(service.name)}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-slate-950"
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

Services.propTypes = {
  onBookNow: PropTypes.func.isRequired,
}
