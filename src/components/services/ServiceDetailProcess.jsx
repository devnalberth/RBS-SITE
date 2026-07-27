export default function ServiceDetailProcess({ service }) {
  return (
    <section className="bg-gray-50 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="gs-reveal mb-10 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            How It <span className="font-serif-italic text-accent">Works</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-gray-500 md:text-base">
            Our proven process ensures consistent, measurable results for every engagement.
          </p>
        </div>

        <div className="gs-reveal grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {service.process.map((step, i) => (
            <div key={i} className="relative rounded-2xl border border-gray-100 bg-white p-6 transition hover:shadow-md md:p-8">
              <span className="mb-4 inline-block text-4xl font-bold text-accent/20 md:text-5xl">
                0{i + 1}
              </span>
              <h3 className="mb-2 text-base font-bold text-primary md:text-lg">{step.title}</h3>
              <p className="text-sm text-gray-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
