import { ArrowUpRight } from 'lucide-react';

/**
 * Pilares da consultoria exibidos abaixo do titulo.
 * Os rotulos sao quebrados em duas linhas conforme o wireframe (node 8007:949).
 * home.svg vem sem o circulo de fundo (23x23); os demais ja o trazem embutido (52x52).
 * Por isso o container aplica o circulo #E6E6E6 e cada icone entra no seu tamanho real.
 */
const PILARES = [
  { icon: '/icons/home.svg', size: 23, lines: ['Planejamento', 'Patrimonial'] },
  { icon: '/icons/letters.svg', size: 52, lines: ['Cartas', 'Contempladas'] },
  { icon: '/icons/follow.svg', size: 52, lines: ['Acompanhamento', 'Consultivo'] },
  { icon: '/icons/strategy.svg', size: 52, lines: ['Estratégia', 'de Contemplação'] },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen px-4 pb-4 pt-4 md:px-6 md:pb-6">
      <div className="relative min-h-[calc(100vh-2rem)] overflow-hidden rounded-[28px] md:min-h-[calc(100vh-3rem)] md:rounded-[36px]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="/images/webp/hero-optimized.webp"
        >
          <source src="/videos/7791991-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div className="absolute inset-x-0 top-0 z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-8 pt-28 md:px-10 lg:px-12">
        <div className="gs-reveal relative w-full">
          {/* Titulo — Manrope Bold 72px com "vida financeira?" em Playfair Display italico */}
          <h1 className="max-w-[768px] font-sans text-[2.5rem] font-bold leading-[1.1] text-white sm:text-[3.5rem] lg:text-[4.5rem] lg:leading-[1.02]">
            Pronto para alavancar a sua{' '}
            <span className="font-serif-italic">vida financeira?</span>
          </h1>

          {/* Pilares — substituem o paragrafo descritivo da versao anterior */}
          <ul className="grid grid-cols-2 gap-x-6 gap-y-8 pb-8 pt-10 sm:gap-x-10 lg:flex lg:flex-wrap lg:gap-0 lg:pt-5">
            {PILARES.map(({ icon, size, lines }, i) => (
              <li
                key={lines.join(' ')}
                className={
                  i > 0
                    ? 'lg:border-l lg:border-[#E6E6E6]/30 lg:pl-[21px] lg:pr-[21px]'
                    : 'lg:pr-[21px]'
                }
              >
                <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#E6E6E6]">
                  <img
                    src={icon}
                    alt=""
                    aria-hidden="true"
                    width={size}
                    height={size}
                    className="block"
                    style={{ width: size, height: size }}
                  />
                </span>
                <span className="mt-5 block text-base leading-7 text-[#E6E6E6] lg:text-xl">
                  {lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>

          <a
            href="/contact"
            className="group inline-flex items-center gap-5 rounded-full bg-accent py-3 pl-6 pr-3 text-sm font-bold leading-5 text-white transition-colors hover:bg-[#bd9541] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Solicitar diagnóstico estratégico
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-accent">
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
