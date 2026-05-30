import { useState } from 'react'
import { Link } from 'react-router-dom'

const links = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'Booking', id: 'booking' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Contact', id: 'contact' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const jump = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <button onClick={() => jump('home')} className="text-xl font-black tracking-tight text-white md:text-2xl">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_18px_rgba(20,184,166,0.9)]" aria-hidden="true"></span>
            <span>SparkleClean</span>
          </span>
        </button>
        <button
          onClick={() => setOpen(!open)}
          className="rounded-full border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-100 md:hidden"
          aria-expanded={open}
        >
          Menu
        </button>
        <ul className="hidden items-center gap-6 text-xs font-bold uppercase tracking-[0.22em] text-slate-300 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <button onClick={() => jump(link.id)} className="transition hover:text-white">
                {link.label}
              </button>
            </li>
          ))}
          <li>
            <Link
              to="/admin"
              className="rounded-full border border-accent px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-accent transition hover:bg-accent hover:text-slate-950"
            >
              Admin
            </Link>
          </li>
        </ul>
      </nav>
      <div className={`overflow-hidden border-t border-white/10 bg-slate-950/95 transition-all duration-300 md:hidden ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 text-sm text-slate-200">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => jump(link.id)}
              className="rounded-2xl border border-white/8 px-4 py-3 text-left uppercase tracking-[0.18em] text-slate-200 transition hover:border-accent/40 hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </button>
          ))}
          <Link
            to="/admin"
            onClick={() => setOpen(false)}
            className="rounded-full border border-accent px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.22em] text-accent transition hover:bg-accent hover:text-slate-950"
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
