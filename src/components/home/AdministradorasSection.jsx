const ADMINISTRADORAS = [
  { name: 'Embracon', file: 'embracon', size: 'h-24 md:h-28' },
  { name: 'Bradesco Consórcios', file: 'bradesco', size: 'h-[64px] md:h-[76px]' },
  { name: 'Consórcio Nacional Volkswagen', file: 'volkswagen', size: 'h-24 md:h-28' },
];

export default function AdministradorasSection() {
  return (
    <section id="administradoras" className="scroll-mt-28 bg-primary px-6 py-24">
      <h2 className="mx-auto max-w-7xl text-center font-serif text-2xl leading-[1.1] tracking-[-0.025em] text-white md:text-[36px]">
        Administradoras com as quais <span className="text-accent">trabalhamos</span>
      </h2>

      <ul className="mx-auto mt-16 flex max-w-5xl flex-col items-center justify-center gap-10 sm:flex-row sm:gap-0">
        {ADMINISTRADORAS.map((item, index) => (
          <li
            key={item.file}
            className={`flex justify-center sm:flex-1 sm:px-8 ${
              index > 0 ? 'sm:border-l sm:border-white/15' : ''
            }`}
          >
            <img
              src={`/images/webp/administradoras/${item.file}.webp`}
              alt={item.name}
              loading="lazy"
              className={`w-auto rounded-xl ${item.size}`}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
