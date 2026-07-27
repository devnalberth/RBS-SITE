import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CaseStudyDetailHero({ study }) {
  return (
    <section className="px-4 pb-10 pt-28 sm:px-6 md:pb-16 md:pt-36 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        <div className="gs-reveal">
          <Link
            href="/case-study"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Case Studies
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              {study.category}
            </span>
            <span className="text-xs text-gray-400">Client: {study.client}</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-400">{study.duration}</span>
          </div>

          <h1 className="mb-6 max-w-4xl text-3xl font-bold leading-[1.15] tracking-tight text-primary sm:text-4xl md:text-5xl">
            {study.title}
          </h1>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base lg:text-lg">
            {study.subtitle}
          </p>
        </div>

        <div className="gs-reveal overflow-hidden rounded-2xl md:rounded-3xl">
          <img
            src={study.img}
            alt={study.title}
            className="h-[250px] w-full object-cover sm:h-[350px] md:h-[450px]"
          />
        </div>

        {/* Stats Row */}
        <div className="gs-reveal mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 md:mt-10 md:gap-6">
          {study.stats.map((stat, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 bg-gray-50 p-4 text-center md:p-6">
              <p className="text-2xl font-bold text-accent md:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-gray-500 md:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
