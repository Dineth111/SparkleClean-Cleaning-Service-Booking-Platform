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
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

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
    await api.delete(`/api/bookings/${id}`, {
      headers: { 'x-admin-secret': secret },
    })
    fetchBookings()
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-8 text-white md:px-8 md:py-10">
        <div className="mx-auto grid max-w-4xl overflow-hidden rounded-[2.25rem] border border-white/10 bg-slate-900/80 shadow-[0_30px_90px_rgba(0,0,0,0.45)] lg:grid-cols-2">
          <div className="relative bg-gradient-to-br from-primary via-slate-900 to-slate-950 p-10 text-white">
            <div className="flex items-center justify-between text-sm">
              <div className="text-lg font-black">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true"></span>
                  <span>SparkleClean</span>
                </span>
              </div>
              <Link to="/" className="text-xs font-bold uppercase tracking-[0.24em] text-slate-300 transition hover:text-white">
                Back to Home
              </Link>
            </div>
            <div className="mt-16 max-w-md lg:mt-28">
              <p className="text-sm font-bold uppercase tracking-[0.32em] text-accent">Admin Console</p>
              <h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl">Manage every booking from one premium control room.</h1>
              <p className="mt-5 text-base leading-8 text-slate-200">
                Review requests, keep the queue tidy, and update job status without losing the calm, polished feel of the brand.
              </p>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                'Live updates',
                'Fast actions',
                'Protected access',
              ].map((item) => (
                <div key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-200 backdrop-blur-xl">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-10">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">Admin Login</p>
            <h2 className="mt-3 text-3xl font-black text-white">Enter the secret to continue.</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">Use the shared admin password to access the booking dashboard.</p>
            <form className="mt-8 space-y-4" onSubmit={login}>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full rounded-2xl border border-white/10 bg-slate-800 p-4 pr-16 text-white outline-none transition placeholder:text-slate-500 focus:border-accent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-300 transition hover:border-accent hover:text-accent"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {error && <p className="rounded-2xl border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm text-red-300">{error}</p>}
              <button className="w-full rounded-full bg-accent px-4 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-slate-950 transition hover:bg-teal-300">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-white md:px-8 md:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2.25rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <div className="text-xl font-black">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true"></span>
                  <span>SparkleClean</span>
                </span>
              </div>
              <Link to="/" className="rounded-full border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-300 transition hover:border-accent hover:text-accent">
                Back to Home
              </Link>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">Operations</p>
                <h1 className="mt-1 text-3xl font-black text-white md:text-4xl">Admin Dashboard</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Monitor incoming bookings, keep the queue tidy, and update job status with a couple of clicks.</p>
              </div>
            </div>
            <button onClick={logout} className="rounded-full border border-white/10 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.22em] text-slate-200 transition hover:border-accent hover:text-accent">
              Logout
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Total bookings', value: stats.total, tone: 'text-white' },
              { label: 'Pending', value: stats.pending, tone: 'text-amber-300' },
              { label: 'Completed', value: stats.completed, tone: 'text-accent' },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-900/90 p-5 transition hover:border-white/15">
                <p className="text-sm font-medium text-slate-500">{item.label}</p>
                <p className={`mt-2 text-3xl font-black ${item.tone}`}>{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
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
        </div>

        {loading && (
          <div className="mt-6 grid gap-4">
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

        {error && <p className="mb-4 mt-6 rounded-2xl border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm text-red-300">{error}</p>}

        {!loading && (
          <div className="mt-6 grid gap-4">
            {visibleBookings.map((booking) => (
              <div key={booking._id} className="rounded-[1.75rem] border border-white/10 bg-slate-900/90 p-6 shadow-sm transition hover:-translate-y-1 hover:border-white/15">
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

                <div className="mt-6 flex flex-wrap gap-3">
                  {booking.status !== 'completed' && (
                    <button
                      onClick={() => markCompleted(booking._id)}
                      className="rounded-full bg-accent px-5 py-3 text-sm font-extrabold uppercase tracking-[0.16em] text-slate-950 transition hover:bg-teal-300"
                    >
                      Mark as Completed
                    </button>
                  )}
                  <button
                    onClick={() => setDeleteTarget(booking)}
                    className="rounded-full border border-red-500/30 bg-red-600/80 px-5 py-3 text-sm font-extrabold uppercase tracking-[0.16em] text-white transition hover:bg-red-500"
                  >
                    Delete
                  </button>
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
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-slate-200 transition hover:border-white/20 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    await deleteBooking(deleteTarget._id)
                    setDeleteTarget(null)
                  }}
                  className="rounded-full bg-red-600 px-5 py-3 text-sm font-extrabold uppercase tracking-[0.16em] text-white transition hover:bg-red-500"
                >
                  Delete Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin
