const clients = [
  {
    name: 'TechVault',
    logo: (
      <svg viewBox="0 0 120 32" fill="currentColor" className="h-7 w-auto">
        <rect x="0" y="4" width="24" height="24" rx="4" fill="currentColor" />
        <path d="M6 12h12M12 12v10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <text x="30" y="23" fontSize="16" fontWeight="700" fontFamily="sans-serif">TechVault</text>
      </svg>
    ),
  },
  {
    name: 'NovaBridge',
    logo: (
      <svg viewBox="0 0 130 32" fill="currentColor" className="h-7 w-auto">
        <circle cx="12" cy="16" r="12" fill="currentColor" />
        <path d="M7 20l5-12 5 12" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="30" y="23" fontSize="16" fontWeight="700" fontFamily="sans-serif">NovaBridge</text>
      </svg>
    ),
  },
  {
    name: 'CoreSync',
    logo: (
      <svg viewBox="0 0 120 32" fill="currentColor" className="h-7 w-auto">
        <rect x="0" y="4" width="24" height="24" rx="12" fill="currentColor" />
        <circle cx="12" cy="16" r="5" stroke="white" strokeWidth="2" fill="none" />
        <circle cx="12" cy="16" r="1.5" fill="white" />
        <text x="30" y="23" fontSize="16" fontWeight="700" fontFamily="sans-serif">CoreSync</text>
      </svg>
    ),
  },
  {
    name: 'BlueAxis',
    logo: (
      <svg viewBox="0 0 120 32" fill="currentColor" className="h-7 w-auto">
        <rect x="0" y="4" width="24" height="24" rx="6" fill="currentColor" />
        <path d="M8 10l8 6-8 6" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="30" y="23" fontSize="16" fontWeight="700" fontFamily="sans-serif">BlueAxis</text>
      </svg>
    ),
  },
  {
    name: 'PeakFlow',
    logo: (
      <svg viewBox="0 0 120 32" fill="currentColor" className="h-7 w-auto">
        <polygon points="12,2 22,28 2,28" fill="currentColor" />
        <path d="M12 12v8M9 17l3 3 3-3" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="28" y="23" fontSize="16" fontWeight="700" fontFamily="sans-serif">PeakFlow</text>
      </svg>
    ),
  },
  {
    name: 'VantageAI',
    logo: (
      <svg viewBox="0 0 125 32" fill="currentColor" className="h-7 w-auto">
        <rect x="0" y="4" width="24" height="24" rx="4" fill="currentColor" />
        <path d="M6 10h4l2 12 2-8 2 8 2-12h4" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="30" y="23" fontSize="16" fontWeight="700" fontFamily="sans-serif">VantageAI</text>
      </svg>
    ),
  },
];

export default function AboutClients() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="gs-reveal mb-10 text-center md:mb-14">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">Trusted By</p>
          <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
            Companies That <span className="font-serif-italic text-accent">Trust</span> Us
          </h2>
        </div>

        <div className="gs-reveal grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-6">
          {clients.map((client, i) => (
            <div
              key={i}
              className="flex items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 px-4 py-8 text-gray-400 transition hover:border-accent/20 hover:bg-accent/5 hover:text-primary md:px-6 md:py-10"
            >
              {client.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
