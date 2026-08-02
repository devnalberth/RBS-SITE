const RECURSOS = [
  {
    icon: '/icons/indicadores.svg',
    size: 20,
    title: 'Indicadores Econômicos',
    text: 'Selic, CDI, IPCA, INCC e muito mais.',
  },
  {
    icon: '/icons/strategyplan.svg',
    size: 24,
    title: 'Estratégias',
    text: 'Como contemplar mais rápido e reduzir custos.',
  },
  {
    icon: '/icons/code-compare.svg',
    size: 26,
    title: 'Comparativos',
    text: 'Consórcio vs Financiamento e outras modalidades.',
  },
  {
    icon: '/icons/newspaper.svg',
    size: 24,
    title: 'Notícias',
    text: 'As principais atualizações do mercado.',
  },
];

export default function InteligenciaSection() {
  return (
    <section id="inteligencia" className="scroll-mt-28 bg-white px-6 py-20 text-primary">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center">
          <p className="text-center text-paragraph uppercase text-accent">Centro de Inteligência</p>

          <h2 className="max-w-[896px] text-center font-serif text-h2-m md:text-h2">
            Informação que gera estratégia.
          </h2>

          <p className="max-w-[534px] pt-6 text-center text-paragraph text-gray-500">
            Conteúdos exclusivos, análises de mercado, comparativos e indicadores para decisões
            inteligentes.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-8 pt-16 sm:grid-cols-2 lg:grid-cols-4">
          {RECURSOS.map((item) => (
            <li
              key={item.title}
              className="flex min-h-[230px] flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-[33px] shadow-[0_1px_1px_rgba(0,0,0,0.05)]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary">
                <span
                  aria-hidden="true"
                  className="block bg-white"
                  style={{
                    width: item.size,
                    height: item.size,
                    maskImage: `url(${item.icon})`,
                    WebkitMaskImage: `url(${item.icon})`,
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center',
                  }}
                />
              </span>

              <h3 className="min-h-[64px] font-serif text-h4">{item.title}</h3>

              <p className="text-sm leading-none text-gray-500">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
