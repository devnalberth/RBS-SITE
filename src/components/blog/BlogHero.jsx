import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function BlogHero() {
  return (
    <section className="relative px-4 pb-10 pt-28 sm:px-6 md:pb-16 md:pt-36 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        <div className="gs-reveal mb-10 md:mb-16">
          <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            Our Blog
          </span>
          <h1 className="mb-6 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
            Strategic Insights That Drive{' '}
            <span className="font-serif-italic font-normal text-accent">Success</span>
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base lg:text-lg">
            Expert perspectives on business strategy, leadership, and growth — curated to help you make smarter decisions and stay ahead.
          </p>
        </div>

        {/* Featured Post */}
        <div className="gs-reveal group cursor-pointer overflow-hidden rounded-3xl bg-gray-50 border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="overflow-hidden">
              <img
                src="/images/webp/blog-1-optimized.webp"
                alt="Featured post"
                className="h-[250px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[300px] lg:h-full lg:min-h-[400px]"
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">Featured</span>
                <span className="text-xs text-gray-400">May 1, 2026</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-400">8 min read</span>
              </div>
              <h2 className="mb-4 text-2xl font-bold leading-tight transition group-hover:text-accent md:text-3xl lg:text-4xl">
                The Strategic Edge — How Top Companies Stay Ahead in Uncertain Markets
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-gray-500 md:text-base">
                In today&apos;s rapidly changing business landscape, the companies that thrive are those with a clear strategic framework. Learn how industry leaders are adapting their approach to drive sustainable growth.
              </p>
              <Link
                href="/blog/strategic-edge"
                className="group/btn inline-flex w-fit items-center gap-5 rounded-full bg-accent py-3 pl-6 pr-3 text-sm font-bold text-white transition hover:bg-primary"
              >
                Read Article
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-accent transition group-hover/btn:text-primary">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
