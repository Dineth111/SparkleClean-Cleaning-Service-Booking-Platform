function Hero() {
  return (
    <section
      id="home"
      className="flex min-h-screen items-center bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(15,23,42,0.68), rgba(15,23,42,0.68)), url('https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 text-white">
        <h1 className="text-4xl font-extrabold md:text-6xl">SparkleClean</h1>
        <p className="mt-3 text-lg md:text-2xl">Spotless Homes, Stress-Free Life</p>
        <button
          onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
          className="mt-8 rounded-lg bg-accent px-6 py-3 font-semibold text-white"
        >
          Book Now
        </button>
      </div>
    </section>
  )
}

export default Hero
