function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="mb-8 text-center text-3xl font-bold text-primary">Contact Us</h2>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3 rounded-xl bg-slate-100 p-6">
          <p><strong>Address:</strong> 123 Sparkle Street, City Center</p>
          <p><strong>Email:</strong> hello@sparkleclean.com</p>
          <p><strong>Phone:</strong> +1 234 567 890</p>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-lg bg-accent px-4 py-2 font-semibold text-white"
          >
            Chat on WhatsApp
          </a>
        </div>
        <div className="overflow-hidden rounded-xl">
          <iframe
            title="Google Map"
            className="h-80 w-full border-0"
            loading="lazy"
            src="https://maps.google.com/maps?q=New+York,NY&t=&z=13&ie=UTF8&iwloc=&output=embed"
          />
        </div>
      </div>
    </section>
  )
}

export default Contact
