import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const categories = ['All', 'Strategy', 'Leadership', 'Growth', 'Operations', 'Innovation'];

const posts = [
  {
    slug: 'growth-blueprint',
    img: '/images/webp/blog-2-optimized.webp',
    title: 'The Growth Blueprint — Strategies and Solutions for Scaling Fast',
    desc: 'Focused on turning ambition into measurable outcomes with proven frameworks.',
    category: 'Growth',
    date: 'Apr 28, 2026',
    readTime: '6 min read',
  },
  {
    slug: 'forward-thinking-strategies',
    img: '/images/webp/blog-3-optimized.webp',
    title: 'Your Hub for Forward-Thinking Strategies in 2026',
    desc: 'A guide to navigating disruption and sparking creativity for leaders.',
    category: 'Strategy',
    date: 'Apr 22, 2026',
    readTime: '5 min read',
  },
  {
    slug: 'leadership-forum',
    img: '/images/webp/blog-4-optimized.webp',
    title: 'The Leadership Forum — Insights and Guidance for Executives',
    desc: 'Highlighting leadership principles that drive high-performing teams.',
    category: 'Leadership',
    date: 'Apr 15, 2026',
    readTime: '7 min read',
  },
  {
    slug: 'strategic-edge',
    img: '/images/webp/services-optimized.webp',
    title: 'Operational Excellence — Cutting Costs Without Cutting Corners',
    desc: 'How to streamline operations while maintaining quality and employee satisfaction.',
    category: 'Operations',
    date: 'Apr 10, 2026',
    readTime: '5 min read',
  },
  {
    slug: 'strategic-edge',
    img: '/images/webp/case-3-optimized.webp',
    title: 'Innovation in Consulting — What the Next Decade Looks Like',
    desc: 'AI, automation, and data are reshaping how consultants deliver value.',
    category: 'Innovation',
    date: 'Apr 5, 2026',
    readTime: '8 min read',
  },
  {
    slug: 'strategic-edge',
    img: '/images/webp/risk-assessment-optimized.webp',
    title: 'Risk Management Strategies for Volatile Markets',
    desc: 'Proactive approaches to identifying and mitigating business risks effectively.',
    category: 'Strategy',
    date: 'Mar 28, 2026',
    readTime: '6 min read',
  },
  {
    slug: 'leadership-forum',
    img: '/images/webp/about-hero-optimized.webp',
    title: 'Building High-Performance Teams From the Ground Up',
    desc: 'Cultural alignment and leadership development as competitive advantages.',
    category: 'Leadership',
    date: 'Mar 20, 2026',
    readTime: '7 min read',
  },
  {
    slug: 'forward-thinking-strategies',
    img: '/images/webp/case-1-optimized.webp',
    title: 'Digital Transformation — A Step-by-Step Guide for SMBs',
    desc: 'Practical steps to modernize your business without breaking the bank.',
    category: 'Innovation',
    date: 'Mar 12, 2026',
    readTime: '9 min read',
  },
  {
    slug: 'growth-blueprint',
    img: '/images/webp/case-2-optimized.webp',
    title: 'Market Expansion Playbook — Going Global the Smart Way',
    desc: 'How to enter new markets with localized strategies and minimal risk.',
    category: 'Growth',
    date: 'Mar 5, 2026',
    readTime: '6 min read',
  },
];

export default function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = activeCategory === 'All' ? posts : posts.filter((p) => p.category === activeCategory);
  const visible = filtered.slice(0, visibleCount);

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Category Filter */}
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

        {/* Posts Grid */}
        <div className="gs-reveal grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {visible.map((post, i) => (
            <Link href={`/blog/${post.slug}`} key={i} className="group cursor-pointer">
              <div className="mb-4 h-48 overflow-hidden rounded-2xl md:h-56">
                <img
                  src={post.img}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mb-3 flex items-center gap-3">
                <span className="rounded-full bg-accent/10 px-3 py-1 text-[10px] font-semibold text-accent">{post.category}</span>
                <span className="text-xs text-gray-400">{post.date}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-400">{post.readTime}</span>
              </div>
              <h3 className="mb-2 text-base font-bold leading-snug transition group-hover:text-accent md:text-lg">
                {post.title}
              </h3>
              <p className="mb-3 line-clamp-2 text-xs text-gray-500 md:mb-4 md:text-sm">{post.desc}</p>
              <span className="flex items-center gap-2 text-xs font-semibold text-accent md:text-sm">
                Read More{' '}
                <span className="rounded-full bg-accent/10 p-1">
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </span>
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
              Load More Articles
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
