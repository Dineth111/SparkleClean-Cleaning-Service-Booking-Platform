import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react'
import api from '../api/axios'

function BookingForm({ selectedService }) {
  const [services, setServices] = useState([])
  const [form, setForm] = useState({
    serviceName: selectedService || '',
    date: '',
    time: '',
    customerName: '',
    email: '',
    phone: '',
    address: '',
  })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true)
        const res = await api.get('/api/services')
        setServices(res.data)
      } finally {
        setLoading(false)
      }
    }
    loadServices()
  }, [])

  const today = useMemo(() => new Date().toISOString().split('T')[0], [])

  const validate = () => {
    const nextErrors = {}
    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim()) nextErrors[key] = 'This field is required'
    })
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    try {
      const selected = services.find((item) => item.name === form.serviceName)
      if (!selected) {
        setErrors((prev) => ({
          ...prev,
          serviceName: 'Please wait for services to load and select a valid service.',
        }))
        setMessage('')
        return
      }
      await api.post('/api/bookings', {
        serviceId: selected._id,
        ...form,
      })
      setMessage('Booking submitted successfully!')
      setErrors({})
      setForm({
        serviceName: '',
        date: '',
        time: '',
        customerName: '',
        email: '',
        phone: '',
        address: '',
      })
    } catch {
      setMessage('Failed to submit booking. Please try again.')
    }
  }

  return (
    <section id="booking" className="px-4 py-20 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] border border-slate-200 bg-white/85 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur md:grid-cols-[0.9fr_1.1fr] md:p-8">
        <div className="rounded-[1.75rem] bg-primary p-8 text-white">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">Online Booking</p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">Reserve a cleaning slot in minutes.</h2>
          <p className="mt-4 leading-8 text-slate-200">
            Choose the service that matches your space, pick a date and time, and send the booking
            straight to the dashboard. You’ll get a clear, structured record every time.
          </p>
          <div className="mt-8 grid gap-3">
            {[
              'Dynamic service selection from the database',
              'Required-field validation before submission',
              'Instant admin visibility after booking',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-slate-100 backdrop-blur">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-6">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">Book a Service</p>
            <h3 className="mt-2 text-3xl font-black text-primary">Pick a service and send your request.</h3>
          </div>
          <form className="grid gap-4" onSubmit={onSubmit}>
            <div>
              <select
                name="serviceName"
                value={form.serviceName}
                onChange={onChange}
                disabled={loading}
                className="w-full rounded-2xl border border-slate-300 bg-white p-3.5 text-slate-900 outline-none transition focus:border-accent disabled:cursor-not-allowed disabled:bg-slate-100"
              >
                <option value="">Select Service</option>
                {services.map((service) => (
                  <option key={service._id} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
              {loading && <p className="mt-1 text-sm text-slate-500">Loading services...</p>}
              {errors.serviceName && <p className="mt-1 text-sm text-red-600">{errors.serviceName}</p>}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <input
                  type="date"
                  min={today}
                  name="date"
                  value={form.date}
                  onChange={onChange}
                  className="w-full rounded-2xl border border-slate-300 bg-white p-3.5 outline-none transition focus:border-accent"
                />
                {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
              </div>
              <div>
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={onChange}
                  className="w-full rounded-2xl border border-slate-300 bg-white p-3.5 outline-none transition focus:border-accent"
                />
                {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
              </div>
            </div>
            <div>
              <input
                type="text"
                name="customerName"
                value={form.customerName}
                onChange={onChange}
                placeholder="Full Name"
                className="w-full rounded-2xl border border-slate-300 bg-white p-3.5 outline-none transition focus:border-accent"
              />
              {errors.customerName && <p className="mt-1 text-sm text-red-600">{errors.customerName}</p>}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="Email"
                  className="w-full rounded-2xl border border-slate-300 bg-white p-3.5 outline-none transition focus:border-accent"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  placeholder="Phone"
                  className="w-full rounded-2xl border border-slate-300 bg-white p-3.5 outline-none transition focus:border-accent"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>
            </div>
            <div>
              <textarea
                name="address"
                value={form.address}
                onChange={onChange}
                placeholder="Address"
                rows="4"
                className="w-full rounded-2xl border border-slate-300 bg-white p-3.5 outline-none transition focus:border-accent"
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>
            <button
              className="rounded-full bg-accent px-6 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading}
            >
              Submit Booking
            </button>
          </form>
          {message && (
            <p className="mt-4 rounded-2xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-semibold text-teal-800">
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default BookingForm

BookingForm.propTypes = {
  selectedService: PropTypes.string,
}
