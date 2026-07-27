const NUMEROS = [
  { value: 'R$ 200M+', label: 'em patrimônio planejado' },
  { value: '500+', label: 'projetos estruturados' },
  { value: '92%', label: 'taxa de contemplação em 12 meses' },
  { value: '15+', label: 'anos de experiência' },
];

const DEPOIMENTOS = [
  {
    quote:
      'A consultoria do Rodrigo mudou completamente minha visão sobre consórcio. Fui contemplado em 8 meses com uma estratégia de lance que eu jamais teria pensado sozinho.',
    initials: 'M.C.',
    role: 'Investidor imobiliário',
    result: 'Contemplado em 8 meses',
  },
  {
    quote:
      'O acompanhamento é o diferencial. A cada assembleia eu recebia a orientação do que fazer — nunca fiquei no escuro.',
    initials: 'T.A.',
    role: 'Dentista',
    result: '2 cartas contempladas',
  },
  {
    quote:
      'Renovamos toda a frota da empresa sem comprometer o caixa. O planejamento foi impecável e o acompanhamento, do início ao fim.',
    initials: 'R.S.',
    role: 'Empresário, setor logístico',
    result: 'Frota renovada em 14 meses',
  },
  {
    quote:
      'Trocamos duas máquinas da linha de produção sem tirar capital de giro do negócio.',
    initials: 'L.B.',
    role: 'Sócio, indústria de embalagens',
    result: 'Maquinário renovado',
  },
  {
    quote:
      'Sempre achei consórcio uma furada, até entender a abordagem estratégica da RBS. Hoje tenho 3 cartas em operação como parte do meu planejamento patrimonial.',
    initials: 'A.L.',
    role: 'Médico, investidor',
    result: '3 cartas estruturadas',
  },
  {
    quote:
      'Comprei o terreno e comecei a obra com o crédito da carta. Sem entrada, sem juros e com a parcela cabendo no orçamento.',
    initials: 'P.F.',
    role: 'Engenheiro civil',
    result: 'Terreno e obra em 18 meses',
  },
];

// Distribuicao em 3 colunas, como no wireframe: as colunas 2 e 3 descem 24px.
const COLUNAS = [
  [DEPOIMENTOS[0], DEPOIMENTOS[1]],
  [DEPOIMENTOS[2], DEPOIMENTOS[3]],
  [DEPOIMENTOS[4], DEPOIMENTOS[5]],
];

function Depoimento({ item }) {
  return (
    <figure className="rounded-2xl bg-gray-50 p-8">
      <span aria-hidden="true" className="block font-serif text-2xl leading-8 text-gray-400">
        &ldquo;
      </span>

      <blockquote className="pt-3 text-base font-medium leading-6 text-gray-700">
        {item.quote}
      </blockquote>

      <p className="mt-5 text-xs font-bold uppercase tracking-wide text-primary">
        <span aria-hidden="true" className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
        {item.result}
      </p>

      {/* Depoimentos sao anonimos: o circulo com as iniciais faz as vezes do
          avatar e do nome, entao a legenda ao lado leva so o perfil. */}
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
          {item.initials}
        </span>
        <span className="text-sm leading-5 text-gray-500">{item.role}</span>
      </figcaption>
    </figure>
  );
}

export default function ResultadosSection() {
  return (
    <section id="resultados" className="scroll-mt-28 bg-white px-6 py-20 text-primary">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center">
          <p className="text-center text-base leading-6 text-gray-500">Resultados Reais</p>
          <h2 className="max-w-[896px] text-center font-serif text-h2-m md:text-h2">
            Quem confia na RBS transforma objetivos em patrimônio
          </h2>
        </div>

        <dl className="grid grid-cols-1 gap-3 pt-16 sm:grid-cols-2 lg:grid-cols-4">
          {NUMEROS.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-gray-100 bg-white p-[33px] shadow-[0_1px_1px_rgba(0,0,0,0.05)]"
            >
              <dd className="pt-6 text-4xl font-bold leading-10">{item.value}</dd>
              <dt className="max-w-[230px] pt-3 text-sm leading-5 text-gray-500">{item.label}</dt>
            </div>
          ))}
        </dl>

        <div className="flex flex-col gap-6 pt-16 lg:flex-row lg:items-start">
          {COLUNAS.map((coluna, index) => (
            <div
              key={coluna[0].initials}
              className={`flex flex-1 flex-col gap-6 ${index > 0 ? 'lg:pt-6' : ''}`}
            >
              {coluna.map((item) => (
                <Depoimento key={item.initials} item={item} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
