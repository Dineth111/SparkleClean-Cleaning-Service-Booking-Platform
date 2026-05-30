function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20 md:py-24">
      <div className="mb-10 text-center md:mb-12">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">Contact</p>
        <h2 className="mt-3 text-3xl font-black text-primary md:text-4xl">Reach us anytime</h2>
      </div>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="space-y-5">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Address</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">123 Sparkle Street, City Center</p>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Email</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">hello@sparkleclean.com</p>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Phone</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">+1 234 567 890</p>
            </div>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-extrabold uppercase tracking-[0.16em] text-slate-950 transition hover:bg-teal-300"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
        <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
          <iframe
            title="Google Map"
            className="h-[28rem] w-full border-0"
            loading="lazy"
            src="https://maps.google.com/maps?q=New+York,NY&t=&z=13&ie=UTF8&iwloc=&output=embed"
          />
        </div>
      </div>
    </section>
  )
}

export default Contact
