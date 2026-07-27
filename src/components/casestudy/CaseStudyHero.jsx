export default function CaseStudyHero() {
  return (
    <section className="px-4 pb-10 pt-28 sm:px-6 md:pb-16 md:pt-36 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        <div className="gs-reveal mb-10 md:mb-16">
          <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            Case Studies
          </span>
          <h1 className="mb-6 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
            Real Results From Real{' '}
            <span className="font-serif-italic font-normal text-accent">Partnerships</span>
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base lg:text-lg">
            Explore how we&apos;ve helped organizations across industries transform their operations, accelerate growth, and achieve measurable outcomes.
          </p>
        </div>

        {/* Featured Case Study */}
        <div className="gs-reveal group cursor-pointer overflow-hidden rounded-3xl">
          <div className="relative h-[300px] md:h-[450px] lg:h-[500px]">
            <img
              src="/images/webp/case-1-optimized.webp"
              alt="Featured case study"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">Featured</span>
                <span className="rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-medium text-white">Technology</span>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 md:p-6 max-w-2xl">
                <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl lg:text-4xl leading-tight">
                  Digital Transformation with Streamlined Operations
                </h2>
                <p className="text-sm text-gray-200 md:text-base">
                  Modernizing legacy systems to boost team efficiency and cut costs by 40% — delivering $12M in annual savings for a Fortune 500 company.
                </p>
                <div className="mt-4 flex flex-wrap gap-6 text-sm font-semibold text-white">
                  <div>
                    <span className="block text-2xl font-bold md:text-3xl">40%</span>
                    <span className="text-xs text-gray-300">Cost Reduction</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold md:text-3xl">$12M</span>
                    <span className="text-xs text-gray-300">Annual Savings</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold md:text-3xl">6mo</span>
                    <span className="text-xs text-gray-300">Time to Impact</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
