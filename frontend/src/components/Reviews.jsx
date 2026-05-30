const reviews = [
  { name: 'Priya Sharma', rating: 5, comment: 'Professional and very detail oriented.' },
  { name: 'Rahul Mehta', rating: 5, comment: 'Booking was easy and the team arrived on time.' },
  { name: 'Aditi Kapoor', rating: 5, comment: 'My apartment looked brand new after deep clean.' },
]

function Reviews() {
  return (
    <section className="px-4 py-20 md:py-24">
      <div className="mx-auto max-w-6xl rounded-[2.2rem] border border-white/10 bg-slate-900/70 px-6 py-10 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:px-8 reveal">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">Reviews</p>
          <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">What our clients say</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.name} className="rounded-[1.75rem] border border-white/10 bg-slate-900/90 p-7 shadow-sm transition hover:-translate-y-1 hover:border-white/15">
              <div className="flex items-center gap-1 text-accent">{'★★★★★'.slice(0, review.rating)}</div>
              <p className="mt-4 italic text-slate-300 leading-8">"{review.comment}"</p>
              <p className="mt-6 font-bold text-white">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reviews
