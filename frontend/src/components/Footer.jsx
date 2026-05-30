function Footer() {
  return (
    <footer className="bg-primary py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-bold">SparkleClean</h3>
          <p className="text-slate-200">Spotless Homes, Stress-Free Life</p>
        </div>
        <div className="flex gap-4 text-sm">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#booking">Booking</a>
          <a href="#contact">Contact</a>
        </div>
        <p className="text-sm text-slate-200">© {new Date().getFullYear()} SparkleClean. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
