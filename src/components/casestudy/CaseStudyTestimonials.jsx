const testimonials = [
  {
    text: 'Empower completely transformed our operations. Their strategic insight helped us cut costs by 35% while improving team productivity across all departments.',
    name: 'Sarah Mitchell',
    role: 'COO, NovaBridge',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    text: 'The growth roadmap they delivered was incredibly detailed and actionable. Within 6 months, we expanded into 3 new markets with a 150% revenue increase.',
    name: 'David Okafor',
    role: 'CEO, TechVault',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    text: 'Working with Empower felt like having an extension of our own team. Their leadership coaching program increased our retention rate to 92%.',
    name: 'Emily Rodriguez',
    role: 'VP People, PeakFlow',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];

export default function CaseStudyTestimonials() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="gs-reveal mb-10 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            What Clients <span className="font-serif-italic text-accent">Say</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm text-gray-500 md:text-base">
            Hear directly from the people who experienced the impact.
          </p>
        </div>

        <div className="gs-reveal grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 md:p-8">
              <p className="mb-3 text-xl text-gray-400 font-serif md:mb-4 md:text-2xl">&ldquo;</p>
              <p className="mb-5 text-sm font-medium leading-relaxed text-gray-700 md:mb-6 md:text-base">{t.text}</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
