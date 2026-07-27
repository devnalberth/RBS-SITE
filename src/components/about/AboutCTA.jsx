import { ArrowUpRight } from 'lucide-react';

export default function AboutCTA() {
  return (
    <section className="px-4 py-10 md:px-6 gs-reveal">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-primary md:rounded-[40px]">
        <div className="relative flex flex-col items-center justify-center px-8 py-16 text-center md:px-12 md:py-24">
          {/* Decorative circles */}
          <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />

          <span className="relative mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white/80">
            Let&apos;s Work Together
          </span>
          <h2 className="relative mb-6 max-w-3xl text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            Ready to Transform Your Business Into Something{' '}
            <span className="font-serif-italic font-normal">Extraordinary?</span>
          </h2>
          <p className="relative mb-8 max-w-xl text-sm text-white/70 md:text-base">
            Schedule a free consultation with our team and discover how Empower can help you reach your full potential.
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
