import { Folder, Star, Users, TrendingUp } from 'lucide-react';

const stats = [
  {
    icon: <Folder className="h-5 w-5 text-blue-600 md:h-6 md:w-6" />,
    bg: 'bg-blue-50',
    number: '150+',
    desc: 'Successfully completed projects across 10+ industries worldwide.',
  },
  {
    icon: <Star className="h-5 w-5 text-purple-600 md:h-6 md:w-6" />,
    bg: 'bg-purple-50',
    number: '98%',
    desc: 'Client satisfaction rate based on post-project surveys and reviews.',
  },
  {
    icon: <Users className="h-5 w-5 text-indigo-600 md:h-6 md:w-6" />,
    bg: 'bg-indigo-50',
    number: '50+',
    desc: 'Industries served with tailored, data-driven consulting solutions.',
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-orange-600 md:h-6 md:w-6" />,
    bg: 'bg-orange-50',
    number: '$50M+',
    desc: 'Total revenue generated for our clients through strategic initiatives.',
  },
];

export default function CaseStudyStats() {
  return (
    <section className="bg-gray-50 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="gs-reveal mb-10 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            Impact by the <span className="font-serif-italic text-accent">Numbers</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-gray-500 md:text-base">
            Measurable results that speak for themselves — every project, every client, every time.
          </p>
        </div>

        <div className="gs-reveal grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm md:p-8">
              <div className={`${stat.bg} mb-4 flex h-10 w-10 items-center justify-center rounded-lg md:mb-6 md:h-12 md:w-12`}>
                {stat.icon}
              </div>
              <h3 className="mb-2 text-3xl font-bold md:mb-3 md:text-4xl">{stat.number}</h3>
              <p className="text-sm text-gray-500">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
