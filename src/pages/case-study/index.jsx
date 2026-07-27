import Head from 'next/head';
import CaseStudyHero from '@/components/casestudy/CaseStudyHero';
import CaseStudyGrid from '@/components/casestudy/CaseStudyGrid';
import CaseStudyStats from '@/components/casestudy/CaseStudyStats';
import CaseStudyTestimonials from '@/components/casestudy/CaseStudyTestimonials';
import CaseStudyCTA from '@/components/casestudy/CaseStudyCTA';

export default function CaseStudy() {
  return (
    <>
      <Head>
        <title>Case Studies - Empower | Real Results From Real Partnerships</title>
        <meta
          name="description"
          content="Explore how Empower has helped organizations transform operations, accelerate growth, and achieve measurable results across industries."
        />
      </Head>
      <main className="selection:bg-accent selection:text-white">
        <CaseStudyHero />
        <CaseStudyGrid />
        <CaseStudyStats />
        <CaseStudyTestimonials />
        <CaseStudyCTA />
      </main>
    </>
  );
}
