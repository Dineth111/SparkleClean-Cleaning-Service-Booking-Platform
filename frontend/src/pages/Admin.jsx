import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

const storageKey = 'admin_secret'

function Admin() {
  const envSecret = import.meta.env.VITE_ADMIN_SECRET || 'admin123'
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [secret, setSecret] = useState(localStorage.getItem(storageKey) || '')
  const [bookings, setBookings] = useState([])
  const [services, setServices] = useState([])
  const [activeTab, setActiveTab] = useState('bookings')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleteReason, setDeleteReason] = useState('')
  const [editingService, setEditingService] = useState(null)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [bookingNotes, setBookingNotes] = useState({})

  const isLoggedIn = useMemo(() => secret === envSecret, [secret, envSecret])

  const stats = useMemo(() => {
    const completed = bookings.filter((booking) => booking.status === 'completed').length
    return {
      total: bookings.length,
      pending: bookings.length - completed,
      completed,
    }
  }, [bookings])

  const visibleBookings = useMemo(() => {
    const query = search.trim().toLowerCase()

    return bookings.filter((booking) => {
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter
      const fields = [booking.customerName, booking.serviceName, booking.email, booking.phone, booking.address]
      const matchesSearch =
        !query ||
        fields.filter(Boolean).some((value) => value.toLowerCase().includes(query))

      return matchesStatus && matchesSearch
    })
  }, [bookings, search, statusFilter])

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const res = await api.get('/api/bookings', {
        headers: { 'x-admin-secret': secret },
      })
      setBookings(res.data)
      setError('')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch bookings.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isLoggedIn) return undefined

    let active = true

    const loadData = async () => {
      setLoading(true)
      try {
        const [bookingsRes, servicesRes] = await Promise.all([
          api.get('/api/bookings', {
            headers: { 'x-admin-secret': secret },
          }),
          api.get('/api/services'),
        ])
        
        if (!active) return
        setBookings(bookingsRes.data)
        setServices(servicesRes.data)
        setError('')
      } catch (err) {
        if (!active) return
        setError(err.response?.data?.message || 'Failed to fetch data.')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadData()

    return () => {
      active = false
    }
  }, [isLoggedIn, secret])

  const login = (e) => {
    e.preventDefault()
    if (password === envSecret) {
      localStorage.setItem(storageKey, password)
      setSecret(password)
      setError('')
      setPassword('')
      setShowPassword(false)
      return
    }
    setError('Incorrect admin password.')
  }

  const logout = () => {
    localStorage.removeItem(storageKey)
    setSecret('')
    setBookings([])
    setSearch('')
    setStatusFilter('all')
    setPassword('')
    setShowPassword(false)
    setDeleteTarget(null)
    setDeleteReason('')
  }

  const markCompleted = async (id) => {
    await api.patch(
      `/api/bookings/${id}`,
      { status: 'completed' },
      { headers: { 'x-admin-secret': secret } },
    )
    fetchBookings()
  }

  const deleteBooking = async (id, reason) => {
    await api.delete(`/api/bookings/${id}`, {
      headers: { 'x-admin-secret': secret },
      data: { deleteReason: reason || null },
    })
    fetchBookings()
  }

  const fetchServices = async () => {
    try {
      const res = await api.get('/api/services')
      setServices(res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch services.')
    }
  }

  const addService = async (serviceData) => {
    await api.post('/api/services', serviceData, {
      headers: { 'x-admin-secret': secret },
    })
    fetchServices()
    setShowServiceForm(false)
  }

  const updateService = async (id, serviceData) => {
    await api.put(`/api/services/${id}`, serviceData, {
      headers: { 'x-admin-secret': secret },
    })
    fetchServices()
    setEditingService(null)
  }

  const deleteService = async (id) => {
    await api.delete(`/api/services/${id}`, {
      headers: { 'x-admin-secret': secret },
    })
    fetchServices()
  }

  const saveBookingNote = async (bookingId, note) => {
    try {
      await api.patch(
        `/api/bookings/${bookingId}`,
        { notes: note },
        { headers: { 'x-admin-secret': secret } },
      )
      setBookingNotes((prev) => ({ ...prev, [bookingId]: note }))
    } catch (err) {
      setError('Failed to save note.')
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 text-white md:px-8 md:py-10">
        {/* Background gradient */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(30,58,95,0.2),transparent_50%)]" />
        
        <div className="relative mx-auto max-w-6xl">
          {/* Logo & Back link */}
          <div className="mb-8 flex items-center justify-between">
            <div className="text-xl font-black">
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-accent shadow-lg shadow-accent/50" aria-hidden="true"></span>
                <span>SparkleClean</span>
              </span>
            </div>
            <Link to="/" className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-slate-300 backdrop-blur-xl transition hover:border-accent hover:text-accent">
              <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>

          {/* Login Card */}
          <div className="mx-auto max-w-md overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/80 shadow-[0_40px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
            {/* Header with image */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary to-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=400&fit=crop&q=80"
                alt="Professional cleaning service"
                className="h-full w-full object-cover opacity-40 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-accent backdrop-blur-xl">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure Access
                </div>
                <h1 className="mt-3 text-3xl font-black text-white">Admin Portal</h1>
              </div>
            </div>

            {/* Form */}
            <div className="p-8">
              <p className="text-sm leading-6 text-slate-400">
                Enter your admin credentials to access the control panel.
              </p>
              
              <form className="mt-6 space-y-4" onSubmit={login}>
                <div className="relative">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter admin password"
                      className="w-full rounded-2xl border border-white/10 bg-slate-800/80 p-4 pr-14 text-white outline-none transition placeholder:text-slate-500 focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-slate-400 transition hover:text-accent"
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-950/40 px-4 py-3">
                    <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-red-300">{error}</p>
                  </div>
                )}

                <button 
                  type="submit"
                  className="group w-full rounded-2xl bg-gradient-to-r from-accent to-teal-400 px-6 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-slate-950 shadow-lg shadow-accent/25 transition-all hover:shadow-xl hover:shadow-accent/40"
                >
                  <span className="flex items-center justify-center gap-2">
                    Access Dashboard
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-white md:px-8 md:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-2xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="text-xl font-black">
                <span className="inline-flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-accent shadow-lg shadow-accent/50" aria-hidden="true"></span>
                  <span>SparkleClean</span>
                </span>
              </div>
              <div className="hidden h-8 w-px bg-white/10 lg:block" />
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">Operations Center</p>
                <h1 className="text-2xl font-black text-white">Admin Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/" className="rounded-full border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-300 transition hover:border-accent hover:text-accent">
                View Site
              </Link>
              <button onClick={logout} className="rounded-full border border-red-500/30 bg-red-600/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-red-300 transition hover:bg-red-600/20">
                Logout
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex gap-2">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`rounded-full px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] transition ${
                activeTab === 'bookings'
                  ? 'bg-accent text-slate-950 shadow-lg shadow-accent/25'
                  : 'border border-white/10 bg-white/5 text-slate-400 hover:border-accent hover:text-accent'
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Bookings
              </span>
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`rounded-full px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] transition ${
                activeTab === 'services'
                  ? 'bg-accent text-slate-950 shadow-lg shadow-accent/25'
                  : 'border border-white/10 bg-white/5 text-slate-400 hover:border-accent hover:text-accent'
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Services
              </span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        {activeTab === 'bookings' && (
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Total Bookings', value: bookings.filter(b => !b.deleteReason).length, icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', tone: 'text-white' },
              { label: 'Pending', value: stats.pending, icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', tone: 'text-amber-300' },
              { label: 'Completed', value: stats.completed, icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', tone: 'text-accent' },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-900/90 p-5 transition hover:border-white/15">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-white/5 p-3">
                    <svg className={`h-6 w-6 ${item.tone}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">{item.label}</p>
                    <p className={`mt-1 text-2xl font-black ${item.tone}`}>{item.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Services Tab Content */}
        {activeTab === 'services' && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white">Manage Services</h2>
                <p className="mt-1 text-sm text-slate-400">Add, edit, or remove cleaning services</p>
              </div>
              <button
                onClick={() => {
                  setEditingService(null)
                  setShowServiceForm(true)
                }}
                className="rounded-full bg-accent px-6 py-3 text-sm font-extrabold uppercase tracking-[0.16em] text-slate-950 shadow-lg shadow-accent/25 transition hover:bg-teal-300"
              >
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Service
                </span>
              </button>
            </div>

            {/* Service Form Modal */}
            {showServiceForm && (
              <ServiceFormModal
                service={editingService}
                onClose={() => {
                  setShowServiceForm(false)
                  setEditingService(null)
                }}
                onSubmit={editingService ? updateService : addService}
                secret={secret}
              />
            )}

            {/* Services Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div key={service._id} className="group rounded-2xl border border-white/10 bg-slate-900/90 overflow-hidden shadow-sm transition hover:-translate-y-1 hover:border-white/15">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.imageUrl || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop&q=80'}
                      alt={service.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur-xl">
                        {service.category || 'General'}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-black text-white">{service.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400 line-clamp-2">{service.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-2xl font-black text-accent">${service.price}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingService(service)
                            setShowServiceForm(true)
                          }}
                          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-300 transition hover:border-accent hover:text-accent"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete "${service.name}"? This cannot be undone.`)) {
                              deleteService(service._id)
                            }
                          }}
                          className="rounded-full border border-red-500/30 bg-red-600/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-red-300 transition hover:bg-red-600/20"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {services.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-12 text-center">
                <svg className="mx-auto h-16 w-16 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <p className="mt-4 text-lg font-black text-white">No services yet</p>
                <p className="mt-2 text-sm text-slate-400">Click "Add Service" to create your first cleaning service</p>
              </div>
            )}
          </div>
        )}

        {/* Bookings Tab Content */}
        {activeTab === 'bookings' && (
          <>
            {/* Filters */}
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-2">
                {['all', 'pending', 'completed'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setStatusFilter(option)}
                    className={`rounded-full px-4 py-2 text-sm font-bold capitalize transition ${statusFilter === option ? 'bg-accent text-slate-950' : 'border border-white/10 bg-white/5 text-slate-400 hover:border-accent hover:text-accent'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search customer, service, email, or phone"
                className="w-full rounded-full border border-white/10 bg-slate-800 px-5 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-accent md:max-w-md"
              />
            </div>

            {loading && (
              <div className="grid gap-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-6">
                    <div className="h-4 w-28 animate-pulse rounded-full bg-slate-800" />
                    <div className="mt-4 h-8 w-2/3 animate-pulse rounded bg-slate-800" />
                    <div className="mt-6 grid gap-3 md:grid-cols-2">
                      <div className="h-4 animate-pulse rounded bg-slate-800" />
                      <div className="h-4 animate-pulse rounded bg-slate-800" />
                      <div className="h-4 animate-pulse rounded bg-slate-800 md:col-span-2" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {error && <p className="mb-4 rounded-2xl border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm text-red-300">{error}</p>}

        {!loading && (
          <div className="mt-6 grid gap-4">
            {visibleBookings.map((booking) => (
              <div
                key={booking._id}
                className="rounded-[1.75rem] border border-white/10 bg-slate-900/90 p-6 shadow-sm transition hover:-translate-y-1 hover:border-white/15"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">{booking.serviceName}</p>
                    <h2 className="mt-2 text-2xl font-black text-white">{booking.customerName}</h2>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${booking.status === 'completed' ? 'bg-teal-500/15 text-teal-300' : 'bg-amber-500/15 text-amber-300'}`}>
                      {booking.status}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                      {booking.date} • {booking.time}
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  <p className="text-slate-400"><span className="font-semibold text-white">Email:</span> {booking.email}</p>
                  <p className="text-slate-400"><span className="font-semibold text-white">Phone:</span> {booking.phone}</p>
                  <p className="md:col-span-2 text-slate-400"><span className="font-semibold text-white">Address:</span> {booking.address}</p>
                </div>

                {/* Booking Notes Section */}
                <div className="mt-6">
                  <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Booking Notes
                  </label>
                  <textarea
                    value={bookingNotes[booking._id] !== undefined ? bookingNotes[booking._id] : (booking.notes || '')}
                    onChange={(e) => setBookingNotes((prev) => ({ ...prev, [booking._id]: e.target.value }))}
                    onBlur={() => {
                      const note = bookingNotes[booking._id] || ''
                      if (note !== (booking.notes || '')) {
                        saveBookingNote(booking._id, note)
                      }
                    }}
                    placeholder="Add notes about this booking..."
                    rows="3"
                    className="w-full rounded-2xl border border-white/10 bg-slate-800/60 p-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 resize-none"
                  />
                </div>

                {booking.deleteReason && (
                  <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-950/40 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400 mb-2">Deletion Reason</p>
                    <p className="text-sm text-red-200 leading-6">{booking.deleteReason}</p>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                  {booking.status !== 'completed' && booking.status !== 'deleted' && (
                    <button
                      onClick={() => markCompleted(booking._id)}
                      className="rounded-full bg-accent px-5 py-3 text-sm font-extrabold uppercase tracking-[0.16em] text-slate-950 transition hover:bg-teal-300"
                    >
                      Mark as Completed
                    </button>
                  )}
                  {booking.status !== 'deleted' && (
                    <button
                      onClick={() => setDeleteTarget(booking)}
                      className="rounded-full border border-red-500/30 bg-red-600/80 px-5 py-3 text-sm font-extrabold uppercase tracking-[0.16em] text-white transition hover:bg-red-500"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}

            {visibleBookings.length === 0 && (
              <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-8 text-center">
                <p className="text-lg font-black text-white">No bookings match your filters.</p>
                <p className="mt-2 text-sm text-slate-400">Try clearing the search field or switching the status filter.</p>
              </div>
            )}
          </div>
        )}

        {deleteTarget && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/75 px-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-900 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-red-300">Confirm delete</p>
              <h3 className="mt-3 text-2xl font-black text-white">Delete this booking?</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {deleteTarget.customerName} for {deleteTarget.serviceName} will be permanently removed from the dashboard.
              </p>
              
              <div className="mt-5">
                <label className="block text-sm font-semibold text-white mb-2">
                  Reason for deletion <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                  placeholder="Please provide a reason for deleting this booking..."
                  rows="3"
                  className="w-full rounded-2xl border border-white/10 bg-slate-800 p-4 text-white outline-none transition placeholder:text-slate-500 focus:border-red-500 resize-none"
                />
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => {
                    setDeleteTarget(null)
                    setDeleteReason('')
                  }}
                  className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-slate-200 transition hover:border-white/20 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    if (!deleteReason.trim()) {
                      setError('Please provide a reason for deletion.')
                      return
                    }
                    await deleteBooking(deleteTarget._id, deleteReason.trim())
                    setDeleteTarget(null)
                    setDeleteReason('')
                  }}
                  disabled={!deleteReason.trim()}
                  className={`rounded-full px-5 py-3 text-sm font-extrabold uppercase tracking-[0.16em] text-white transition ${
                    deleteReason.trim()
                      ? 'bg-red-600 hover:bg-red-500'
                      : 'bg-red-600/40 cursor-not-allowed'
                  }`}
                >
                  Delete Booking
                </button>
              </div>
            </div>
          </div>
        )}
          </>
        )}
      </div>
    </div>
  )
}

