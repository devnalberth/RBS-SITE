import Head from 'next/head';
import { ArrowUpRight } from 'lucide-react';

const releases = [
  {
    version: '3.2.0',
    date: 'May 1, 2026',
    tag: 'Latest',
    changes: [
      { type: 'New', text: 'Added dedicated Pricing page with feature comparison table.' },
      { type: 'New', text: 'Added Contact page with form, map, and office hours.' },
      { type: 'New', text: 'Added Case Study detail pages with full project breakdowns.' },
      { type: 'Improved', text: 'Unified card styles across all pages for visual consistency.' },
      { type: 'Improved', text: 'Enhanced mobile navigation with smooth transitions.' },
    ],
  },
  {
    version: '3.1.0',
    date: 'Apr 15, 2026',
    tag: null,
    changes: [
      { type: 'New', text: 'Launched dedicated Blog page with category filtering.' },
      { type: 'New', text: 'Added Blog detail pages with full article content.' },
      { type: 'New', text: 'Created Services page with detailed service overview.' },
      { type: 'Improved', text: 'Optimized image loading with lazy loading across all pages.' },
      { type: 'Fixed', text: 'Resolved carousel navigation button inconsistency on mobile.' },
    ],
  },
  {
    version: '3.0.0',
    date: 'Mar 28, 2026',
    tag: null,
    changes: [
      { type: 'New', text: 'Complete website redesign with modern, responsive layout.' },
      { type: 'New', text: 'Added About Us page with team section and company timeline.' },
      { type: 'New', text: 'Implemented GSAP scroll animations across all sections.' },
      { type: 'Improved', text: 'Redesigned homepage with new hero section and case study carousel.' },
      { type: 'Improved', text: 'Updated typography system with serif italic accents.' },
    ],
  },
  {
    version: '2.5.0',
    date: 'Mar 10, 2026',
    tag: null,
    changes: [
      { type: 'New', text: 'Added testimonials section with client avatars and quotes.' },
      { type: 'New', text: 'Integrated newsletter subscription in footer.' },
      { type: 'Improved', text: 'Improved accessibility with ARIA labels and keyboard navigation.' },
      { type: 'Fixed', text: 'Fixed footer link alignment on tablet devices.' },
    ],
  },
  {
    version: '2.0.0',
    date: 'Feb 20, 2026',
    tag: null,
    changes: [
      { type: 'New', text: 'Initial launch with homepage, navigation, and footer.' },
      { type: 'New', text: 'Added process section and FAQ accordion.' },
      { type: 'New', text: 'Implemented brand marquee with partner logos.' },
    ],
  },
];

const typeBadge = {
  New: 'bg-green-50 text-green-600',
  Improved: 'bg-blue-50 text-blue-600',
  Fixed: 'bg-orange-50 text-orange-600',
};

export default function Changelog() {
  return (
    <>
      <Head>
        <title>Changelog - Empower | What&apos;s New</title>
        <meta name="description" content="Stay up to date with the latest updates, improvements, and new features on Empower." />
      </Head>
      <main className="selection:bg-accent selection:text-white">
        {/* Hero */}
        <section className="px-4 pb-10 pt-28 sm:px-6 md:pb-16 md:pt-36 lg:pt-40">
          <div className="mx-auto max-w-3xl text-center">
            <div className="gs-reveal">
              <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
                Changelog
              </span>
              <h1 className="mb-6 text-4xl font-bold leading-[1.08] tracking-tight text-primary sm:text-5xl md:text-6xl">
                What&apos;s <span className="font-serif-italic font-normal text-accent">New</span>
              </h1>
              <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-500 md:text-base">
                A timeline of updates, improvements, and new features. We ship regularly to keep improving your experience.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="px-4 pb-16 sm:px-6 md:pb-24">
          <div className="mx-auto max-w-3xl">
            <div className="relative space-y-10 before:absolute before:left-[19px] before:top-2 before:h-[calc(100%-16px)] before:w-[2px] before:bg-gray-100 md:before:left-[23px]">
              {releases.map((release, i) => (
                <div key={i} className="gs-reveal relative pl-12 md:pl-14">
                  {/* Dot */}
                  <div className={`absolute left-[12px] top-1.5 h-4 w-4 rounded-full border-[3px] md:left-[16px] ${release.tag ? 'border-accent bg-accent' : 'border-gray-300 bg-white'}`} />

                  {/* Header */}
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-bold text-primary md:text-2xl">v{release.version}</h2>
                    {release.tag && (
                      <span className="rounded-full bg-accent px-3 py-0.5 text-[10px] font-bold text-white">{release.tag}</span>
                    )}
                    <span className="text-xs text-gray-400">{release.date}</span>
                  </div>

                  {/* Changes */}
                  <ul className="space-y-3">
                    {release.changes.map((change, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className={`mt-0.5 shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold ${typeBadge[change.type]}`}>
                          {change.type}
                        </span>
                        <span className="text-sm text-gray-600">{change.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pb-10 md:px-6 gs-reveal">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-primary md:rounded-[40px]">
            <div className="relative flex flex-col items-center justify-center px-8 py-16 text-center md:px-12 md:py-20">
              <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />
              <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />
              <h2 className="relative mb-4 max-w-2xl text-3xl font-bold leading-tight text-white md:text-4xl">
                Have a Feature <span className="font-serif-italic font-normal">Request?</span>
              </h2>
              <p className="relative mb-8 max-w-xl text-sm text-white/70 md:text-base">
                We&apos;re always improving. Share your ideas and help us build a better platform for your business.
              </p>
              <a
                href="/contact"
                className="group relative inline-flex items-center gap-5 rounded-full bg-accent py-3 pl-6 pr-3 text-sm font-bold text-white transition hover:bg-white hover:text-primary"
              >
                Share Feedback
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-accent transition group-hover:bg-accent group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
