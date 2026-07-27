/**
 * Faixa animada com as administradoras parceiras.
 * As larguras vem dos proprios arquivos (todos exportados com 56px de altura),
 * entao cada logo mantem sua proporcao real em vez de uma caixa unica.
 */
const ADMINISTRADORAS = [
  { name: 'Embracon', file: 'embracon', width: 56 },
  { name: 'Azul Consórcio', file: 'azulconsorcio', width: 55 },
  { name: 'Rodobens Consórcios', file: 'rodobens', width: 56 },
  { name: 'Canopus Consórcios', file: 'canopus', width: 112 },
  { name: 'Servopa Consórcios', file: 'servopa', width: 56 },
  { name: 'Bradesco Consórcios', file: 'bradesco', width: 118 },
  { name: 'Itaú Consórcios', file: 'itau', width: 56 },
  { name: 'CNP Consórcios', file: 'cnp', width: 57 },
];

function Logo({ item, duplicate }) {
  return (
    <li className="shrink-0 px-14" aria-hidden={duplicate ? 'true' : undefined}>
      <img
        src={`/images/webp/administradoras/${item.file}.webp`}
        alt={duplicate ? '' : item.name}
        width={item.width}
        height={56}
        loading="lazy"
        className="block rounded-md object-contain opacity-40"
        style={{ width: item.width, height: 56 }}
      />
    </li>
  );
}

export default function AdministradorasSection() {
  return (
    <section id="administradoras" className="scroll-mt-28 bg-primary py-24">
      <h2 className="mx-auto max-w-7xl px-8 text-center font-serif text-2xl leading-[1.1] tracking-[-0.025em] text-white md:text-[36px]">
        Administradoras com as quais <span className="text-accent">trabalhamos</span>
      </h2>

      <div className="marquee-viewport relative mt-20 h-14 overflow-hidden">
        <ul className="marquee-track flex h-14 w-max items-center">
          {ADMINISTRADORAS.map((item) => (
            <Logo key={item.file} item={item} />
          ))}
          {ADMINISTRADORAS.map((item) => (
            <Logo key={`${item.file}-dup`} item={item} duplicate />
          ))}
        </ul>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-primary to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-primary to-transparent" />
      </div>
    </section>
  );
}
