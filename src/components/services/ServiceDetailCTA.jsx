import { ArrowUpRight } from 'lucide-react';

export default function ServiceDetailCTA() {
  return (
    <section className="px-4 py-10 md:px-6 gs-reveal">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-primary md:rounded-[40px]">
        <div className="relative flex flex-col items-center justify-center px-8 py-16 text-center md:px-12 md:py-20">
          <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />

          <h2 className="relative mb-4 max-w-2xl text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            Ready to Get <span className="font-serif-italic font-normal">Started?</span>
          </h2>
          <p className="relative mb-8 max-w-xl text-sm text-white/70 md:text-base">
            Let&apos;s discuss how this service can be tailored to your specific business needs and goals.
          </p>
          <a
            href="/contact"
            className="group relative inline-flex items-center gap-5 rounded-full bg-accent py-3 pl-6 pr-3 text-sm font-bold text-white transition hover:bg-white hover:text-primary"
          >
            Book A Free Call
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-accent transition group-hover:bg-accent group-hover:text-white">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
