function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/94776813496"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 font-bold text-white shadow-lg shadow-green-500/30 transition hover:bg-green-400"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M12.04 2C6.52 2 2.04 6.48 2.04 12c0 1.86.51 3.69 1.48 5.3L2 22l4.84-1.47A9.95 9.95 0 0 0 12.04 22C17.56 22 22.04 17.52 22.04 12S17.56 2 12.04 2zm5.84 14.29c-.24.67-1.2 1.25-1.67 1.32-.44.07-1 .1-1.62-.1-.37-.12-.84-.28-1.45-.54-2.55-1.1-4.2-3.64-4.33-3.81-.13-.17-1.03-1.37-1.03-2.61 0-1.24.65-1.85.88-2.11.24-.26.52-.32.69-.32h.5c.16 0 .38-.06.59.44.24.57.8 1.98.87 2.12.07.14.12.31.03.48-.09.17-.14.27-.27.42-.13.15-.27.33-.39.44-.13.13-.26.27-.11.53.15.26.66 1.09 1.42 1.76.98.87 1.8 1.14 2.06 1.28.26.14.41.12.56-.07.15-.19.67-.78.85-1.05.18-.27.35-.22.59-.13.24.09 1.52.72 1.78.85.26.13.43.2.5.31.07.11.07.67-.17 1.34z" />
      </svg>
      WhatsApp
    </a>
  )
}

export default WhatsAppButton