function ServiceFormModal({ service, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: service?.name || '',
    description: service?.description || '',
    price: service?.price || '',
    imageUrl: service?.imageUrl || '',
    category: service?.category || '',
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(service?.imageUrl || '')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file')
        return
      }
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB')
        return
      }
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
      setError('')
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview('')
    setFormData({ ...formData, imageUrl: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    // Trim and validate
    const name = formData.name.trim()
    const description = formData.description.trim()
    const price = Number(formData.price)
    
    if (!name) {
      setError('Service name is required')
      return
    }
    
    if (!description) {
      setError('Description is required')
      return
    }
    
    if (!formData.price || isNaN(price) || price <= 0) {
      setError('Please enter a valid price greater than 0')
      return
    }

    setSubmitting(true)
    
    try {
      // Create FormData object for file upload
      const data = new FormData()
      data.append('name', name)
      data.append('description', description)
      data.append('price', price)
      data.append('category', formData.category.trim())
      
      // Append image file if selected
      if (imageFile) {
        data.append('image', imageFile)
      } else if (formData.imageUrl.trim()) {
        data.append('imageUrl', formData.imageUrl.trim())
      }

      await onSubmit(service?._id || null, data)
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save service. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] border border-white/10 bg-slate-900 p-8 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
        <div className="mb-6">
          <h3 className="text-2xl font-black text-white">{service ? 'Edit Service' : 'Add New Service'}</h3>
          <p className="mt-2 text-sm text-slate-400">
            {service ? 'Update the service details below' : 'Fill in the details to create a new cleaning service'}
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              Service Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Deep Clean"
              required
              className="w-full rounded-2xl border border-white/10 bg-slate-800/80 p-4 text-white outline-none transition placeholder:text-slate-500 focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the service..."
              rows="3"
              required
              className="w-full rounded-2xl border border-white/10 bg-slate-800/80 p-4 text-white outline-none transition placeholder:text-slate-500 focus:border-accent focus:ring-2 focus:ring-accent/20 resize-none"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Price ($) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0"
                min="0"
                step="0.01"
                required
                className="w-full rounded-2xl border border-white/10 bg-slate-800/80 p-4 text-white outline-none transition placeholder:text-slate-500 focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Home, Office"
                className="w-full rounded-2xl border border-white/10 bg-slate-800/80 p-4 text-white outline-none transition placeholder:text-slate-500 focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              Service Image
            </label>
            <div className="space-y-3">
              {/* Image Preview */}
              {imagePreview && (
                <div className="relative overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src={imagePreview}
                    alt="Service preview"
                    className="h-48 w-full object-cover"
                    onError={() => setImagePreview('')}
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute right-2 top-2 rounded-full bg-slate-900/80 p-2 text-white backdrop-blur-sm transition hover:bg-red-600"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
              
              {/* File Upload Area */}
              <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/20 bg-slate-800/40 p-6 text-center transition hover:border-accent hover:bg-slate-800/60">
                <div className="flex flex-col items-center gap-3">
                  <div className="rounded-full bg-white/5 p-3 transition group-hover:bg-accent/10">
                    <svg className="h-6 w-6 text-slate-400 transition group-hover:text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {imageFile ? imageFile.name : 'Upload Image'}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      PNG, JPG, GIF, WEBP up to 5MB
                    </p>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {/* OR divider */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">or</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Image URL Input */}
              <div>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => {
                    setFormData({ ...formData, imageUrl: e.target.value })
                    if (!imageFile) {
                      setImagePreview(e.target.value)
                    }
                  }}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full rounded-2xl border border-white/10 bg-slate-800/80 p-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
                <p className="mt-2 text-xs text-slate-500">
                  💡 Paste an image URL or upload a file above
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 rounded-full border border-white/10 px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-slate-200 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 rounded-full bg-gradient-to-r from-accent to-teal-400 px-6 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-slate-950 shadow-lg shadow-accent/25 transition hover:shadow-xl hover:shadow-accent/40 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                service ? 'Update Service' : 'Create Service'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Admin
