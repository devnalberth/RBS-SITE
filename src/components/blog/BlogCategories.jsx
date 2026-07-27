import { TrendingUp, Users, Lightbulb, Shield, Rocket, BarChart3 } from 'lucide-react';

const categories = [
  {
    icon: <TrendingUp className="h-5 w-5 text-accent" />,
    title: 'Growth',
    count: '12 Articles',
    desc: 'Scaling strategies, market expansion, and revenue optimization.',
  },
  {
    icon: <Users className="h-5 w-5 text-accent" />,
    title: 'Leadership',
    count: '9 Articles',
    desc: 'Team building, culture, and executive development insights.',
  },
  {
    icon: <Lightbulb className="h-5 w-5 text-accent" />,
    title: 'Innovation',
    count: '8 Articles',
    desc: 'Digital transformation, AI, and emerging technologies.',
  },
  {
    icon: <Shield className="h-5 w-5 text-accent" />,
    title: 'Strategy',
    count: '15 Articles',
    desc: 'Competitive analysis, planning, and risk management.',
  },
  {
    icon: <Rocket className="h-5 w-5 text-accent" />,
    title: 'Operations',
    count: '7 Articles',
    desc: 'Process optimization, efficiency, and supply chain.',
  },
  {
    icon: <BarChart3 className="h-5 w-5 text-accent" />,
    title: 'Analytics',
    count: '6 Articles',
    desc: 'Data-driven decisions, metrics, and reporting frameworks.',
  },
];

export default function BlogCategories() {
  return (
    <section className="bg-gray-50 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="gs-reveal mb-10 text-center md:mb-14">
          <h2 className="mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            Browse by <span className="font-serif-italic text-accent">Category</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm text-gray-500 md:text-base">
            Explore topics that matter most to your business growth.
          </p>
        </div>

        <div className="gs-reveal grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="group flex cursor-pointer items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 transition hover:border-accent/20 hover:shadow-md md:p-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10 transition group-hover:bg-accent/20">
                {cat.icon}
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <h3 className="font-bold md:text-lg">{cat.title}</h3>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">{cat.count}</span>
                </div>
                <p className="text-xs leading-relaxed text-gray-500 md:text-sm">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
