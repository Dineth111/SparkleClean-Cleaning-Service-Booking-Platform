function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#0a0f1e] pt-10 text-slate-100 md:pt-14"
      style={{
        backgroundImage:
          'radial-gradient(circle at top left, rgba(20,184,166,0.14), transparent 24%), radial-gradient(circle at top right, rgba(30,58,95,0.18), transparent 28%), linear-gradient(180deg, rgba(10,15,30,0.98), rgba(10,15,30,0.94))',
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.08),transparent_30%)]" />
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-[1.12fr_0.88fr] md:px-6 md:py-24">
        <div className="relative max-w-3xl reveal">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-slate-200 backdrop-blur-xl">
            <div className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            <p>Trusted cleaning for homes and workplaces</p>
          </div>
          <h1 className="max-w-2xl text-5xl font-black leading-none text-white md:text-7xl lg:text-8xl">
            SparkleClean
          </h1>
          <p className="mt-5 max-w-2xl bg-gradient-to-r from-white via-slate-200 to-accent bg-clip-text text-3xl font-black leading-tight text-transparent md:text-5xl lg:text-6xl">
            Spotless homes. Effortless booking. Premium service.
          </p>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300 md:text-xl">
            Book dependable home and office cleaning in minutes. Choose a service, select a time,
            and let our experienced team handle the rest with care and precision.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full bg-accent px-7 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-slate-950 shadow-[0_0_0_1px_rgba(20,184,166,0.25),0_18px_48px_rgba(20,184,166,0.24)] transition hover:-translate-y-0.5 hover:bg-teal-300 hover:shadow-[0_0_0_1px_rgba(20,184,166,0.35),0_22px_60px_rgba(20,184,166,0.32)]"
            >
              Book Now
            </button>
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full border border-white/20 px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:border-white/40 hover:bg-white hover:text-slate-950"
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
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/7">
                <p className="text-2xl font-black text-accent">{item.value}</p>
                <p className="mt-1 text-sm text-slate-300">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative reveal-delay-1">
          <div className="absolute -inset-10 rounded-full bg-accent/15 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/5 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80"
              alt="Professional cleaner at work"
              className="h-[29rem] w-full rounded-[1.5rem] object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-slate-950/75 p-5 backdrop-blur-xl">
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
