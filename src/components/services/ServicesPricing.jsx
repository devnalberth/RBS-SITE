import { ArrowUpRight, Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    desc: 'Perfect for small businesses looking to get strategic clarity.',
    price: '$2,500',
    period: 'per project',
    features: [
      'Initial Business Assessment',
      'Strategy Recommendations Report',
      '2 Consultation Sessions',
      'Email Support for 30 Days',
    ],
    popular: false,
  },
  {
    name: 'Growth',
    desc: 'For scaling businesses ready to invest in structured strategy.',
    price: '$7,500',
    period: 'per quarter',
    features: [
      'Full Business Diagnostic',
      'Custom Growth Roadmap',
      'Monthly Strategy Sessions',
      'Team Workshop (1 per quarter)',
      'Priority Support',
      'Progress Tracking Dashboard',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    desc: 'For large organizations needing a dedicated consulting partner.',
    price: 'Custom',
    period: 'contact us',
    features: [
      'Dedicated Consulting Team',
      'Full-Scale Transformation Plan',
      'Weekly Strategy Sessions',
      'On-Site Workshops',
      'Executive Coaching',
      'Risk & Compliance Audits',
      '24/7 Priority Support',
    ],
    popular: false,
  },
];

export default function ServicesPricing() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="gs-reveal mb-10 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            Transparent <span className="font-serif-italic text-accent">Pricing</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-gray-500 md:text-base">
            Choose a plan that fits your business size and goals. Every plan includes our proven methodology and dedicated support.
          </p>
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
                <span className="text-4xl font-bold md:text-5xl">{plan.price}</span>
                <span className={`ml-2 text-sm ${plan.popular ? 'text-white/60' : 'text-gray-400'}`}>/ {plan.period}</span>
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
