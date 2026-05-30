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
    <section id="gallery" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="mb-10 text-center text-3xl font-bold text-primary">Our Work</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((img) => (
          <div key={img} className="overflow-hidden rounded-xl">
            <img
              src={img}
              alt="Cleaned space"
              className="h-56 w-full object-cover transition duration-300 hover:scale-110"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Gallery
