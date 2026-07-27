export default function ServicesHero() {
  return (
    <section className="relative px-4 pb-10 pt-28 sm:px-6 md:pb-16 md:pt-36 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        <div className="gs-reveal mb-10 max-w-3xl md:mb-16">
          <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            Our Services
          </span>
          <h1 className="mb-6 text-4xl font-bold leading-[1.08] tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
            Solutions Built for{' '}
            <span className="font-serif-italic font-normal text-accent">Real Growth</span>
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base lg:text-lg">
            From risk assessment to growth planning, we offer a full suite of strategic consulting services designed to transform your business from the inside out.
          </p>
        </div>

        <div className="gs-reveal grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-6">
          {[
            { number: '150+', label: 'Projects Delivered' },
            { number: '98%', label: 'Client Satisfaction' },
            { number: '50+', label: 'Industries Served' },
            { number: '$50M+', label: 'Revenue Generated' },
          ].map((stat, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 bg-gray-50 p-5 text-center md:p-6">
              <h3 className="mb-1 text-2xl font-bold text-primary md:text-3xl">{stat.number}</h3>
              <p className="text-xs text-gray-500 md:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
