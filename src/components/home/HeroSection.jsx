import { ArrowUpRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-white px-4 pb-6 pt-4 md:px-6">
      <div className="relative">
        <div className="relative flex min-h-[calc(100vh-2.5rem)] flex-col overflow-hidden rounded-[28px] md:rounded-[36px]">
          {/* Duas fotos dedicadas: mobile em retrato (9:16-ish), desktop
              em paisagem — o navegador baixa so a que vai usar. */}
          <picture>
            <source media="(max-width: 767px)" srcSet="/images/webp/home/hero-mobile.webp" />
            <img
              src="/images/webp/home/hero-desktop.webp"
              alt="Rodrigo Batista, fundador da RBS, no escritório"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </picture>
          <div className="absolute inset-0 bg-black/45" />

          {/* Texto em fluxo normal (nao mais absolute+inset-0): se o
              conteudo precisar de mais altura que min-h no mobile, o card
              cresce junto em vez de cortar o botao numa rolagem interna.
              No mobile o bloco fica colado embaixo (perto do card de
              parceria) para o topo ficar livre e mostrar o rosto do
              Rodrigo; do md em diante volta a ficar centralizado. */}
          <div className="gs-reveal relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-8 pb-10 pt-28 md:justify-center md:px-10 md:pb-16 lg:px-12">
            <div className="flex flex-col items-start gap-5">
              <h1 className="max-w-[768px] font-sans text-[2.5rem] font-bold leading-[1.1] text-white sm:text-[3.5rem] lg:text-[4.5rem] lg:leading-[1.02]">
                Estratégias inteligentes para construir patrimônio{' '}
                <span className="font-serif-italic">com segurança</span>
              </h1>

              <p className="max-w-[542px] text-paragraph text-white">
                Consultoria especializada em consórcios para empresários, investidores, produtores
                rurais e famílias que buscam crescimento patrimonial.
              </p>

              <a
                href="/contact"
                className="group inline-flex items-center gap-5 whitespace-nowrap rounded-full bg-accent py-3 pl-6 pr-3 text-sm font-bold leading-5 text-white transition-colors hover:bg-[#bd9541] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <span className="sm:hidden">Solicitar diagnóstico</span>
                <span className="hidden sm:inline">Solicitar diagnóstico estratégico</span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-accent">
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={2.5}
                  />
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-20 -mt-8 px-2 md:-mt-12 md:px-0">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[20px] border border-primary bg-white px-6 py-7 shadow-[0_1px_1px_rgba(0,0,0,0.05)] md:flex-row md:items-center md:justify-between md:py-8">
            <img
              src="/icons/hands.svg"
              alt=""
              aria-hidden="true"
              width={52}
              height={52}
              className="h-[44px] w-[44px] shrink-0 object-contain md:h-[52px] md:w-[52px]"
            />

            <div className="max-w-[739px] text-primary">
              <p className="font-sans text-h4">Construa um negócio sólido no mercado de consórcios.</p>
              <p className="text-paragraph">
                Seja um parceiro RBS e tenha acesso à estrutura completa para crescer com segurança.
              </p>
            </div>

            <a
              href="/contact"
              className="group inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-primary py-2 pl-5 pr-2 text-sm font-bold leading-5 text-white transition-colors hover:bg-accent md:self-auto"
            >
              Quero ser um Parceiro
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-primary transition-colors group-hover:text-accent">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
