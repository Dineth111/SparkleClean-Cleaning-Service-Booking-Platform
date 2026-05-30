import { useState } from 'react'

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
    <header className="sticky top-0 z-50 bg-white/95 shadow backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <button onClick={() => jump('home')} className="text-2xl font-bold text-primary">
          SparkleClean
        </button>
        <button
          onClick={() => setOpen(!open)}
          className="rounded border px-3 py-1 md:hidden"
        >
          Menu
        </button>
        <ul className="hidden gap-6 font-medium text-slate-700 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <button onClick={() => jump(link.id)} className="hover:text-accent">
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {open && (
        <div className="border-t bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => jump(link.id)}
                className="rounded px-2 py-2 text-left hover:bg-slate-100"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
