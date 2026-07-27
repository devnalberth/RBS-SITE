import { ArrowUpRight } from 'lucide-react';

export default function AboutStory() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Content */}
          <div className="gs-reveal">
            <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
              Our Story
            </span>
            <h2 className="mb-6 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              From a Small Idea to a{' '}
              <span className="font-serif-italic text-accent">Global Impact</span>
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-gray-500 md:text-base">
              Founded in 2016, Empower started with a simple belief: every business deserves access to world-class strategic guidance. What began as a two-person consultancy in Los Angeles has grown into a trusted partner for over 150 companies across 10+ industries worldwide.
            </p>
            <p className="mb-8 text-sm leading-relaxed text-gray-500 md:text-base">
              We&apos;ve helped organizations navigate digital transformation, optimize operations, and unlock new revenue streams — consistently delivering measurable results that exceed expectations.
            </p>

            <div className="flex flex-wrap gap-8 border-t border-gray-100 pt-8">
              <div>
                <h3 className="text-4xl font-bold text-primary md:text-5xl">150+</h3>
                <p className="mt-1 text-sm font-medium text-gray-500">Projects Delivered</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-primary md:text-5xl">98%</h3>
                <p className="mt-1 text-sm font-medium text-gray-500">Client Satisfaction</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-primary md:text-5xl">10+</h3>
                <p className="mt-1 text-sm font-medium text-gray-500">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="gs-reveal relative">
            <img
              src="/images/webp/growth-planning-optimized.webp"
              alt="Empower story"
              className="h-[400px] w-full rounded-3xl object-cover md:h-[500px]"
            />
            <div className="absolute -bottom-6 -left-4 rounded-2xl bg-white p-5 shadow-xl md:-left-8 md:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                  <ArrowUpRight className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">$50M+</p>
                  <p className="text-xs text-gray-500">Revenue Generated for Clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
