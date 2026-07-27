import { Linkedin, Twitter } from 'lucide-react';

const team = [
  {
    name: 'Marcus Chen',
    role: 'CEO & Founder',
    img: '/images/webp/team-1-optimized.webp',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Head of Strategy',
    img: '/images/webp/team-2-optimized.webp',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'David Okafor',
    role: 'Operations Director',
    img: '/images/webp/team-3-optimized.webp',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Growth Strategist',
    img: '/images/webp/team-4-optimized.webp',
    linkedin: '#',
    twitter: '#',
  },
];

export default function AboutTeam() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="gs-reveal mb-10 md:mb-16">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                Meet the <span className="font-serif-italic text-accent">Team</span>
              </h2>
              <p className="max-w-xl text-sm text-gray-500 md:text-base">
                A diverse group of strategists, analysts, and innovators united by a passion for helping businesses thrive.
              </p>
            </div>
          </div>
        </div>

        <div className="gs-reveal grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {team.map((member, i) => (
            <div key={i} className="group">
              <div className="relative mb-4 overflow-hidden rounded-3xl">
                <img
                  src={member.img}
                  alt={member.name}
                  className="h-[320px] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-[280px] md:h-[340px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-4 left-4 flex gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <a
                    href={member.linkedin}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary transition hover:bg-accent hover:text-white"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href={member.twitter}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary transition hover:bg-accent hover:text-white"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <h3 className="text-lg font-bold">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
