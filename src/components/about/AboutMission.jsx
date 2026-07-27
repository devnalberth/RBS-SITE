import { Target, Eye, Heart } from 'lucide-react';

const values = [
  {
    icon: <Target className="h-5 w-5 text-accent" />,
    title: 'Our Mission',
    desc: 'To empower businesses with strategic consulting that drives measurable growth, operational efficiency, and lasting transformation across every industry we serve.',
  },
  {
    icon: <Eye className="h-5 w-5 text-accent" />,
    title: 'Our Vision',
    desc: 'To be the most trusted consulting partner globally — known for turning complexity into clarity and ambition into achievement for every client we work with.',
  },
  {
    icon: <Heart className="h-5 w-5 text-accent" />,
    title: 'Our Values',
    desc: 'Integrity, innovation, and impact. We believe in honest partnerships, creative problem-solving, and delivering results that truly matter to your business.',
  },
];

export default function AboutMission() {
  return (
    <section className="bg-gray-50 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="gs-reveal mb-10 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            What Drives Us <span className="font-serif-italic text-accent">Forward</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-gray-500 md:text-base">
            Our purpose goes beyond profits. We&apos;re committed to creating real, lasting value for every business we partner with.
          </p>
        </div>

        <div className="gs-reveal grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {values.map((item, i) => (
            <div
              key={i}
              className="group rounded-3xl border border-gray-100 bg-white p-6 transition hover:shadow-md md:p-8"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 transition group-hover:bg-accent/20 md:mb-6">
                {item.icon}
              </div>
              <h3 className="mb-3 text-lg font-bold md:text-xl">{item.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500 md:text-base">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
