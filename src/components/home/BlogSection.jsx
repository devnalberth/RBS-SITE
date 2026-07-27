import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const blogs = [
  {
    slug: 'strategic-edge',
    img: '/images/webp/blog-1-optimized.webp',
    title: 'The Strategic Edge Insights an Hub Consultation for You',
    desc: 'A hub designed to sharpen decision-making with actionable insights.',
  },
  {
    slug: 'growth-blueprint',
    img: '/images/webp/blog-2-optimized.webp',
    title: 'The Growth Blueprint — Strategies and Solutions Hub for You',
    desc: 'Focused on turning ambition into measurable outcomes.',
  },
  {
    slug: 'forward-thinking-strategies',
    img: '/images/webp/blog-3-optimized.webp',
    title: 'Your Hub for Forward-Thinking Strategies',
    desc: 'A guide to navigating disruption and sparking creativity, offering leaders evidence.',
  },
  {
    slug: 'leadership-forum',
    img: '/images/webp/blog-4-optimized.webp',
    title: 'The Leadership Forum — Insights and Guidance Hub for You',
    desc: 'A resource for executives and decision-makers, highlighting leadership principles.',
  },
];

export default function BlogSection() {
  return (
    <section className="py-16 md:py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gs-reveal">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-xl leading-tight">
            Strategic Insights That Drive Business <span className="font-serif-italic text-accent">Success</span>
          </h2>
          <a
            href="/blog"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 bg-primary text-white px-5 md:px-6 py-2.5 md:py-3 rounded-full font-medium hover:bg-accent transition text-sm md:text-base"
          >
            View More Blogs <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gs-reveal">
          {blogs.map((blog, i) => (
            <Link href={`/blog/${blog.slug}`} key={i} className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl mb-4 h-48 md:h-56">
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="w-full h-full object-cover transition transform group-hover:scale-105 duration-500"
                />
              </div>
              <h3 className="font-bold text-base md:text-lg mb-2 group-hover:text-accent transition leading-snug">
                {blog.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4 line-clamp-2">{blog.desc}</p>
              <span className="text-accent font-semibold flex items-center gap-2 text-xs md:text-sm">
                Read More{' '}
                <span className="bg-accent/10 p-1 rounded-full">
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
