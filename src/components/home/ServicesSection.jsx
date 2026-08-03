import { useState } from 'react';

const MODALIDADES = [
  {
    id: 'automoveis',
    title: 'Automóveis',
    from: 'Créditos a partir de R$50.000,00',
    price: 'R$ 50.000',
    items: [
      'Carros nacionais e importados',
      'SUVs e utilitários',
      'Motos e scooters',
      'Caminhões e veículos comerciais',
    ],
  },
  {
    id: 'imoveis',
    title: 'Imóveis',
    from: 'Créditos a partir de R$300.000,00',
    price: 'R$ 300.000',
    items: [
      'Casas e apartamentos',
      'Construção e reforma',
      'Imóveis comerciais',
      'Terrenos urbanos e rurais',
    ],
  },
  {
    id: 'capital-de-giro',
    title: 'Capital de Giro',
    from: 'Créditos a partir de R$100.000,00',
    price: 'R$ 100.000',
    items: [
      'Expansão empresarial',
      'Reforço de caixa',
      'Compra de ativos',
      'Alavancagem financeira',
    ],
  },
];

/**
 * Pilula dourada com a seta em circulo branco. Aparece em dois tamanhos
 * nesta secao: 48px de circulo no CTA do topo e 32px dentro do acordeao.
 */
function PillButton({ href, children, size = 'lg' }) {
  const isLarge = size === 'lg';

  return (
    <a
      href={href}
      className={`group inline-flex shrink-0 self-start items-center rounded-full bg-accent py-1 text-base leading-6 tracking-[-0.02em] text-white transition-colors hover:bg-[#bd9541] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        isLarge ? 'gap-3 pl-6 pr-1' : 'gap-2 pl-5 pr-1'
      }`}
    >
      {children}
      <span
        className={`flex shrink-0 items-center justify-center rounded-full bg-white ${
          isLarge ? 'h-12 w-12' : 'h-8 w-8'
        }`}
      >
        <img
          src="/icons/arrowup.svg"
          alt=""
          aria-hidden="true"
          width={isLarge ? 24 : 16}
          height={isLarge ? 24 : 16}
          className="block transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          style={{ width: isLarge ? 24 : 16, height: isLarge ? 24 : 16 }}
        />
      </span>
    </a>
  );
}

export default function ServicesSection() {
  const [openId, setOpenId] = useState(MODALIDADES[0].id);

  return (
    <section id="modalidades" className="scroll-mt-28 bg-white px-6 py-16 text-primary md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 md:gap-14">
        {/* Titulo + CTA */}
        <div className="gs-reveal flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="flex flex-col gap-5">
            <h2 className="max-w-[739px] font-serif text-h2-m md:text-h2">
              Conheça as modalidades de créditos
            </h2>
            <p className="max-w-[461px] text-paragraph text-muted">
              Escolha abaixo o tipo de crédito que mais combina com o seu momento. Todos os planos
              são personalizados conforme seu perfil.
            </p>
          </div>

          <PillButton href="/contact">Saber Mais</PillButton>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16 xl:gap-20">
          {/* Acordeao de modalidades */}
          <div className="flex w-full flex-col gap-6 lg:max-w-[580px] lg:flex-1">
            {MODALIDADES.map((modalidade, index) => {
              const isOpen = openId === modalidade.id;
              const panelId = `modalidade-${modalidade.id}`;
              const buttonId = `${panelId}-trigger`;

              return (
                <div
                  key={modalidade.id}
                  className={`service-item flex flex-col gap-5 ${isOpen ? 'active' : ''} ${
                    index > 0 ? 'border-t border-hairline pt-6' : ''
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      onClick={() => {
                        // Sempre uma modalidade aberta: clicar na que ja
                        // esta aberta nao fecha (senao a imagem ao lado
                        // perde a altura de referencia do acordeao).
                        if (!isOpen) setOpenId(modalidade.id);
                      }}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex w-full items-center justify-between gap-4 pr-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                      <span className="flex flex-col gap-2.5">
                        <span className="font-serif text-h4">{modalidade.title}</span>
                        <span className="font-sans text-sm font-normal leading-[22px] text-muted">
                          {modalidade.from}
                        </span>
                      </span>
                      <img
                        src="/icons/arrow.svg"
                        alt=""
                        aria-hidden="true"
                        width={15}
                        height={9}
                        className={`block shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        style={{ width: 15, height: 9 }}
                      />
                    </button>
                  </h3>

                  <div className="service-content" id={panelId} role="region" aria-labelledby={buttonId}>
                    <div>
                      <div className="flex flex-col items-start gap-5">
                        <p className="font-sans text-[2rem] font-bold leading-9">{modalidade.price}</p>

                        <ul className="flex flex-col gap-4">
                          {modalidade.items.map((item) => (
                            <li key={item} className="flex items-center gap-2.5 text-base leading-6">
                              <img
                                src="/icons/Checkmark.svg"
                                alt=""
                                aria-hidden="true"
                                width={24}
                                height={24}
                                className="block shrink-0"
                                style={{ width: 24, height: 24 }}
                              />
                              {item}
                            </li>
                          ))}
                        </ul>

                        <PillButton href="/contact" size="sm">
                          Quero esse plano
                        </PillButton>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Imagem — acompanha a altura real do acordeao (self-stretch).
              A img vira position:absolute a partir de lg para sair do fluxo
              do flex: sem isso, a proporcao intrinseca do arquivo (2730x4096)
              e usada no calculo de altura da linha ANTES do stretch, inflando
              a linha inteira para ~750px mesmo com o acordeao mais baixo. */}
          <div className="relative w-full overflow-hidden rounded-xl lg:max-w-[500px] lg:flex-1 lg:self-stretch">
            <img
              src="/images/webp/rodrigo/04.webp"
              alt="Rodrigo Batista, fundador da RBS, no escritório"
              width={2730}
              height={4096}
              loading="lazy"
              className="aspect-[4/5] h-full w-full object-cover lg:absolute lg:inset-0 lg:aspect-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
