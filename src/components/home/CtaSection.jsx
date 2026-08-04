import { ArrowUpRight } from 'lucide-react';

const BENEFICIOS = [
  'Comissionamento competitivo',
  'Treinamentos e capacitação contínua',
  'Marketing e ferramentas exclusivas',
  'Backoffice e suporte especializado',
  'Acompanhamento de performance',
];

export default function CtaSection() {
  return (
    <section id="parceiro" className="gs-reveal scroll-mt-28 px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col overflow-hidden rounded-[40px] bg-primary lg:min-h-[526px] lg:flex-row lg:items-stretch">
        <div className="flex flex-col justify-center p-8 md:p-16 lg:w-1/2">
          <div className="flex flex-col items-start gap-6">
            <p className="text-sm font-bold uppercase leading-5 tracking-[0.7px] text-accent">
              Seja um Parceiro RBS
            </p>

            <h2 className="max-w-[440px] font-sans text-h3-m text-white md:text-h3">
              Tenha ao seu lado uma estrutura completa para vender mais e crescer com segurança.
            </h2>

            <ul className="flex flex-col gap-3">
              {BENEFICIOS.map((item) => (
                <li key={item} className="flex items-center gap-3 text-paragraph text-white">
                  <span
                    aria-hidden="true"
                    className="block h-5 w-5 shrink-0 bg-accent"
                    style={{
                      maskImage: 'url(/icons/Checkmark.svg)',
                      WebkitMaskImage: 'url(/icons/Checkmark.svg)',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                      maskSize: 'contain',
                      WebkitMaskSize: 'contain',
                      maskPosition: 'center',
                      WebkitMaskPosition: 'center',
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="/contact"
              className="group inline-flex items-center gap-4 rounded-full bg-accent py-3 pl-7 pr-3 text-base font-bold leading-6 text-white transition-colors hover:bg-[#bd9541] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Quero ser um Parceiro
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-accent">
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </a>
          </div>
        </div>

        <div className="h-[300px] w-full lg:h-auto lg:min-h-[400px] lg:w-1/2">
          <img
            src="/images/webp/ctaimage.webp"
            alt="Aperto de mãos selando uma parceria com a RBS"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
