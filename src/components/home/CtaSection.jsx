import { ArrowUpRight } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className="gs-reveal px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col overflow-hidden rounded-[40px] bg-primary lg:h-[526px] lg:flex-row lg:items-start">
        <div className="flex flex-col justify-center p-8 md:p-16 lg:h-full lg:w-1/2">
          <div className="flex flex-col items-start gap-2.5">
            <p className="text-sm font-bold uppercase leading-5 tracking-[0.7px] text-white opacity-80">
              [Ainda tem dúvidas?]
            </p>

            <h2 className="max-w-[512px] font-serif text-h2-m text-white md:text-h2">
              Fale com um especialista.
            </h2>

            <p className="max-w-[440px] text-paragraph text-white">
              Nossa equipe está pronta para esclarecer qualquer questão e apresentar a melhor
              estratégia para o seu perfil.
            </p>

            <a
              href="/contact"
              className="group inline-flex items-center gap-4 rounded-full bg-white py-3 pl-7 pr-3 text-base font-bold leading-6 text-primary transition-colors hover:bg-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Entre em contato
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </a>
          </div>
        </div>

        <div className="h-[300px] w-full lg:h-full lg:min-h-[400px] lg:w-1/2">
          <img
            src="/images/webp/cta-optimized.webp"
            alt="Equipe da RBS em reunião de consultoria com clientes"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
