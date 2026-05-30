const images = [
  'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1582582494700-40f9fd2b14b7?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1631889993959-41b4e9d1f1fd?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=900&q=80',
]

function Gallery() {
  return (
    <section id="gallery" className="mx-auto max-w-6xl px-4 py-20 md:py-24">
      <div className="mb-10 text-center md:mb-12">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">Gallery</p>
        <h2 className="mt-3 text-3xl font-black text-primary md:text-4xl">Recent transformations</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600 leading-7">
          A quick look at the kind of polished, well-finished spaces our team helps maintain.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((img) => (
          <div key={img} className="group overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white shadow-sm">
            <img
              src={img}
              alt="Cleaned space"
              className="h-56 w-full object-cover transition duration-500 group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Gallery
