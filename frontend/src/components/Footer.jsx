function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 py-12 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-[1.1fr_0.9fr_0.8fr] md:items-start">
        <div>
          <h3 className="text-2xl font-black">
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true"></span>
              <span>SparkleClean</span>
            </span>
          </h3>
          <p className="mt-3 max-w-md leading-7 text-slate-400">Spotless homes, stress-free life. Premium cleaning with a booking flow that stays simple from the first click to the final confirmation.</p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Quick Links</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300">
            <a href="#home" className="text-slate-400 transition hover:text-accent">Home</a>
            <a href="#services" className="text-slate-400 transition hover:text-accent">Services</a>
            <a href="#booking" className="text-slate-400 transition hover:text-accent">Booking</a>
            <a href="#contact" className="text-slate-400 transition hover:text-accent">Contact</a>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Contact</p>
          <div className="mt-4 space-y-2 text-sm text-slate-400">
            <p>hello@sparkleclean.com</p>
            <p>+94 77 681 3496</p>
            <p>No.231/1, School Road, Walpolathenna, Galagedara</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-4 pt-6 text-sm text-slate-600">
        © {new Date().getFullYear()} SparkleClean. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
