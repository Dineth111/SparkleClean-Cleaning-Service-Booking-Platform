import { useState } from 'react'

const images = [
  {
    title: 'Living Room',
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&h=560&fit=crop&q=80",
    position: 'center center',
  },
  {
    title: 'Bathroom',
    src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=900&h=560&fit=crop&q=80",
    position: 'center top',
  },
  {
    title: 'Kitchen',
    src: "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=900&h=560&fit=crop&q=80",
    position: 'center center',
  },
  {
    title: 'Office',
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=560&fit=crop&q=80",
    position: 'center center',
  },
  {
    title: 'Window Cleaning',
    src: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=900&h=560&fit=crop&q=80",
    position: 'center center',
  },
  {
    title: 'Sofa Care',
    src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&h=560&fit=crop&q=80",
    position: 'center center',
  },
  {
    title: 'Bedroom',
    src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=900&h=560&fit=crop&q=80",
    position: 'center top',
  },
  {
    title: 'Floor Care',
    src: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=900&h=560&fit=crop&q=80",
    position: 'center center',
  },
]

function GalleryImage({ image }) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/80 shadow-sm transition hover:-translate-y-1">
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-slate-800 animate-pulse" />
      )}
      {hasError ? (
        <div className="flex h-56 w-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2 text-xs text-slate-500">{image.title}</p>
          </div>
        </div>
      ) : (
        <img
          src={image.src}
          alt={image.title}
          style={{ objectPosition: image.position }}
          className={`h-56 w-full object-cover transition duration-500 group-hover:scale-105 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true)
            setIsLoading(false)
          }}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-accent/0 transition duration-500 group-hover:bg-accent/10" />
      <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-xl">
        {image.title}
      </div>
    </div>
  )
}

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
          <GalleryImage key={`${image.src}-${index}`} image={image} />
        ))}
      </div>
    </section>
  )
}

export default Gallery
