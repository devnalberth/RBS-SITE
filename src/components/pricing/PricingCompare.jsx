import { Check, X } from 'lucide-react';

const features = [
  { name: 'Business Assessment', starter: true, growth: true, enterprise: true },
  { name: 'Strategy Report', starter: true, growth: true, enterprise: true },
  { name: 'Consultation Sessions', starter: '2 sessions', growth: 'Monthly', enterprise: 'Weekly' },
  { name: 'Growth Roadmap', starter: false, growth: true, enterprise: true },
  { name: 'Team Workshops', starter: false, growth: '1/quarter', enterprise: 'Unlimited' },
  { name: 'Competitive Analysis', starter: false, growth: true, enterprise: true },
  { name: 'Executive Coaching', starter: false, growth: false, enterprise: true },
  { name: 'On-Site Support', starter: false, growth: false, enterprise: true },
  { name: 'Risk & Compliance Audits', starter: false, growth: false, enterprise: true },
  { name: 'Progress Dashboard', starter: 'Basic', growth: 'Advanced', enterprise: 'Custom' },
  { name: 'Priority Support', starter: false, growth: true, enterprise: true },
  { name: '24/7 Support', starter: false, growth: false, enterprise: true },
];

function CellValue({ value }) {
  if (value === true) return <Check className="mx-auto h-5 w-5 text-accent" />;
  if (value === false) return <X className="mx-auto h-5 w-5 text-gray-300" />;
  return <span className="text-sm font-medium text-primary">{value}</span>;
}

export default function PricingCompare() {
  return (
    <section className="bg-gray-50 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="gs-reveal mb-10 text-center md:mb-14">
          <h2 className="mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            Compare <span className="font-serif-italic text-accent">Plans</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm text-gray-500 md:text-base">
            See exactly what&apos;s included in each plan at a glance.
          </p>
        </div>

        <div className="gs-reveal overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-4 text-left text-sm font-bold text-primary md:text-base">Features</th>
                <th className="py-4 text-center text-sm font-bold text-primary md:text-base">Starter</th>
                <th className="py-4 text-center">
                  <span className="inline-block rounded-full bg-accent px-4 py-1 text-sm font-bold text-white md:text-base">Growth</span>
                </th>
                <th className="py-4 text-center text-sm font-bold text-primary md:text-base">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => (
                <tr key={i} className="border-b border-gray-100 transition hover:bg-white">
                  <td className="py-3.5 text-sm text-gray-600 md:py-4 md:text-base">{feature.name}</td>
                  <td className="py-3.5 text-center md:py-4"><CellValue value={feature.starter} /></td>
                  <td className="py-3.5 text-center md:py-4"><CellValue value={feature.growth} /></td>
                  <td className="py-3.5 text-center md:py-4"><CellValue value={feature.enterprise} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
