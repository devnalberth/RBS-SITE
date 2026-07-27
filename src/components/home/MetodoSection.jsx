/**
 * Método RBS — coluna de texto que acompanha a rolagem (sticky) ao lado de
 * uma escada de 5 etapas. Os algarismos romanos sao decorativos: a sequencia
 * real fica codificada no <ol>, que o leitor de tela ja anuncia como "1 de 5".
 */
const ETAPAS = [
  {
    numeral: 'I',
    title: 'Diagnóstico financeiro',
    text: 'Mapeamos sua realidade financeira, patrimônio atual, fluxo de caixa e capacidade de investimento mensal.',
  },
  {
    numeral: 'II',
    title: 'Mapeamento de grupos',
    text: 'Identificamos os melhores grupos ativos nas administradoras parceiras, considerando taxa, prazo e perfil de contemplação.',
  },
  {
    numeral: 'III',
    title: 'Estratégia de lance',
    text: 'Definimos o modelo de lance ideal — embutido, fixo ou híbrido — com projeção de contemplação personalizada.',
  },
  {
    numeral: 'IV',
    title: 'Projeção de contemplação',
    text: 'Simulamos cenários reais de contemplação baseados em dados históricos e comportamento dos grupos selecionados.',
  },
  {
    numeral: 'V',
    title: 'Gestão até contemplação',
    text: 'Acompanhamento contínuo com ajustes estratégicos em lances, assembleias e oportunidades de antecipação.',
  },
];

export default function MetodoSection() {
  return (
    <section id="metodo" className="scroll-mt-28 bg-white px-6 py-20 text-primary md:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
        {/* Texto — acompanha a rolagem ate o fim dos cards */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-32 lg:w-[448px]">
          <p className="text-xs uppercase leading-none">Exclusivo</p>

          <h2 className="pt-4 font-serif text-h2-m md:text-h2">
            Método <span className="text-accent">RBS</span> de Estruturação
          </h2>

          <p className="text-paragraph">
            Um processo proprietário desenvolvido ao longo de 15 anos de experiência, que transforma
            o consórcio em instrumento preciso de construção patrimonial.
          </p>

          <a
            href="/contact"
            className="group inline-flex items-center gap-2 self-start text-sm leading-5 text-accent/80 transition-colors hover:text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Conheça o método na prática
            <img
              src="/icons/arrowright.svg"
              alt=""
              aria-hidden="true"
              width={14}
              height={14}
              className="block shrink-0 transition-transform group-hover:translate-x-1"
              style={{ width: 14, height: 14 }}
            />
          </a>
        </div>

        {/* Etapas */}
        <ol className="flex w-full flex-col gap-6 lg:w-[704px]">
          {ETAPAS.map((etapa) => (
            <li
              key={etapa.numeral}
              className="gs-reveal flex gap-6 rounded-xl bg-primary p-6 md:p-[33px]"
            >
              <span
                aria-hidden="true"
                className="w-8 shrink-0 font-serif text-h4 leading-[1.2] text-accent/30 md:w-10"
              >
                {etapa.numeral}
              </span>
              <div>
                <h3 className="text-lg font-bold leading-none text-white">{etapa.title}</h3>
                <p className="pt-2 text-paragraph text-white/40">{etapa.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
