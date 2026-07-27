import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    desc: 'Perfect for small businesses looking to get strategic clarity and direction.',
    monthly: '$2,500',
    yearly: '$24,000',
    period: 'per project',
    features: [
      'Initial Business Assessment',
      'Strategy Recommendations Report',
      '2 Consultation Sessions',
      'Email Support for 30 Days',
      'Basic Analytics Dashboard',
    ],
    popular: false,
  },
  {
    name: 'Growth',
    desc: 'For scaling businesses ready to invest in structured, ongoing strategy.',
    monthly: '$7,500',
    yearly: '$72,000',
    period: 'per quarter',
    features: [
      'Full Business Diagnostic',
      'Custom Growth Roadmap',
      'Monthly Strategy Sessions',
      'Team Workshop (1 per quarter)',
      'Priority Support',
      'Progress Tracking Dashboard',
      'Competitive Analysis Report',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    desc: 'For large organizations needing a dedicated, full-service consulting partner.',
    monthly: 'Custom',
    yearly: 'Custom',
    period: 'contact us',
    features: [
      'Dedicated Consulting Team',
      'Full-Scale Transformation Plan',
      'Weekly Strategy Sessions',
      'On-Site Workshops',
      'Executive Coaching',
      'Risk & Compliance Audits',
      '24/7 Priority Support',
      'Custom Integrations',
    ],
    popular: false,
  },
];

export default function PricingHero() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="px-4 pb-16 pt-28 sm:px-6 md:pb-24 md:pt-36 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        <div className="gs-reveal mb-10 text-center md:mb-16">
          <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            Pricing
          </span>
          <h1 className="mb-6 text-4xl font-bold leading-[1.08] tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
            Simple, Transparent <span className="font-serif-italic font-normal text-accent">Pricing</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base lg:text-lg">
            No hidden fees, no surprises. Choose a plan that fits your business size and goals — and scale as you grow.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                !isYearly ? 'bg-accent text-white shadow-sm' : 'text-gray-500 hover:text-primary'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                isYearly ? 'bg-accent text-white shadow-sm' : 'text-gray-500 hover:text-primary'
              }`}
            >
              Yearly <span className="ml-1 text-xs opacity-70">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="gs-reveal grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative flex flex-col rounded-3xl border p-6 transition md:p-8 ${
                plan.popular
                  ? 'border-accent bg-accent text-white shadow-xl'
                  : 'border-gray-100 bg-gray-50 hover:shadow-md'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-6 rounded-full bg-white px-4 py-1 text-xs font-bold text-accent shadow-sm">
                  Most Popular
                </span>
              )}

              <h3 className="mb-2 text-xl font-bold md:text-2xl">{plan.name}</h3>
              <p className={`mb-6 text-sm ${plan.popular ? 'text-white/70' : 'text-gray-500'}`}>{plan.desc}</p>

              <div className="mb-6 border-b pb-6" style={{ borderColor: plan.popular ? 'rgba(255,255,255,0.2)' : undefined }}>
                <span className="text-4xl font-bold md:text-5xl">{isYearly ? plan.yearly : plan.monthly}</span>
                <span className={`ml-2 text-sm ${plan.popular ? 'text-white/60' : 'text-gray-400'}`}>
                  / {isYearly && plan.period !== 'contact us' ? 'per year' : plan.period}
                </span>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <Check className={`h-4 w-4 shrink-0 ${plan.popular ? 'text-white' : 'text-accent'}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="/contact"
                className={`group inline-flex items-center justify-center gap-4 rounded-full py-3 pl-6 pr-3 text-sm font-bold transition ${
                  plan.popular
                    ? 'bg-white text-accent hover:bg-gray-100'
                    : 'bg-primary text-white hover:bg-accent'
                }`}
              >
                Get Started
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                    plan.popular
                      ? 'bg-accent text-white'
                      : 'bg-white text-primary group-hover:text-accent'
                  }`}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
