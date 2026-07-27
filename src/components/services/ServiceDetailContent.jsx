import { Check, ArrowUpRight } from 'lucide-react';

export default function ServiceDetailContent({ service }) {
  return (
    <section className="px-4 py-10 sm:px-6 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="gs-reveal grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — Overview */}
          <div>
            <h2 className="mb-4 text-2xl font-bold text-primary md:text-3xl lg:text-4xl">
              What We <span className="font-serif-italic text-accent">Deliver</span>
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-gray-600 md:text-base md:leading-relaxed">
              {service.overview}
            </p>
            <p className="mb-8 text-sm leading-relaxed text-gray-600 md:text-base md:leading-relaxed">
              {service.approach}
            </p>

            <a
              href="/contact"
              className="group inline-flex items-center gap-5 rounded-full bg-accent py-3 pl-6 pr-3 text-sm font-bold text-white transition hover:bg-primary"
            >
              Get Started
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-accent transition group-hover:text-primary">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
          </div>

          {/* Right — Features */}
          <div className="space-y-6">
            {service.features.map((feature, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 bg-gray-50 p-5 transition hover:shadow-md md:p-6">
                <h3 className="mb-2 text-base font-bold text-primary md:text-lg">{feature.title}</h3>
                <p className="mb-4 text-sm text-gray-500">{feature.desc}</p>
                <ul className="space-y-2">
                  {feature.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="h-4 w-4 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
