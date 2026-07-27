import Head from 'next/head';
import { useRouter } from 'next/router';
import { BarChart3, Shield, Users, TrendingUp, Lightbulb, Settings } from 'lucide-react';
import ServiceDetailHero from '@/components/services/ServiceDetailHero';
import ServiceDetailContent from '@/components/services/ServiceDetailContent';
import ServiceDetailProcess from '@/components/services/ServiceDetailProcess';
import ServiceDetailCTA from '@/components/services/ServiceDetailCTA';

const services = {
  'wealth-finance': {
    icon: <BarChart3 className="h-6 w-6 text-accent" />,
    tag: 'Finance',
    title: 'Wealth Finance',
    heroDesc: 'Helping organizations identify vulnerabilities and safeguard assets with proactive, data-driven risk strategies that protect your bottom line and fuel sustainable growth.',
    heroImg: '/images/webp/service-detail-1-optimized.webp',
    overview: 'Our Wealth Finance service goes beyond traditional financial advisory. We combine deep industry expertise with cutting-edge analytics to provide comprehensive financial strategies that protect and grow your organization\'s assets. From risk mitigation to revenue optimization, we cover every angle of your financial landscape.',
    approach: 'We start with a thorough financial health assessment, analyzing your current position across all key metrics. Then we build a customized strategy that aligns with your growth objectives while maintaining the financial discipline needed for long-term sustainability.',
    features: [
      {
        title: 'Comprehensive Risk Audits',
        desc: 'Full-spectrum analysis of financial exposure points and mitigation strategies.',
        items: ['Portfolio risk assessment', 'Market volatility modeling', 'Stress testing & scenario analysis'],
      },
      {
        title: 'Compliance & Regulatory Alignment',
        desc: 'Ensure your operations meet all regulatory requirements across jurisdictions.',
        items: ['Multi-jurisdiction compliance mapping', 'Regulatory change monitoring', 'Audit preparation & support'],
      },
      {
        title: 'Financial Forecasting & Modeling',
        desc: 'Data-driven projections that inform strategic decision-making.',
        items: ['Revenue projection models', 'Cash flow optimization', 'Investment return analysis'],
      },
    ],
    process: [
      { title: 'Financial Assessment', desc: 'Complete audit of your current financial position, risks, and opportunities.' },
      { title: 'Strategy Design', desc: 'Build a customized financial roadmap aligned with your business goals.' },
      { title: 'Implementation', desc: 'Execute strategies with hands-on support and real-time monitoring.' },
      { title: 'Ongoing Optimization', desc: 'Continuous refinement based on market changes and performance data.' },
    ],
  },
  'risk-assessment': {
    icon: <Shield className="h-6 w-6 text-accent" />,
    tag: 'Risk Management',
    title: 'Risk Assessment',
    heroDesc: 'Identifying operational blind spots and mitigating potential threats before they impact your organization, stakeholders, and long-term growth trajectory.',
    heroImg: '/images/webp/service-detail-2-optimized.webp',
    overview: 'In an increasingly complex business environment, risk is everywhere — from cybersecurity threats to supply chain disruptions. Our Risk Assessment service provides a systematic approach to identifying, quantifying, and mitigating risks across your entire organization.',
    approach: 'We use a proprietary risk framework that maps threats across four dimensions: financial, operational, strategic, and reputational. This comprehensive view ensures no blind spots remain, and every mitigation strategy is prioritized by impact and likelihood.',
    features: [
      {
        title: 'Proactive Threat Analysis',
        desc: 'Identify risks before they become crises through systematic monitoring.',
        items: ['Industry-specific threat mapping', 'Early warning indicators', 'Competitor risk benchmarking'],
      },
      {
        title: 'Crisis Management & Prevention',
        desc: 'Build organizational resilience with tested response frameworks.',
        items: ['Crisis response playbooks', 'Simulation & tabletop exercises', 'Communication protocols'],
      },
      {
        title: 'Insurance & Liability Planning',
        desc: 'Optimize coverage while minimizing unnecessary insurance spend.',
        items: ['Coverage gap analysis', 'Policy optimization', 'Claims management strategy'],
      },
    ],
    process: [
      { title: 'Risk Discovery', desc: 'Map all potential risks across financial, operational, strategic, and reputational dimensions.' },
      { title: 'Impact Analysis', desc: 'Quantify each risk\'s potential impact and probability of occurrence.' },
      { title: 'Mitigation Planning', desc: 'Design targeted strategies to eliminate or reduce each identified risk.' },
      { title: 'Monitoring & Review', desc: 'Continuous risk monitoring with quarterly reviews and updates.' },
    ],
  },
  'team-strategy': {
    icon: <Users className="h-6 w-6 text-accent" />,
    tag: 'People & Culture',
    title: 'Team Strategy',
    heroDesc: 'Building high-performing teams through cultural alignment, leadership development, and collaboration coaching that creates lasting competitive advantage.',
    heroImg: '/images/webp/service-detail-3-optimized.webp',
    overview: 'Your team is your greatest asset — and your biggest competitive advantage. Our Team Strategy service helps you build, develop, and retain high-performing teams that drive results. We focus on the intersection of culture, capability, and collaboration.',
    approach: 'We begin with a comprehensive team diagnostic, assessing culture, skills, engagement, and leadership effectiveness. From there, we design interventions that address root causes rather than symptoms, ensuring lasting transformation.',
    features: [
      {
        title: 'Leadership Development Programs',
        desc: 'Develop leaders at every level with tailored coaching and growth paths.',
        items: ['Executive coaching', 'Emerging leader programs', 'Succession planning'],
      },
      {
        title: 'Cultural Alignment Workshops',
        desc: 'Build a cohesive culture that attracts talent and drives performance.',
        items: ['Values definition & alignment', 'Cross-functional collaboration', 'Remote culture building'],
      },
      {
        title: 'Team Performance Analytics',
        desc: 'Measure and optimize team effectiveness with data-driven insights.',
        items: ['Engagement scoring', 'Productivity benchmarking', 'Retention prediction modeling'],
      },
    ],
    process: [
      { title: 'Team Diagnostic', desc: 'Assess current team dynamics, culture, skills gaps, and engagement levels.' },
      { title: 'Program Design', desc: 'Create custom development programs tailored to your team\'s needs.' },
      { title: 'Facilitation', desc: 'Deliver workshops, coaching sessions, and training with expert facilitators.' },
      { title: 'Sustained Growth', desc: 'Long-term support with follow-up sessions and progress tracking.' },
    ],
  },
  'growth-planning': {
    icon: <TrendingUp className="h-6 w-6 text-accent" />,
    tag: 'Growth',
    title: 'Growth Planning',
    heroDesc: 'Mapping a clear route for scaling, identifying new market opportunities, and optimizing sales funnels for maximum revenue impact.',
    heroImg: '/images/webp/growth-planning-optimized.webp',
    overview: 'Growth doesn\'t happen by accident. Our Growth Planning service provides a systematic approach to scaling your business — from identifying untapped market opportunities to optimizing every stage of your sales funnel. We build growth engines, not just growth plans.',
    approach: 'We analyze your current growth trajectory, market positioning, and competitive landscape to identify the highest-impact opportunities. Then we build an executable roadmap with clear milestones, KPIs, and accountability structures.',
    features: [
      {
        title: 'Market Expansion Strategy',
        desc: 'Identify and capture new market opportunities with data-backed strategies.',
        items: ['Market sizing & opportunity analysis', 'Entry strategy development', 'Localization planning'],
      },
      {
        title: 'Sales Funnel Optimization',
        desc: 'Maximize conversion at every stage of your customer journey.',
        items: ['Funnel analytics & diagnostics', 'Conversion rate optimization', 'Lead scoring & nurturing'],
      },
      {
        title: 'Revenue Growth Modeling',
        desc: 'Build predictive models that guide resource allocation and investment.',
        items: ['Revenue forecasting', 'Unit economics optimization', 'Pricing strategy analysis'],
      },
    ],
    process: [
      { title: 'Growth Audit', desc: 'Analyze current performance, market position, and growth bottlenecks.' },
      { title: 'Opportunity Mapping', desc: 'Identify and prioritize the highest-impact growth opportunities.' },
      { title: 'Roadmap Creation', desc: 'Build an executable growth plan with milestones and KPIs.' },
      { title: 'Execution Support', desc: 'Hands-on support during implementation with regular optimization.' },
    ],
  },
  'innovation-consulting': {
    icon: <Lightbulb className="h-6 w-6 text-accent" />,
    tag: 'Innovation',
    title: 'Innovation Consulting',
    heroDesc: 'Driving digital transformation and innovation strategies that keep your business ahead of the competition curve and ready for what\'s next.',
    heroImg: '/images/webp/case-3-optimized.webp',
    overview: 'Innovation isn\'t just about technology — it\'s about rethinking how your business creates and delivers value. Our Innovation Consulting service helps you build a culture of innovation while implementing practical digital transformation initiatives that deliver measurable ROI.',
    approach: 'We assess your innovation readiness across technology, processes, and culture. Then we design a transformation roadmap that balances quick wins with strategic investments, ensuring both immediate impact and long-term competitive advantage.',
    features: [
      {
        title: 'Digital Transformation Roadmaps',
        desc: 'Plan your digital journey with a clear, phased approach.',
        items: ['Technology audit & assessment', 'Migration & modernization planning', 'Change management strategy'],
      },
      {
        title: 'Technology Stack Assessment',
        desc: 'Ensure your tech stack supports — not hinders — your business goals.',
        items: ['Stack analysis & recommendations', 'Integration architecture', 'Build vs. buy evaluation'],
      },
      {
        title: 'Innovation Culture Building',
        desc: 'Create an environment where innovation thrives organically.',
        items: ['Innovation labs & sprints', 'Intrapreneurship programs', 'Ideation frameworks'],
      },
    ],
    process: [
      { title: 'Innovation Audit', desc: 'Evaluate current innovation maturity across technology, process, and culture.' },
      { title: 'Vision & Strategy', desc: 'Define your innovation vision and create a phased transformation roadmap.' },
      { title: 'Pilot & Iterate', desc: 'Launch pilot initiatives to validate ideas before full-scale implementation.' },
      { title: 'Scale & Embed', desc: 'Scale successful innovations and embed them into organizational DNA.' },
    ],
  },
  'operational-excellence': {
    icon: <Settings className="h-6 w-6 text-accent" />,
    tag: 'Operations',
    title: 'Operational Excellence',
    heroDesc: 'Streamlining processes, reducing waste, and building scalable systems that grow with your business efficiently and sustainably.',
    heroImg: '/images/webp/case-1-optimized.webp',
    overview: 'Operational excellence is the foundation of sustainable growth. Our service helps you eliminate waste, streamline processes, and build systems that scale. We don\'t just optimize — we transform operations into a competitive advantage that compounds over time.',
    approach: 'Using lean and agile methodologies, we map your entire value chain to identify bottlenecks, redundancies, and opportunities for automation. Then we implement changes in a phased approach that minimizes disruption while maximizing impact.',
    features: [
      {
        title: 'Process Optimization & Automation',
        desc: 'Eliminate manual work and streamline workflows for maximum efficiency.',
        items: ['Value stream mapping', 'Workflow automation', 'Bottleneck elimination'],
      },
      {
        title: 'Supply Chain Management',
        desc: 'Build resilient, efficient supply chains that support growth.',
        items: ['Vendor assessment & optimization', 'Inventory management', 'Logistics optimization'],
      },
      {
        title: 'Quality Assurance Frameworks',
        desc: 'Maintain consistent quality as you scale operations.',
        items: ['QA process design', 'Performance benchmarking', 'Continuous improvement systems'],
      },
    ],
    process: [
      { title: 'Operations Audit', desc: 'Map current processes, identify waste, and benchmark against industry standards.' },
      { title: 'Design & Plan', desc: 'Create optimized workflows with clear automation opportunities.' },
      { title: 'Implement', desc: 'Execute changes in phases with minimal disruption to daily operations.' },
      { title: 'Measure & Refine', desc: 'Track performance improvements and continuously optimize.' },
    ],
  },
};

export default function ServiceDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const service = services[slug];

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-primary">Service Not Found</h1>
          <p className="mb-6 text-gray-500">The service you&apos;re looking for doesn&apos;t exist.</p>
          <a href="/services" className="text-accent font-semibold hover:underline">← Back to Services</a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{service.title} - Empower Services</title>
        <meta name="description" content={service.heroDesc} />
      </Head>
      <main className="selection:bg-accent selection:text-white">
        <ServiceDetailHero service={service} />
        <ServiceDetailContent service={service} />
        <ServiceDetailProcess service={service} />
        <ServiceDetailCTA />
      </main>
    </>
  );
}
