const stats = [
  { label: 'Clients Served', value: '500+' },
  { label: 'Customer Rating', value: '5-Star' },
  { label: 'Experience', value: '10 Years' },
]

function About() {
  return (
    <section className="px-4 py-20 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 rounded-[2.2rem] border border-white/10 bg-slate-900/65 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:grid-cols-[0.95fr_1.05fr] md:p-8 reveal">
        <div className="overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_0_0_1px_rgba(20,184,166,0.08),0_24px_60px_rgba(20,184,166,0.08)]">
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80"
            alt="SparkleClean team preparing for a cleaning job"
            className="h-full min-h-[24rem] w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">About Us</p>
          <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">
            Cleaning standards that feel premium, reliable, and easy to book.
          </h2>
          <p className="mt-4 max-w-2xl text-slate-400 leading-8">
            We deliver premium residential and commercial cleaning with trained professionals,
            strict hygiene standards, and detail-focused care. Every visit is designed to feel
            predictable, polished, and reassuring from booking to completion.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-slate-800/60 p-5 shadow-sm transition hover:-translate-y-1 hover:border-white/15"
              >
                <p className="text-2xl font-black text-accent">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
