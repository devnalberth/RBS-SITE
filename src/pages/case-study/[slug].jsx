import Head from 'next/head';
import { useRouter } from 'next/router';
import CaseStudyDetailHero from '@/components/casestudy/CaseStudyDetailHero';
import CaseStudyDetailContent from '@/components/casestudy/CaseStudyDetailContent';
import CaseStudyDetailRelated from '@/components/casestudy/CaseStudyDetailRelated';

const studies = {
  'digital-transformation': {
    title: 'Digital Transformation with Streamlined Operations',
    subtitle: 'How we modernized legacy systems to boost team efficiency and cut costs by 40% for a Fortune 500 company.',
    img: '/images/webp/case-detail-1-optimized.webp',
    midImg: '/images/webp/services-optimized.webp',
    category: 'Technology',
    client: 'TechCorp Global',
    duration: '6 months',
    stats: [
      { value: '40%', label: 'Cost Reduction' },
      { value: '$12M', label: 'Annual Savings' },
      { value: '6mo', label: 'Time to Impact' },
      { value: '98%', label: 'Team Adoption' },
    ],
    challenge: 'TechCorp Global was running on a patchwork of legacy systems built over 15 years. Each department had its own tools, leading to data silos, duplicated effort, and a 30% overhead in manual processes. Employee frustration was high, and the company was losing competitive ground to more agile competitors who could ship products 3x faster.',
    approach: 'We began with a comprehensive 4-week discovery phase, interviewing 50+ stakeholders across 8 departments. This revealed that 60% of manual processes could be automated, and that the real bottleneck wasn\'t technology — it was fragmented workflows. We designed a unified digital platform that connected all departments while preserving the tools teams already loved.',
    steps: [
      'Conducted comprehensive audit of all existing systems and workflows across 8 departments.',
      'Designed a phased migration plan to minimize disruption to daily operations.',
      'Built custom integration layer connecting legacy databases with modern cloud infrastructure.',
      'Implemented automated workflows that eliminated 60% of manual data entry tasks.',
      'Trained 500+ employees through hands-on workshops and created self-service documentation.',
      'Established real-time dashboards for leadership visibility into operational metrics.',
    ],
    solution: 'The new unified platform connected all departments through a single source of truth. We used a microservices architecture that allowed each team to maintain their preferred tools while feeding data into a centralized analytics layer. Custom automation scripts handled the repetitive tasks that previously consumed 12,000+ person-hours annually.',
    quote: {
      text: 'Empower didn\'t just upgrade our technology — they transformed how our entire organization thinks about efficiency. The ROI exceeded our most optimistic projections.',
      author: 'James Chen, CTO at TechCorp Global',
    },
    results: 'Within 6 months of full deployment, TechCorp Global saw a 40% reduction in operational costs, translating to $12M in annual savings. Employee productivity increased by 65%, and the company reduced its product development cycle from 18 months to 6 months. The platform achieved 98% adoption rate across all departments.',
    takeaway: 'Digital transformation isn\'t about replacing everything at once — it\'s about building bridges between existing systems and new capabilities. The most successful transformations preserve what works while eliminating what doesn\'t, ensuring that people, not just technology, are at the center of the change.',
  },
  'workflow-optimization': {
    title: 'Optimizing Workflow for Higher Profits',
    subtitle: 'Expanding Harper & Co\'s retail presence with data-driven strategies for sustainable growth and operational efficiency.',
    img: '/images/webp/case-detail-2-optimized.webp',
    midImg: '/images/webp/growth-planning-optimized.webp',
    category: 'Operations',
    client: 'Harper & Co',
    duration: '4 months',
    stats: [
      { value: '+65%', label: 'Efficiency Gain' },
      { value: '$4.2M', label: 'Revenue Increase' },
      { value: '4mo', label: 'Implementation' },
      { value: '22%', label: 'Margin Improvement' },
    ],
    challenge: 'Harper & Co, a mid-size retail chain with 45 locations, was experiencing declining margins despite growing revenue. Their fulfillment process had 23 handoff points, inventory accuracy was at 78%, and customer complaints about delivery times had increased by 40% year-over-year.',
    approach: 'We deployed a lean operations framework, starting with value stream mapping across the entire order-to-delivery process. By identifying and eliminating non-value-adding steps, we reduced handoff points from 23 to 9. We then implemented predictive inventory management and real-time tracking systems.',
    steps: [
      'Mapped the complete value stream from order placement to customer delivery.',
      'Identified and eliminated 14 redundant handoff points in the fulfillment process.',
      'Implemented predictive inventory management reducing stockouts by 80%.',
      'Deployed real-time order tracking across all 45 retail locations.',
      'Redesigned warehouse layout based on data-driven demand patterns.',
      'Created automated reorder triggers based on sales velocity and seasonal trends.',
    ],
    solution: 'The streamlined workflow reduced order processing time from 72 hours to 18 hours. Predictive inventory brought accuracy from 78% to 97%, virtually eliminating stockouts. The new warehouse layout, based on heat-mapping customer demand patterns, reduced picking time by 45%.',
    quote: {
      text: 'We knew we needed to change but didn\'t know where to start. Empower showed us exactly where the inefficiencies were hiding and gave us a clear path forward.',
      author: 'Rachel Harper, CEO at Harper & Co',
    },
    results: 'Within 4 months, Harper & Co achieved a 65% improvement in operational efficiency and a 22% increase in profit margins. Customer satisfaction scores rose by 35%, delivery complaints dropped by 60%, and the company generated an additional $4.2M in revenue through faster turnaround and fewer lost sales.',
    takeaway: 'Operational efficiency isn\'t about working harder — it\'s about eliminating the invisible friction that accumulates over years of organic growth. Small process improvements, when applied systematically, create compounding returns that transform the bottom line.',
  },
  'market-expansion': {
    title: 'Driving Growth Through Market Expansion',
    subtitle: 'Successfully penetrating the Asia-Pacific market within 6 months with localized strategy and minimal risk.',
    img: '/images/webp/case-detail-3-optimized.webp',
    midImg: '/images/webp/blog-2-optimized.webp',
    category: 'Growth',
    client: 'GlobalTech Inc.',
    duration: '6 months',
    stats: [
      { value: '3x', label: 'Revenue Growth' },
      { value: '5', label: 'New Markets' },
      { value: '6mo', label: 'Market Entry' },
      { value: '150%', label: 'ROI First Year' },
    ],
    challenge: 'GlobalTech Inc., a B2B SaaS company with strong North American presence, had failed two previous attempts to enter the Asia-Pacific market. Cultural misalignment, pricing strategy errors, and lack of local partnerships had resulted in $2M in sunk costs with zero traction.',
    approach: 'Rather than a blanket expansion strategy, we designed a market-by-market approach starting with Singapore as a beachhead. We conducted deep local market research, identified strategic partners in each target country, and built a localized go-to-market playbook that respected cultural and business practice differences.',
    steps: [
      'Conducted in-depth market analysis across 8 APAC countries to identify the top 5 opportunities.',
      'Established strategic partnerships with 12 local distributors and integrators.',
      'Localized product, pricing, and messaging for each target market\'s unique needs.',
      'Built a regional team with 60% local hires to ensure cultural alignment.',
      'Created market-specific onboarding flows and customer success playbooks.',
      'Implemented localized payment processing and compliance frameworks.',
    ],
    solution: 'The beachhead strategy in Singapore provided proof of concept within 8 weeks, generating 15 enterprise deals. This success story became the template for rapid expansion into Japan, South Korea, Australia, and Indonesia. Local partnerships accelerated trust-building that would have taken years to develop organically.',
    quote: {
      text: 'After two failed attempts, we were skeptical about APAC expansion. Empower\'s localized approach made all the difference — they understood that one strategy doesn\'t fit all markets.',
      author: 'Michael Torres, VP International at GlobalTech Inc.',
    },
    results: 'GlobalTech successfully entered 5 APAC markets within 6 months, achieving 3x revenue growth in the region. First-year ROI exceeded 150%, and the APAC segment became the company\'s fastest-growing region. Customer acquisition cost was 40% lower than their North American baseline due to partnership leverage.',
    takeaway: 'International expansion fails when companies try to replicate their home-market strategy abroad. Success requires deep local understanding, strategic partnerships, and the humility to adapt your approach for each unique market context.',
  },
  'scalable-operations': {
    title: 'Streamlining Operations for Scalable Growth',
    subtitle: 'Managing HR and logistics across borders seamlessly with unified systems and processes.',
    img: '/images/webp/case-detail-4-optimized.webp',
    midImg: '/images/webp/about-hero-optimized.webp',
    category: 'Operations',
    client: 'NovaBridge',
    duration: '5 months',
    stats: [
      { value: '-35%', label: 'Cost Reduction' },
      { value: '4', label: 'Countries Unified' },
      { value: '500+', label: 'Employees Onboarded' },
      { value: '89%', label: 'Satisfaction Score' },
    ],
    challenge: 'NovaBridge operated across 4 countries with completely separate HR, payroll, and logistics systems. Each country ran its own processes, leading to inconsistent employee experiences, compliance risks, and $1.8M in annual duplicate administrative costs.',
    approach: 'We designed a "unified core, local flex" operating model — standardizing the 70% of processes that were common across all countries while allowing 30% flexibility for local regulations and cultural practices. This approach balanced efficiency with compliance.',
    steps: [
      'Audited all HR, payroll, and logistics processes across 4 country operations.',
      'Identified 70% commonality in processes that could be standardized globally.',
      'Implemented a unified HRIS platform with country-specific compliance modules.',
      'Consolidated logistics into a single management system with regional hubs.',
      'Created standardized onboarding experience with localized cultural elements.',
      'Established shared service center for common administrative functions.',
    ],
    solution: 'The unified platform gave NovaBridge a single view of their global workforce while maintaining full compliance in each jurisdiction. The shared service center consolidated duplicate functions, and the standardized logistics system reduced shipping costs through consolidated purchasing power.',
    quote: {
      text: 'For the first time, we can see our entire global operation in one dashboard. The cost savings were significant, but the real win was giving our employees a consistent, quality experience.',
      author: 'Anna Kovacs, COO at NovaBridge',
    },
    results: 'NovaBridge achieved a 35% reduction in administrative costs, saving $630K annually. Employee satisfaction increased to 89%, up from 62%. Compliance incidents dropped to zero, and the company successfully onboarded 500+ employees across all 4 countries using the new unified system.',
    takeaway: 'Global operations don\'t require choosing between standardization and localization. The most effective approach is finding the right balance — standardize what creates efficiency while preserving the flexibility that ensures local compliance and cultural respect.',
  },
};

export default function CaseStudyDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const study = studies[slug];

  if (!study) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-primary">Case Study Not Found</h1>
          <p className="mb-6 text-gray-500">The case study you&apos;re looking for doesn&apos;t exist.</p>
          <a href="/case-study" className="text-accent font-semibold hover:underline">← Back to Case Studies</a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{study.title} - Empower Case Study</title>
        <meta name="description" content={study.subtitle} />
      </Head>
      <main className="selection:bg-accent selection:text-white">
        <CaseStudyDetailHero study={study} />
        <CaseStudyDetailContent study={study} />
        <CaseStudyDetailRelated />
      </main>
    </>
  );
}
