function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20 text-slate-100 md:py-24">
      <div className="mb-10 text-center md:mb-12">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">Contact</p>
        <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">Reach us anytime</h2>
      </div>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] md:p-8">
          <div className="space-y-5">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Address</p>
              <p className="mt-2 text-lg font-semibold text-white">📍 No.231/1, School Road, Walpolathenna, Galagedara</p>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Email</p>
              <p className="mt-2 text-lg font-semibold text-white">✉ hello@sparkleclean.com</p>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Phone</p>
              <p className="mt-2 text-lg font-semibold text-white">☎ +94 77 681 3496</p>
            </div>
            <a
              href="https://wa.me/94776813496"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-green-500 px-5 py-3 text-sm font-extrabold uppercase tracking-[0.16em] text-white transition hover:bg-green-400"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
        <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/80 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          <iframe
            title="Google Map"
            className="h-[28rem] w-full border-0"
            loading="lazy"
            src="https://maps.google.com/maps?q=No.231%2F1%2C%20School%20Road%2C%20Walpolathenna%2C%20Galagedara&t=&z=16&ie=UTF8&iwloc=&output=embed"
          />
        </div>
      </div>
    </section>
  )
}

export default Contact
