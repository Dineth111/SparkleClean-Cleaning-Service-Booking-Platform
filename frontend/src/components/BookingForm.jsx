import { useEffect, useMemo, useState } from 'react'
import api from '../api/axios'

function BookingForm({ selectedService }) {
  const [services, setServices] = useState([])
  const [form, setForm] = useState({
    serviceName: '',
    date: '',
    time: '',
    customerName: '',
    email: '',
    phone: '',
    address: '',
  })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  useEffect(() => {
    const loadServices = async () => {
      const res = await api.get('/api/services')
      setServices(res.data)
    }
    loadServices()
  }, [])

  useEffect(() => {
    if (selectedService) {
      setForm((prev) => ({ ...prev, serviceName: selectedService }))
    }
  }, [selectedService])

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
      await api.post('/api/bookings', {
        serviceId: selected?._id,
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
    <section id="booking" className="bg-slate-100 py-20">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">
        <h2 className="mb-6 text-3xl font-bold text-primary">Book a Service</h2>
        <form className="grid gap-4" onSubmit={onSubmit}>
          <div>
            <select name="serviceName" value={form.serviceName} onChange={onChange} className="w-full rounded-lg border border-slate-300 p-3">
              <option value="">Select Service</option>
              {services.map((service) => (
                <option key={service._id} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
            {errors.serviceName && <p className="mt-1 text-sm text-red-600">{errors.serviceName}</p>}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <input type="date" min={today} name="date" value={form.date} onChange={onChange} className="w-full rounded-lg border border-slate-300 p-3" />
              {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
            </div>
            <div>
              <input type="time" name="time" value={form.time} onChange={onChange} className="w-full rounded-lg border border-slate-300 p-3" />
              {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
            </div>
          </div>
          <div>
            <input type="text" name="customerName" value={form.customerName} onChange={onChange} placeholder="Full Name" className="w-full rounded-lg border border-slate-300 p-3" />
            {errors.customerName && <p className="mt-1 text-sm text-red-600">{errors.customerName}</p>}
          </div>
          <div>
            <input type="email" name="email" value={form.email} onChange={onChange} placeholder="Email" className="w-full rounded-lg border border-slate-300 p-3" />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
          <div>
            <input type="tel" name="phone" value={form.phone} onChange={onChange} placeholder="Phone" className="w-full rounded-lg border border-slate-300 p-3" />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>
          <div>
            <textarea name="address" value={form.address} onChange={onChange} placeholder="Address" rows="3" className="w-full rounded-lg border border-slate-300 p-3" />
            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
          </div>
          <button className="rounded-lg bg-accent px-6 py-3 font-semibold text-white">Submit Booking</button>
        </form>
        {message && <p className="mt-4 text-sm font-medium text-primary">{message}</p>}
      </div>
    </section>
  )
}

export default BookingForm
