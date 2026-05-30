const stats = [
  { label: 'Clients Served', value: '500+' },
  { label: 'Customer Rating', value: '5-Star' },
  { label: 'Experience', value: '10 Years' },
]

function About() {
  return (
    <section className="px-4 py-20 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 rounded-[2rem] border border-slate-200/70 bg-white/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur md:grid-cols-[0.95fr_1.05fr] md:p-8">
        <div className="overflow-hidden rounded-[1.5rem]">
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80"
            alt="SparkleClean team preparing for a cleaning job"
            className="h-full min-h-[24rem] w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">About Us</p>
          <h2 className="mt-3 text-3xl font-black text-primary md:text-4xl">
            Cleaning standards that feel premium, reliable, and easy to book.
          </h2>
          <p className="mt-4 max-w-2xl text-slate-600 leading-8">
            We deliver premium residential and commercial cleaning with trained professionals,
            strict hygiene standards, and detail-focused care. Every visit is designed to feel
            predictable, polished, and reassuring from booking to completion.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
              >
                <p className="text-2xl font-black text-primary">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
