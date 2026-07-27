import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const categories = ['All', 'Technology', 'Finance', 'Operations', 'Growth', 'Leadership'];

const cases = [
  {
    slug: 'workflow-optimization',
    img: '/images/webp/case-2-optimized.webp',
    title: 'Optimizing Workflow for Higher Profits',
    desc: "Expanding Harper & Co's retail presence with data-driven strategies for sustainable growth.",
    category: 'Operations',
    client: 'Harper & Co',
    result: '+65% Efficiency',
  },
  {
    slug: 'market-expansion',
    img: '/images/webp/case-3-optimized.webp',
    title: 'Driving Growth Through Market Expansion',
    desc: 'Successfully penetrating the Asia-Pacific market within 6 months with localized strategy.',
    category: 'Growth',
    client: 'GlobalTech Inc.',
    result: '3x Revenue',
  },
  {
    slug: 'scalable-operations',
    img: '/images/webp/case-4-optimized.webp',
    title: 'Streamlining Operations for Scalable Growth',
    desc: 'Managing HR and logistics across borders seamlessly with unified systems.',
    category: 'Operations',
    client: 'NovaBridge',
    result: '-35% Costs',
  },
  {
    slug: 'digital-transformation',
    img: '/images/webp/services-optimized.webp',
    title: 'Financial Risk Mitigation for Enterprise',
    desc: 'Comprehensive risk audit and compliance overhaul that reduced exposure by 60%.',
    category: 'Finance',
    client: 'CoreSync Capital',
    result: '-60% Risk',
  },
  {
    slug: 'digital-transformation',
    img: '/images/webp/about-hero-optimized.webp',
    title: 'Building a Leadership Pipeline',
    desc: 'Developing next-generation leaders through structured coaching and cultural alignment.',
    category: 'Leadership',
    client: 'PeakFlow',
    result: '92% Retention',
  },
  {
    slug: 'digital-transformation',
    img: '/images/webp/risk-assessment-optimized.webp',
    title: 'AI-Powered Decision Making Platform',
    desc: 'Implementing data analytics infrastructure that cut decision time by 70%.',
    category: 'Technology',
    client: 'VantageAI',
    result: '-70% Decision Time',
  },
  {
    slug: 'market-expansion',
    img: '/images/webp/growth-planning-optimized.webp',
    title: 'Revenue Growth Strategy for SaaS',
    desc: 'Custom growth roadmap that increased MRR by 150% in under 12 months.',
    category: 'Growth',
    client: 'TechVault',
    result: '+150% MRR',
  },
  {
    slug: 'scalable-operations',
    img: '/images/webp/blog-1-optimized.webp',
    title: 'Team Restructuring for Agile Operations',
    desc: 'Reorganizing teams across 3 continents for faster delivery and better collaboration.',
    category: 'Leadership',
    client: 'BlueAxis',
    result: '2x Velocity',
  },
  {
    slug: 'workflow-optimization',
    img: '/images/webp/blog-2-optimized.webp',
    title: 'Compliance Transformation for FinTech',
    desc: 'Achieving full regulatory compliance in 90 days while reducing audit costs.',
    category: 'Finance',
    client: 'BlueAxis Finance',
    result: '90-Day Compliance',
  },
];

export default function CaseStudyGrid() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = activeCategory === 'All' ? cases : cases.filter((c) => c.category === activeCategory);
  const visible = filtered.slice(0, visibleCount);

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Filter */}
        <div className="gs-reveal mb-10 flex flex-wrap gap-2 md:mb-14 md:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(6);
              }}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition md:px-5 md:text-sm ${
                activeCategory === cat
                  ? 'bg-accent text-white'
                  : 'border border-gray-200 bg-white text-gray-600 hover:border-accent hover:text-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="gs-reveal grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {visible.map((cs, i) => (
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
                  <h3 className="mb-1 text-base font-bold leading-snug md:text-lg">{cs.title}</h3>
                  <p className="line-clamp-2 text-xs text-gray-200 md:text-sm">{cs.desc}</p>
                  <p className="mt-2 text-[10px] font-medium text-gray-300">Client: {cs.client}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        {visibleCount < filtered.length && (
          <div className="gs-reveal mt-10 flex justify-center md:mt-14">
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="group inline-flex items-center gap-5 rounded-full bg-primary py-3 pl-6 pr-3 text-sm font-bold text-white transition hover:bg-accent"
            >
              Load More Cases
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary transition group-hover:text-accent">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
