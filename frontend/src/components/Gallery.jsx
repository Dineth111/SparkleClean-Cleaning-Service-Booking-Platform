const images = [
  {
    title: 'Living Room',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='560' viewBox='0 0 900 560'%3E%3Cdefs%3E%3ClinearGradient id='g1' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23f1f5f9' offset='0%25'/%3E%3Cstop stop-color='%2391c7ff' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='900' height='560' fill='url(%23g1)'/%3E%3Crect x='120' y='110' width='660' height='340' rx='28' fill='%23ffffff' fill-opacity='0.55'/%3E%3Crect x='210' y='170' width='480' height='190' rx='22' fill='%23cbd5e1' fill-opacity='0.8'/%3E%3Ccircle cx='320' cy='390' r='48' fill='%231e3a5f' fill-opacity='0.85'/%3E%3Ccircle cx='580' cy='390' r='48' fill='%2314b8a6' fill-opacity='0.85'/%3E%3Ctext x='60' y='505' fill='%230f172a' font-family='Arial, sans-serif' font-size='42' font-weight='700'%3ELiving Room%3C/text%3E%3C/svg%3E",
    position: 'center center',
  },
  {
    title: 'Bathroom',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='560' viewBox='0 0 900 560'%3E%3Cdefs%3E%3ClinearGradient id='g2' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23dbeafe' offset='0%25'/%3E%3Cstop stop-color='%2365a30d' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='900' height='560' fill='url(%23g2)'/%3E%3Crect x='180' y='120' width='540' height='320' rx='30' fill='%23ffffff' fill-opacity='0.7'/%3E%3Crect x='270' y='175' width='220' height='210' rx='18' fill='%23e2e8f0'/%3E%3Crect x='520' y='170' width='80' height='220' rx='18' fill='%2314b8a6' fill-opacity='0.85'/%3E%3Ccircle cx='650' cy='220' r='34' fill='%231e3a5f' fill-opacity='0.75'/%3E%3Ctext x='60' y='505' fill='%230f172a' font-family='Arial, sans-serif' font-size='42' font-weight='700'%3EBathroom%3C/text%3E%3C/svg%3E",
    position: 'center top',
  },
  {
    title: 'Kitchen',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='560' viewBox='0 0 900 560'%3E%3Cdefs%3E%3ClinearGradient id='g3' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23fff7ed' offset='0%25'/%3E%3Cstop stop-color='%23fb923c' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='900' height='560' fill='url(%23g3)'/%3E%3Crect x='150' y='110' width='600' height='340' rx='32' fill='%23ffffff' fill-opacity='0.55'/%3E%3Crect x='220' y='170' width='460' height='190' rx='18' fill='%23fed7aa' fill-opacity='0.85'/%3E%3Ccircle cx='340' cy='230' r='48' fill='%23f59e0b' fill-opacity='0.85'/%3E%3Ccircle cx='560' cy='230' r='48' fill='%2314b8a6' fill-opacity='0.85'/%3E%3Ctext x='60' y='505' fill='%230f172a' font-family='Arial, sans-serif' font-size='42' font-weight='700'%3EKitchen%3C/text%3E%3C/svg%3E",
    position: 'center center',
  },
  {
    title: 'Office',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='560' viewBox='0 0 900 560'%3E%3Cdefs%3E%3ClinearGradient id='g4' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23e0f2fe' offset='0%25'/%3E%3Cstop stop-color='%233b82f6' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='900' height='560' fill='url(%23g4)'/%3E%3Crect x='120' y='130' width='660' height='300' rx='30' fill='%23ffffff' fill-opacity='0.5'/%3E%3Crect x='200' y='200' width='500' height='50' rx='16' fill='%231e3a5f' fill-opacity='0.8'/%3E%3Crect x='250' y='280' width='420' height='30' rx='12' fill='%2314b8a6' fill-opacity='0.8'/%3E%3Ctext x='60' y='505' fill='%230f172a' font-family='Arial, sans-serif' font-size='42' font-weight='700'%3EOffice%3C/text%3E%3C/svg%3E",
    position: 'center center',
  },
  {
    title: 'Window Cleaning',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='560' viewBox='0 0 900 560'%3E%3Cdefs%3E%3ClinearGradient id='g5' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23f8fafc' offset='0%25'/%3E%3Cstop stop-color='%2306b6d4' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='900' height='560' fill='url(%23g5)'/%3E%3Crect x='170' y='90' width='560' height='380' rx='34' fill='%23ffffff' fill-opacity='0.45'/%3E%3Crect x='220' y='140' width='460' height='280' rx='22' fill='%23cffafe' fill-opacity='0.8'/%3E%3Cline x1='280' y1='170' x2='620' y2='390' stroke='%2314b8a6' stroke-width='18' stroke-linecap='round'/%3E%3Ctext x='60' y='505' fill='%230f172a' font-family='Arial, sans-serif' font-size='42' font-weight='700'%3EWindows%3C/text%3E%3C/svg%3E",
    position: 'center center',
  },
  {
    title: 'Sofa Care',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='560' viewBox='0 0 900 560'%3E%3Cdefs%3E%3ClinearGradient id='g6' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23fae8ff' offset='0%25'/%3E%3Cstop stop-color='%23a855f7' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='900' height='560' fill='url(%23g6)'/%3E%3Crect x='150' y='120' width='600' height='320' rx='34' fill='%23ffffff' fill-opacity='0.45'/%3E%3Crect x='220' y='240' width='460' height='100' rx='30' fill='%23ede9fe' fill-opacity='0.9'/%3E%3Crect x='260' y='180' width='380' height='70' rx='24' fill='%236d28d9' fill-opacity='0.55'/%3E%3Ctext x='60' y='505' fill='%230f172a' font-family='Arial, sans-serif' font-size='42' font-weight='700'%3ESofa Care%3C/text%3E%3C/svg%3E",
    position: 'center center',
  },
  {
    title: 'Bedroom',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='560' viewBox='0 0 900 560'%3E%3Cdefs%3E%3ClinearGradient id='g7' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23f0fdf4' offset='0%25'/%3E%3Cstop stop-color='%2322c55e' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='900' height='560' fill='url(%23g7)'/%3E%3Crect x='150' y='120' width='600' height='320' rx='32' fill='%23ffffff' fill-opacity='0.55'/%3E%3Crect x='220' y='220' width='460' height='150' rx='26' fill='%23dcfce7' fill-opacity='0.9'/%3E%3Ccircle cx='310' cy='240' r='36' fill='%2314b8a6' fill-opacity='0.9'/%3E%3Ccircle cx='590' cy='240' r='36' fill='%231e3a5f' fill-opacity='0.85'/%3E%3Ctext x='60' y='505' fill='%230f172a' font-family='Arial, sans-serif' font-size='42' font-weight='700'%3EBedroom%3C/text%3E%3C/svg%3E",
    position: 'center top',
  },
  {
    title: 'Floor Care',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='560' viewBox='0 0 900 560'%3E%3Cdefs%3E%3ClinearGradient id='g8' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23fff1f2' offset='0%25'/%3E%3Cstop stop-color='%23ef4444' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='900' height='560' fill='url(%23g8)'/%3E%3Crect x='120' y='120' width='660' height='320' rx='32' fill='%23ffffff' fill-opacity='0.5'/%3E%3Crect x='180' y='250' width='540' height='120' rx='24' fill='%23fee2e2' fill-opacity='0.95'/%3E%3Ccircle cx='290' cy='310' r='32' fill='%2314b8a6' fill-opacity='0.9'/%3E%3Ccircle cx='610' cy='310' r='32' fill='%231e3a5f' fill-opacity='0.9'/%3E%3Ctext x='60' y='505' fill='%230f172a' font-family='Arial, sans-serif' font-size='42' font-weight='700'%3EFloor Care%3C/text%3E%3C/svg%3E",
    position: 'center center',
  },
]

function Gallery() {
  return (
    <section id="gallery" className="mx-auto max-w-6xl px-4 py-20 text-slate-100 md:py-24">
      <div className="mb-10 text-center md:mb-12">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">Gallery</p>
        <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">Recent transformations</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-400 leading-7">
          A quick look at the kind of polished, well-finished spaces our team helps maintain.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((image, index) => (
          <div key={`${image.src}-${index}`} className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/80 shadow-sm transition hover:-translate-y-1">
            <img
              src={image.src}
              alt={image.title}
              style={{ objectPosition: image.position }}
              className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-accent/0 transition duration-500 group-hover:bg-accent/10" />
            <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-xl">
              {image.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Gallery
