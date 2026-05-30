function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-8 md:pt-14"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(15,23,42,0.92), rgba(30,58,95,0.84)), url('https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-10 px-4 py-16 text-white md:grid-cols-[1.2fr_0.8fr] md:py-20">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 backdrop-blur">
            <div className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            <p>Trusted cleaning for homes and workplaces</p>
          </div>
          <h1 className="max-w-2xl text-5xl font-black leading-tight md:text-7xl">SparkleClean</h1>
          <p className="mt-4 block max-w-2xl bg-gradient-to-r from-accent to-cyan-200 bg-clip-text text-3xl font-black leading-tight text-transparent md:text-5xl">
            Spotless Homes, Stress-Free Life
          </p>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200 md:text-xl">
            Book dependable home and office cleaning in minutes. Choose a service, select a time,
            and let our experienced team handle the rest with care and precision.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full bg-accent px-7 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-slate-950 transition hover:-translate-y-0.5 hover:bg-teal-300"
            >
              Book Now
            </button>
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full border border-white/20 px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-slate-950"
            >
              Explore Services
            </button>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { label: 'On-demand booking', value: '24/7' },
              { label: 'Happy clients', value: '500+' },
              { label: 'Expert team', value: '10 yrs' },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/12 bg-white/8 p-4 backdrop-blur">
                <p className="text-2xl font-extrabold text-accent">{item.value}</p>
                <p className="mt-1 text-sm text-slate-200">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[2rem] bg-accent/15 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-slate-950/40 p-4 shadow-2xl backdrop-blur-xl">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80"
              alt="Professional cleaner at work"
              className="h-[26rem] w-full rounded-[1.5rem] object-cover"
            />
            <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/15 bg-slate-950/70 p-5 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.2em] text-accent">Next available slot</p>
              <p className="mt-2 text-xl font-bold text-white">Today, 5:00 PM</p>
              <p className="mt-1 text-sm text-slate-300">Quick confirmation after booking submission.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
