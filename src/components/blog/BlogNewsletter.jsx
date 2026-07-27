import { ArrowRight } from 'lucide-react';

export default function BlogNewsletter() {
  return (
    <section className="px-4 py-10 md:px-6 gs-reveal">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-accent md:rounded-[40px]">
        <div className="relative px-8 py-16 text-center md:px-12 md:py-20">
          {/* Decorative */}
          <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-white/5 blur-3xl" />

          <h2 className="relative mb-4 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            Never Miss an <span className="font-serif-italic font-normal">Insight</span>
          </h2>
          <p className="relative mx-auto mb-8 max-w-xl text-sm text-white/70 md:text-base">
            Subscribe to our newsletter and get the latest strategic insights, growth tips, and industry trends delivered to your inbox every week.
          </p>

          <div className="relative mx-auto flex max-w-md items-center rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur-sm md:p-1.5">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full border-none bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/50"
            />
            <button className="flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-accent transition hover:bg-gray-100 md:px-6 md:py-2.5">
              Subscribe <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <p className="relative mt-4 text-xs text-white/40">No spam, unsubscribe anytime. We respect your privacy.</p>
        </div>
      </div>
    </section>
  );
}
