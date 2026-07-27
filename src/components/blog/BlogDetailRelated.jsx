import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const relatedPosts = [
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
];

export default function BlogDetailRelated() {
  return (
    <section className="bg-gray-50 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="gs-reveal mb-10 flex items-end justify-between md:mb-14">
          <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
            Related <span className="font-serif-italic text-accent">Articles</span>
          </h2>
          <Link
            href="/blog"
            className="hidden items-center gap-2 text-sm font-semibold text-accent transition hover:text-primary sm:inline-flex"
          >
            View All <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="gs-reveal grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {relatedPosts.map((post, i) => (
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

        <div className="gs-reveal mt-8 text-center sm:hidden">
          <Link href="/blog" className="text-sm font-semibold text-accent transition hover:text-primary">
            View All Articles →
          </Link>
        </div>
      </div>
    </section>
  );
}
