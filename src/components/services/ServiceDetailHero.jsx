import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ServiceDetailHero({ service }) {
  return (
    <section className="px-4 pb-10 pt-28 sm:px-6 md:pb-16 md:pt-36 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        <div className="gs-reveal">
          <Link
            href="/services"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Services
          </Link>

          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10">
              {service.icon}
            </div>
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              {service.tag}
            </span>
          </div>

          <h1 className="mb-6 max-w-3xl text-3xl font-bold leading-[1.15] tracking-tight text-primary sm:text-4xl md:text-5xl lg:text-6xl">
            {service.title}
          </h1>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base lg:text-lg">
            {service.heroDesc}
          </p>
        </div>

        <div className="gs-reveal overflow-hidden rounded-2xl md:rounded-3xl">
          <img
            src={service.heroImg}
            alt={service.title}
            className="h-[250px] w-full object-cover sm:h-[350px] md:h-[450px]"
          />
        </div>
      </div>
    </section>
  );
}
