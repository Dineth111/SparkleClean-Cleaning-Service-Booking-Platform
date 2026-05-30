import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

const storageKey = 'admin_secret'

function Admin() {
  const envSecret = import.meta.env.VITE_ADMIN_SECRET || 'admin123'
  const [password, setPassword] = useState('')
  const [secret, setSecret] = useState(localStorage.getItem(storageKey) || '')
  const [bookings, setBookings] = useState([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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

    const loadBookings = async () => {
      setLoading(true)
      try {
        const res = await api.get('/api/bookings', {
          headers: { 'x-admin-secret': secret },
        })
        if (!active) return
        setBookings(res.data)
        setError('')
      } catch (err) {
        if (!active) return
        setError(err.response?.data?.message || 'Failed to fetch bookings.')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadBookings()

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
  }

  const markCompleted = async (id) => {
    await api.patch(
      `/api/bookings/${id}`,
      { status: 'completed' },
      { headers: { 'x-admin-secret': secret } },
    )
    fetchBookings()
  }

  const deleteBooking = async (id) => {
    const confirmed = globalThis.confirm('Are you sure you want to delete this booking?')
    if (!confirmed) return
    await api.delete(`/api/bookings/${id}`, {
      headers: { 'x-admin-secret': secret },
    })
    fetchBookings()
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen px-4 py-8 md:px-8 md:py-10">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-primary p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
            <Link to="/" className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-white transition hover:bg-white hover:text-primary">
              ← Back to Home
            </Link>
            <div className="mt-10 max-w-lg">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">Admin Console</p>
              <h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl">Manage every booking in one calm workspace.</h1>
              <p className="mt-5 text-base leading-8 text-slate-200">
                Review new requests, mark jobs completed, and keep the schedule moving without digging through email or chat threads.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { value: 'Live', label: 'booking updates' },
                { value: '1 tap', label: 'complete action' },
                { value: 'Secure', label: 'protected route' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-2xl font-black text-accent">{item.value}</p>
                  <p className="mt-1 text-sm text-slate-200">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">Login</p>
            <h2 className="mt-3 text-3xl font-black text-primary">Enter the admin secret</h2>
            <p className="mb-6 mt-3 text-sm leading-6 text-slate-500">Use the shared admin password to unlock the dashboard.</p>
            <form className="space-y-4" onSubmit={login}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full rounded-2xl border border-slate-300 bg-white p-3.5 outline-none transition focus:border-accent"
              />
              {error && <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
              <button className="w-full rounded-full bg-primary px-4 py-3.5 text-sm font-extrabold uppercase tracking-[0.16em] text-white transition hover:bg-slate-950">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link to="/" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-primary transition hover:border-accent hover:text-accent">
                ← Back to Home
              </Link>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">Operations</p>
                <h1 className="mt-2 text-3xl font-black text-primary md:text-4xl">Admin Dashboard</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Monitor incoming bookings, keep the queue tidy, and update job status with a couple of clicks.</p>
              </div>
            </div>
            <button onClick={logout} className="rounded-full bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700">
              Logout
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Total bookings', value: stats.total },
              { label: 'Pending', value: stats.pending },
              { label: 'Completed', value: stats.completed },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">{item.label}</p>
                <p className="mt-2 text-3xl font-black text-primary">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-2">
              {['all', 'pending', 'completed'].map((option) => (
                <button
                  key={option}
                  onClick={() => setStatusFilter(option)}
                  className={`rounded-full px-4 py-2 text-sm font-bold capitalize transition ${statusFilter === option ? 'bg-primary text-white' : 'border border-slate-200 bg-white text-slate-600 hover:border-accent hover:text-accent'}`}
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
              className="w-full rounded-full border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent md:max-w-md"
            />
          </div>
        </div>

        {loading && <p className="mb-4 mt-6 text-sm font-medium text-slate-600">Loading bookings...</p>}
        {error && <p className="mb-4 mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <div className="mt-6 grid gap-4">
          {visibleBookings.map((booking) => (
            <div key={booking._id} className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">{booking.serviceName}</p>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${booking.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {booking.status}
                    </span>
                  </div>
                  <h2 className="mt-2 text-2xl font-black text-primary">{booking.customerName}</h2>
                </div>
                <p className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {booking.date} • {booking.time}
                </p>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                <p><strong>Email:</strong> {booking.email}</p>
                <p><strong>Phone:</strong> {booking.phone}</p>
                <p className="md:col-span-2"><strong>Address:</strong> {booking.address}</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {booking.status !== 'completed' && (
                  <button
                    onClick={() => markCompleted(booking._id)}
                    className="rounded-full bg-accent px-4 py-2.5 text-sm font-bold uppercase tracking-[0.14em] text-slate-950 transition hover:bg-teal-300"
                  >
                    Mark as Completed
                  </button>
                )}
                <button
                  onClick={() => deleteBooking(booking._id)}
                  className="rounded-full bg-red-600 px-4 py-2.5 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {!loading && visibleBookings.length === 0 && (
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="text-lg font-black text-primary">No bookings match your filters.</p>
              <p className="mt-2 text-sm text-slate-500">Try clearing the search field or switching the status filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Admin
