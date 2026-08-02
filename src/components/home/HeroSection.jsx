import { ArrowUpRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative px-4 pb-6 pt-4 md:px-6">
      <div className="relative">
        <div className="relative min-h-[calc(100vh-2.5rem)] overflow-hidden rounded-[28px] md:rounded-[36px]">
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

        <div className="absolute inset-0 z-10 flex items-center overflow-y-auto">
          <div className="gs-reveal mx-auto flex w-full max-w-7xl flex-col px-8 pb-16 pt-28 md:px-10 lg:px-12">
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
        </div>

        <div className="relative z-20 -mt-8 px-2 md:-mt-12 md:px-0">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-b-2xl bg-white px-6 py-4 shadow-[0_1px_1px_rgba(0,0,0,0.05)] md:flex-row md:items-center md:justify-between">
            <img
              src="/images/logo/logorbsblack.webp"
              alt="RBS Consultoria Inteligente"
              width={62}
              height={61}
              className="h-[52px] w-[53px] shrink-0 object-contain md:h-[61px] md:w-[62px]"
            />

            <div className="max-w-[739px] text-primary">
              <p className="font-serif text-h4">Construa um negócio sólido no mercado de consórcios.</p>
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
