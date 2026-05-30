import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import api from '../api/axios'

const recentBookingsKey = 'sparkleclean_recent_bookings'
const fallbackImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='600' viewBox='0 0 900 600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%230f172a' offset='0%25'/%3E%3Cstop stop-color='%231e3a5f' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='900' height='600' fill='url(%23g)'/%3E%3Ccircle cx='760' cy='130' r='90' fill='%2314b8a6' fill-opacity='0.18'/%3E%3Ccircle cx='160' cy='470' r='120' fill='%2314b8a6' fill-opacity='0.12'/%3E%3Ctext x='60' y='500' fill='%23f8fafc' font-family='Arial, sans-serif' font-size='52' font-weight='700'%3ESparkleClean%3C/text%3E%3Ctext x='60' y='555' fill='%2394a3b8' font-family='Arial, sans-serif' font-size='28'%3EPremium cleaning service%3C/text%3E%3C/svg%3E"

function Services({ onBookNow }) {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [recentBookings, setRecentBookings] = useState({})
  const [imageErrors, setImageErrors] = useState({})

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

  useEffect(() => {
    const loadRecentBookings = () => {
      try {
        setRecentBookings(JSON.parse(localStorage.getItem(recentBookingsKey) || '{}'))
      } catch {
        setRecentBookings({})
      }
    }

    loadRecentBookings()
    globalThis.addEventListener('storage', loadRecentBookings)

    return () => {
      globalThis.removeEventListener('storage', loadRecentBookings)
    }
  }, [])

  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-20 text-slate-100 md:py-24">
      <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">Service Menu</p>
          <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">
            Choose the right cleaning package for your space.
          </h2>
          <p className="mt-3 text-slate-400 leading-7">
            Browse the cleaning categories we offer, compare the details at a glance, and jump
            straight into booking when you’re ready.
          </p>
        </div>
        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-sm backdrop-blur-xl">
          <p className="text-sm font-medium text-slate-400">Services available</p>
          <p className="text-2xl font-black text-white">{services.length || '08'}</p>
        </div>
      </div>
      {error && (
        <p className="rounded-2xl border border-red-500/30 bg-red-950/40 px-4 py-3 text-center text-red-300">
          {error}
        </p>
      )}

      {!error && loading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((card) => (
            <div key={card} className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900/80 shadow-sm">
              <div className="h-52 animate-pulse bg-slate-800" />
              <div className="space-y-3 p-5">
                <div className="h-4 w-20 animate-pulse rounded-full bg-slate-800" />
                <div className="h-6 w-3/4 animate-pulse rounded bg-slate-800" />
                <div className="h-4 w-full animate-pulse rounded bg-slate-800" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-slate-800" />
                <div className="mt-4 h-11 w-32 animate-pulse rounded-full bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!error && !loading && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div key={service._id} className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/85 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-white/15 hover:shadow-[0_20px_60px_rgba(20,184,166,0.15)]">
              <div className="relative">
                <img
                  src={imageErrors[service._id] ? fallbackImage : service.imageUrl || fallbackImage}
                  alt={service.name}
                  onError={() => setImageErrors((current) => ({ ...current, [service._id]: true }))}
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-xl">
                  {service.category || 'Service'}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-black text-white">{service.name}</h3>
                  <p className="rounded-full border border-accent/30 bg-accent/15 px-3 py-1 text-sm font-extrabold text-accent">
                    ${service.price}
                  </p>
                </div>
                <p className="mt-3 min-h-24 text-slate-400 leading-7">{service.description}</p>
                <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Booking status</p>
                  {recentBookings[service.name] ? (
                    <div className="mt-2 space-y-1 text-sm text-slate-300">
                      <p>
                        <span className="font-semibold text-white">Booked by:</span> {recentBookings[service.name].customerName}
                      </p>
                      <p>
                        <span className="font-semibold text-white">Date:</span> {recentBookings[service.name].date}
                      </p>
                      <p>
                        <span className="font-semibold text-white">Time:</span> {recentBookings[service.name].time}
                      </p>
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-slate-400">No booking recorded yet for this service.</p>
                  )}
                </div>
                <button
                  onClick={() => onBookNow(service.name)}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-extrabold uppercase tracking-[0.16em] text-slate-950 transition hover:bg-teal-300"
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
