import { ArrowUpRight } from 'lucide-react';

export default function ServicesCTA() {
  return (
    <section className="px-4 py-10 md:px-6 gs-reveal">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl md:rounded-[40px]">
        <div className="relative grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="h-[250px] sm:h-[300px] lg:h-auto lg:min-h-[450px]">
            <img
              src="/images/webp/hero-optimized.webp"
              alt="Consulting team"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="relative flex flex-col justify-center bg-primary p-8 md:p-12 lg:p-16">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />
            <span className="relative mb-4 inline-block text-xs font-bold uppercase tracking-wider text-white/60">
              Ready to Start?
            </span>
            <h2 className="relative mb-4 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              Let&apos;s Build Your Strategy{' '}
              <span className="font-serif-italic font-normal">Together</span>
            </h2>
            <p className="relative mb-8 max-w-md text-sm text-white/70 md:text-base">
              Book a free consultation with our team. We&apos;ll analyze your challenges, identify opportunities, and create a custom plan for your success.
            </p>
            <a
              href="/contact"
              className="group relative inline-flex w-fit items-center gap-5 rounded-full bg-accent py-3 pl-6 pr-3 text-sm font-bold text-white transition hover:bg-white hover:text-primary"
            >
              Book A Free Call
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-accent transition group-hover:bg-accent group-hover:text-white">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
