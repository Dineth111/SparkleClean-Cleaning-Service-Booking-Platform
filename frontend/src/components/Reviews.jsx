const reviews = [
  { name: 'Priya Sharma', rating: 5, comment: 'Professional and very detail oriented.' },
  { name: 'Rahul Mehta', rating: 5, comment: 'Booking was easy and the team arrived on time.' },
  { name: 'Aditi Kapoor', rating: 5, comment: 'My apartment looked brand new after deep clean.' },
]

function Reviews() {
  return (
    <section className="bg-slate-100 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-10 text-center text-3xl font-bold text-primary">What Our Clients Say</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.name} className="rounded-xl bg-white p-6 shadow-sm">
              <p className="mb-2 text-accent">{'★'.repeat(review.rating)}</p>
              <p className="text-slate-700">"{review.comment}"</p>
              <p className="mt-4 font-semibold text-primary">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reviews
