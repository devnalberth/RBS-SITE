import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const relatedCases = [
  {
    slug: 'workflow-optimization',
    img: '/images/webp/case-2-optimized.webp',
    title: 'Optimizing Workflow for Higher Profits',
    category: 'Operations',
    result: '+65% Efficiency',
  },
  {
    slug: 'market-expansion',
    img: '/images/webp/case-3-optimized.webp',
    title: 'Driving Growth Through Market Expansion',
    category: 'Growth',
    result: '3x Revenue',
  },
  {
    slug: 'scalable-operations',
    img: '/images/webp/case-4-optimized.webp',
    title: 'Streamlining Operations for Scalable Growth',
    category: 'Operations',
    result: '-35% Costs',
  },
];

export default function CaseStudyDetailRelated() {
  return (
    <section className="bg-gray-50 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="gs-reveal mb-10 flex items-end justify-between md:mb-14">
          <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
            More <span className="font-serif-italic text-accent">Case Studies</span>
          </h2>
          <Link
            href="/case-study"
            className="hidden items-center gap-2 text-sm font-semibold text-accent transition hover:text-primary sm:inline-flex"
          >
            View All <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="gs-reveal grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {relatedCases.map((cs, i) => (
            <Link href={`/case-study/${cs.slug}`} key={i} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-sm">
                <img
                  src={cs.img}
                  alt={cs.title}
                  className="h-[280px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[320px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-white/10 backdrop-blur rounded-xl p-3 md:p-4 text-white">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="rounded-full bg-accent/80 px-2.5 py-0.5 text-[10px] font-semibold">{cs.category}</span>
                    <span className="text-xs font-bold text-accent">{cs.result}</span>
                  </div>
                  <h3 className="text-base font-bold leading-snug md:text-lg">{cs.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
