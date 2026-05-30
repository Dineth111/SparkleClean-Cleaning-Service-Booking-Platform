const stats = [
  { label: 'Clients Served', value: '500+' },
  { label: 'Customer Rating', value: '5-Star' },
  { label: 'Experience', value: '10 Years' },
]

function About() {
  return (
    <section
      className="bg-cover bg-center py-20"
      style={{
        backgroundImage:
          "linear-gradient(rgba(30,58,95,0.88), rgba(30,58,95,0.88)), url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 text-white">
        <h2 className="text-3xl font-bold">About Us</h2>
        <p className="mt-4 max-w-3xl text-slate-100">
          We deliver premium residential and commercial cleaning with trained professionals,
          strict hygiene standards, and detail-focused care.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-2xl font-bold text-accent">{stat.value}</p>
              <p className="text-sm text-slate-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
