import { Puzzle, Rocket, Search, MessageSquare } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: <MessageSquare className="h-5 w-5 text-accent" />,
    title: 'Initial Consultation',
    desc: 'We start with an in-depth conversation to understand your business, challenges, and goals before proposing any solution.',
  },
  {
    number: '02',
    icon: <Search className="h-5 w-5 text-accent" />,
    title: 'Discover & Diagnose',
    desc: 'Our team conducts thorough research and analysis to uncover root causes, opportunities, and competitive insights.',
  },
  {
    number: '03',
    icon: <Puzzle className="h-5 w-5 text-accent" />,
    title: 'Strategize & Plan',
    desc: 'We build actionable, data-driven roadmaps aligned with your specific business objectives and market conditions.',
  },
  {
    number: '04',
    icon: <Rocket className="h-5 w-5 text-accent" />,
    title: 'Execute & Optimize',
    desc: 'We implement solutions alongside your team, continuously monitoring progress and optimizing for best results.',
  },
];

export default function ServicesProcess() {
  return (
    <section className="bg-gray-50 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="gs-reveal mb-10 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            How We <span className="font-serif-italic text-accent">Work</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-gray-500 md:text-base">
            A proven 4-step process that transforms challenges into opportunities and ideas into results.
          </p>
        </div>

        <div className="gs-reveal grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="group relative rounded-3xl border border-gray-100 bg-white p-6 transition hover:shadow-md md:p-8"
            >
              <span className="mb-4 block text-5xl font-bold text-gray-100 md:text-6xl">{step.number}</span>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 transition group-hover:bg-accent/20">
                {step.icon}
              </div>
              <h3 className="mb-2 text-lg font-bold md:mb-3 md:text-xl">{step.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{step.desc}</p>

              {i < steps.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden h-px w-8 bg-gray-200 lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
