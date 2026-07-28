export default function SobreSection() {
  return (
    <section id="sobre" className="scroll-mt-28 bg-primary px-6 py-20 md:py-[120px]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:justify-between lg:gap-16">
        <img
          src="/images/webp/rodrigo/03.webp"
          alt="Retrato de Rodrigo Batista, fundador da RBS Consultoria Inteligente"
          width={2730}
          height={4096}
          loading="lazy"
          className="w-full max-w-[662px] rounded-[20px] object-cover object-top lg:h-[701px] lg:shrink-0"
        />

        <div className="flex w-full flex-col gap-5 lg:w-[550px] lg:shrink-0">
          <p className="flex items-center gap-2.5">
            <span aria-hidden="true" className="h-px w-6 shrink-0 bg-white" />
            <span className="font-serif text-xs uppercase leading-none text-[#faf9f7]">
              Sobre o fundador
            </span>
          </p>

          <h2 className="font-serif text-h2-m text-white md:text-h2">Rodrigo Batista</h2>

          <div className="flex flex-col gap-[38px] text-paragraph text-white/80">
            <p className="max-w-[399px]">Consórcio com visão, método e direção patrimonial</p>
            <p>
              Especialista em estruturação de consórcios como ferramenta de construção patrimonial,
              Rodrigo desenvolveu uma abordagem consultiva que transforma o consórcio em instrumento
              estratégico de planejamento financeiro.
            </p>
            <p>
              Sua metodologia combina análise de perfil, mapeamento de oportunidades e acompanhamento
              personalizado — sempre com foco em resultados de longo prazo.
            </p>
          </div>

          <a
            href="/contact"
            className="inline-flex items-center justify-center self-start rounded-[99px] bg-accent px-[35px] py-5 text-base font-extrabold uppercase leading-4 tracking-[-0.1px] text-white transition-colors hover:bg-[#bd9541] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Saiba mais sobre o Rodrigo
          </a>
        </div>
      </div>
    </section>
  );
}
