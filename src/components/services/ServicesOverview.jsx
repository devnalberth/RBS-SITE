import { ArrowUpRight, Check, BarChart3, Shield, Users, TrendingUp, Lightbulb, Settings } from 'lucide-react';

const services = [
  {
    slug: 'wealth-finance',
    icon: <BarChart3 className="h-6 w-6 text-accent" />,
    title: 'Wealth Finance',
    desc: 'Helping organizations identify vulnerabilities and safeguard assets with proactive, data-driven risk strategies that protect your bottom line.',
    items: ['Comprehensive Risk Audits', 'Compliance & Regulatory Alignment', 'Financial Forecasting & Modeling'],
    img: '/images/webp/services-optimized.webp',
  },
  {
    slug: 'risk-assessment',
    icon: <Shield className="h-6 w-6 text-accent" />,
    title: 'Risk Assessment',
    desc: 'Identifying operational blind spots and mitigating potential threats before they impact your organization and stakeholders.',
    items: ['Proactive Threat Analysis', 'Crisis Management & Prevention', 'Insurance & Liability Planning'],
    img: '/images/webp/risk-assessment-optimized.webp',
  },
  {
    slug: 'team-strategy',
    icon: <Users className="h-6 w-6 text-accent" />,
    title: 'Team Strategy',
    desc: 'Building high-performing teams through cultural alignment, leadership development, and collaboration coaching that lasts.',
    items: ['Leadership Development Programs', 'Cultural Alignment Workshops', 'Team Performance Analytics'],
    img: '/images/webp/blog-1-optimized.webp',
  },
  {
    slug: 'growth-planning',
    icon: <TrendingUp className="h-6 w-6 text-accent" />,
    title: 'Growth Planning',
    desc: 'Mapping a clear route for scaling, identifying new market opportunities, and optimizing sales funnels for maximum revenue.',
    items: ['Market Expansion Strategy', 'Sales Funnel Optimization', 'Revenue Growth Modeling'],
    img: '/images/webp/growth-planning-optimized.webp',
  },
  {
    slug: 'innovation-consulting',
    icon: <Lightbulb className="h-6 w-6 text-accent" />,
    title: 'Innovation Consulting',
    desc: 'Driving digital transformation and innovation strategies that keep your business ahead of the competition curve.',
    items: ['Digital Transformation Roadmaps', 'Technology Stack Assessment', 'Innovation Culture Building'],
    img: '/images/webp/case-3-optimized.webp',
  },
  {
    slug: 'operational-excellence',
    icon: <Settings className="h-6 w-6 text-accent" />,
    title: 'Operational Excellence',
    desc: 'Streamlining processes, reducing waste, and building scalable systems that grow with your business efficiently.',
    items: ['Process Optimization & Automation', 'Supply Chain Management', 'Quality Assurance Frameworks'],
    img: '/images/webp/case-1-optimized.webp',
  },
];

export default function ServicesOverview() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="gs-reveal mb-10 md:mb-16">
          <h2 className="mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            What We <span className="font-serif-italic text-accent">Offer</span>
          </h2>
          <p className="max-w-2xl text-sm text-gray-500 md:text-base">
            Each service is tailored to your unique business challenges, delivering measurable results with strategic precision.
          </p>
        </div>

        <div className="space-y-8 md:space-y-12">
          {services.map((service, i) => (
            <div
              key={i}
              className={`gs-reveal group grid grid-cols-1 items-center gap-6 overflow-hidden rounded-3xl border border-gray-100 bg-gray-50 transition hover:shadow-lg md:gap-0 lg:grid-cols-2 ${
                i % 2 === 1 ? 'lg:direction-rtl' : ''
              }`}
            >
              {/* Image */}
              <div className={`overflow-hidden ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <img
                  src={service.img}
                  alt={service.title}
                  className="h-[250px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[300px] lg:h-[380px]"
                />
              </div>

              {/* Content */}
              <div className={`p-6 md:p-10 lg:p-12 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 md:mb-6">
                  {service.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl lg:text-3xl">{service.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-gray-500 md:mb-6 md:text-base">{service.desc}</p>

                <ul className="mb-6 space-y-2 md:mb-8 md:space-y-3">
                  {service.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs font-medium text-primary sm:gap-3 sm:text-sm md:text-base">
                      <Check className="h-4 w-4 shrink-0 text-accent md:h-5 md:w-5" /> {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={`/services/${service.slug}`}
                  className="group/btn inline-flex items-center gap-5 rounded-full bg-accent py-3 pl-6 pr-3 text-sm font-bold text-white transition hover:bg-primary"
                >
                  Learn More
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-accent transition group-hover/btn:text-primary">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
