const NUMEROS = [
  { value: 'R$ 200M+', label: 'em patrimônio planejado' },
  { value: '+60', label: 'clientes ativos' },
  { value: '92%', label: 'taxa de contemplação em 12 meses' },
  { value: '15+', label: 'anos de experiência' },
];

const PARCEIROS = [
  {
    name: 'Carlos Henrique Martins',
    role: 'Escritório Parceiro • Curitiba/PR',
    quote:
      'O maior diferencial da RBS não é apenas o comissionamento, mas o suporte. Sempre que preciso estruturar uma operação, montar uma estratégia ou resolver alguma situação com a administradora, sei que posso contar com o Rodrigo e sua equipe.',
  },
  {
    name: 'Marcelo Gonçalves',
    role: 'Representante Comercial • Londrina/PR',
    quote:
      'Antes da parceria, nosso escritório vendia consórcio sem um processo definido. Hoje temos apoio comercial, operacional e estratégico, o que trouxe muito mais segurança para crescer.',
  },
  {
    name: 'Felipe Andrade',
    role: 'Consultor de Consórcios • São José dos Campos/SP',
    quote:
      'O Rodrigo realmente acompanha o parceiro. Não é aquele credenciamento onde você fica sozinho. Sempre existe alguém para orientar, ajudar nas negociações e encontrar a melhor solução para o cliente.',
  },
  {
    name: 'Ricardo Nunes',
    role: 'Consultor Credenciado • Cascavel/PR',
    quote:
      'Em poucos meses consegui aumentar meu faturamento porque passei a trabalhar com estratégias muito mais inteligentes. A consultoria da RBS fez toda diferença na minha evolução.',
  },
  {
    name: 'Eduardo Moraes',
    role: 'Proprietário de Escritório • Balneário Camboriú/SC',
    quote:
      'Além das melhores oportunidades comerciais, a RBS entrega organização, treinamento e acompanhamento constante. É uma parceria construída para quem quer crescer de verdade.',
  },
];

const CLIENTES = [
  {
    name: 'Fernanda Oliveira',
    role: 'Empresária • Curitiba/PR',
    quote:
      'Recebi uma consultoria completa antes mesmo de falar em proposta. O Rodrigo mostrou diferentes cenários, explicou cada detalhe e me ajudou a tomar uma decisão com muita segurança.',
  },
  {
    name: 'João Paulo Mendes',
    role: 'Produtor Rural • Campo Mourão/PR',
    quote:
      'Não procurava apenas uma carta de crédito. Procurava alguém que entendesse de estratégia financeira. O atendimento foi extremamente profissional e personalizado.',
  },
  {
    name: 'Patrícia Carvalho',
    role: 'Médica • Maringá/PR',
    quote:
      'Fiquei impressionada com a transparência durante todo o atendimento. Todas as possibilidades foram apresentadas de forma clara e sem qualquer pressão para fechar negócio.',
  },
  {
    name: 'Gustavo Ribeiro',
    role: 'Empresário • Joinville/SC',
    quote:
      'A consultoria foi muito além da contratação do consórcio. O Rodrigo estruturou uma estratégia que fazia sentido para meu planejamento patrimonial. Recomendo pelo profissionalismo e conhecimento.',
  },
  {
    name: 'Luciana Almeida',
    role: 'Investidora • Curitiba/PR',
    quote:
      'Desde o primeiro contato percebi um atendimento diferenciado. Tudo foi explicado com muita clareza, e em nenhum momento senti que estavam apenas tentando vender um produto. Foi uma verdadeira consultoria.',
  },
];

const DEPOIMENTOS = PARCEIROS.flatMap((parceiro, i) =>
  [
    { ...parceiro, tipo: 'Parceiro' },
    CLIENTES[i] && { ...CLIENTES[i], tipo: 'Cliente' },
  ].filter(Boolean)
);

const COLUNAS = [0, 1, 2].map((coluna) => DEPOIMENTOS.filter((_, i) => i % 3 === coluna));

const VELOCIDADES = ['55s', '68s', '61s'];

const iniciais = (nome) =>
  nome
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('');

function Depoimento({ item }) {
  return (
    <figure className="rounded-2xl bg-gray-50 p-8">
      <div className="flex items-start justify-between gap-4">
        <span aria-hidden="true" className="font-sans text-2xl leading-8 text-gray-400">
          &ldquo;
        </span>
        <span className="rounded-full bg-primary/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary">
          {item.tipo}
        </span>
      </div>

      <blockquote className="pt-3 text-base font-medium leading-6 text-gray-700">
        {item.quote}
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
          {iniciais(item.name)}
        </span>
        <span>
          <span className="block text-sm font-bold leading-5 text-primary">{item.name}</span>
          <span className="block text-xs leading-4 text-gray-500">{item.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function ResultadosSection() {
  return (
    <section id="resultados" className="scroll-mt-28 bg-white px-6 py-20 text-primary">
      <div className="mx-auto max-w-7xl">
        <div className="gs-reveal flex flex-col items-center">
          <p className="text-center text-base leading-6 text-gray-500">Resultados Reais</p>
          <h2 className="max-w-[896px] text-center font-sans text-h2-m md:text-h2">
            Quem confia na RBS transforma objetivos em patrimônio
          </h2>
        </div>

        <dl className="gs-stagger grid grid-cols-1 gap-3 pt-16 sm:grid-cols-2 lg:grid-cols-4">
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

        <div className="relative mt-16">
          <div className="vmarquee grid grid-cols-1 gap-6 lg:h-[680px] lg:grid-cols-3 lg:overflow-hidden">
            {COLUNAS.map((coluna, index) => (
              <div
                key={coluna[0].name}
                className={`vmarquee-track ${index === 1 ? 'vmarquee-track--down' : ''}`}
                style={{ animationDuration: VELOCIDADES[index] }}
              >
                {coluna.map((item) => (
                  <Depoimento key={item.name} item={item} />
                ))}
                <div className="vmarquee-dup hidden lg:contents" aria-hidden="true">
                  {coluna.map((item) => (
                    <Depoimento key={`${item.name}-dup`} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-24 bg-gradient-to-b from-white to-transparent lg:block" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-24 bg-gradient-to-t from-white to-transparent lg:block" />
        </div>
      </div>
    </section>
  );
}
