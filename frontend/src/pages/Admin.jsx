import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

const storageKey = 'admin_secret'

function Admin() {
  const envSecret = import.meta.env.VITE_ADMIN_SECRET || 'admin123'
  const [password, setPassword] = useState('')
  const [secret, setSecret] = useState(localStorage.getItem(storageKey) || '')
  const [bookings, setBookings] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isLoggedIn = useMemo(() => secret === envSecret, [secret, envSecret])

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
      <div className="min-h-screen bg-slate-100 px-4 py-16">
        <div className="mx-auto max-w-md rounded-xl bg-white p-8 shadow">
          <Link to="/" className="mb-6 inline-flex text-sm font-semibold text-primary hover:text-accent">
            ← Back to Home
          </Link>
          <h1 className="mb-4 text-2xl font-bold text-primary">Admin Login</h1>
          <form className="space-y-4" onSubmit={login}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full rounded-lg border border-slate-300 p-3 focus:border-accent focus:outline-none"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-white">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm font-semibold text-primary hover:text-accent">
              ← Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
          </div>
          <button onClick={logout} className="rounded-lg bg-slate-800 px-4 py-2 font-semibold text-white">
            Logout
          </button>
        </div>

        {loading && <p>Loading bookings...</p>}
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="rounded-xl bg-white p-5 shadow-sm">
              <div className="grid gap-2 md:grid-cols-2">
                <p><strong>Name:</strong> {booking.customerName}</p>
                <p><strong>Email:</strong> {booking.email}</p>
                <p><strong>Phone:</strong> {booking.phone}</p>
                <p><strong>Service:</strong> {booking.serviceName}</p>
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Time:</strong> {booking.time}</p>
                <p className="md:col-span-2"><strong>Address:</strong> {booking.address}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${booking.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {booking.status}
                  </span>
                </p>
              </div>
              <div className="mt-4 flex gap-3">
                {booking.status !== 'completed' && (
                  <button
                    onClick={() => markCompleted(booking._id)}
                    className="rounded-lg bg-accent px-4 py-2 font-semibold text-white"
                  >
                    Mark as Completed
                  </button>
                )}
                <button
                  onClick={() => deleteBooking(booking._id)}
                  className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {!loading && bookings.length === 0 && (
            <p className="rounded-xl bg-white p-5 text-slate-600 shadow-sm">No bookings yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Admin
