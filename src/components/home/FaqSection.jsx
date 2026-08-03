import { useState } from 'react';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';

const PERGUNTAS = [
  {
    id: 'juros',
    q: 'Consórcio tem juros?',
    a: 'Não. O consórcio não possui juros como o financiamento. O que existe é uma taxa de administração, que é diluída ao longo do prazo do grupo, e um fundo de reserva. Essa é uma das grandes vantagens do consórcio como ferramenta patrimonial: o custo total é significativamente menor do que qualquer linha de crédito tradicional.',
  },
  {
    id: 'fgts',
    q: 'Posso usar o FGTS no consórcio?',
    a: 'Sim. O FGTS pode ser utilizado para dar lance em consórcios de imóveis residenciais, para complementar o valor da carta de crédito ou para amortizar parcelas. A utilização segue as regras do agente operador (Caixa Econômica Federal) e pode ser uma estratégia poderosa para acelerar a contemplação.',
  },
  {
    id: 'venda-carta',
    q: 'Posso vender uma carta contemplada?',
    a: 'Sim. A carta contemplada pode ser transferida para terceiros, respeitando as regras da administradora. Essa operação é legal e regulamentada. Na RBS Consultoria, orientamos tanto quem deseja adquirir quanto quem deseja comercializar cartas contempladas de forma segura e estratégica.',
  },
  {
    id: 'prazo',
    q: 'Qual o prazo médio de contemplação?',
    a: 'O prazo depende da estratégia adotada. Com lance embutido ou lance fixo bem estruturado, muitos clientes são contemplados entre 3 e 12 meses. Sem lance, o prazo pode variar conforme o grupo. Na consultoria RBS, criamos projeções realistas baseadas no histórico de contemplação de cada grupo.',
  },
  {
    id: 'construcao',
    q: 'Posso usar o consórcio para construção?',
    a: 'Sim. A carta de consórcio de imóvel pode ser utilizada para construção em terreno próprio, reforma ou ampliação. É necessário apresentar o projeto e os documentos solicitados pela administradora. Essa modalidade é especialmente interessante para quem já possui terreno e deseja construir sem juros.',
  },
  {
    id: 'cancelamento',
    q: 'O que acontece se eu cancelar o consórcio?',
    a: 'Em caso de desistência, o consorciado tem direito à devolução dos valores pagos (descontadas as multas previstas em contrato), que ocorre via sorteio nas assembleias ou ao final do grupo. A legislação protege o consorciado, mas nossa recomendação é sempre avaliar alternativas antes de cancelar.',
  },
  {
    id: 'vs-financiamento',
    q: 'Qual a diferença entre consórcio e financiamento?',
    a: 'O financiamento cobra juros compostos sobre o valor total e entrega o bem imediatamente. O consórcio não tem juros, apenas taxa de administração, e a contemplação pode ser acelerada via lance. Para quem tem visão de médio/longo prazo, o consórcio é muito mais econômico e estratégico como ferramenta patrimonial.',
  },
  {
    id: 'lance-embutido',
    q: 'Como funciona o lance embutido?',
    a: 'O lance embutido permite utilizar uma parte do próprio crédito da carta como lance. Ou seja, você não precisa desembolsar dinheiro extra — o valor do lance é descontado da sua carta de crédito. Essa é uma das estratégias mais eficientes para antecipar a contemplação sem comprometer o caixa.',
  },
  {
    id: 'custo-consultoria',
    q: 'A consultoria da RBS tem algum custo adicional?',
    a: 'A RBS Consultoria trabalha com um modelo de remuneração transparente. O diagnóstico inicial é consultivo e sem compromisso. Nossa remuneração está atrelada à operação estruturada, sem custos ocultos. O cliente sempre sabe exatamente o que está pagando e por quê.',
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState(PERGUNTAS[0].id);

  return (
    <section id="faq" className="scroll-mt-28 mt-10 border-t border-gray-100 bg-white px-6 py-24 text-primary">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
        {/* Titulo + CTA — acompanha a rolagem ate o fim das perguntas,
            mesmo tratamento da coluna de texto do Metodo. */}
        <div className="lg:sticky lg:top-32 lg:flex-1">
          <h2 className="max-w-[522px] font-serif text-h2-m md:text-h2">
            Tudo que você precisa saber sobre consórcio estratégico.
          </h2>

          <div className="mt-10 flex flex-col items-start gap-5 rounded-3xl border border-gray-100 bg-gray-50 p-[33px] lg:mt-16">
            <p className="max-w-[440px] text-paragraph">
              Respostas claras e objetivas para as dúvidas mais comuns sobre consórcio, contemplação
              e planejamento patrimonial.
            </p>

            <a
              href="/contact"
              className="group inline-flex items-center gap-4 rounded-full bg-primary py-3 pl-7 pr-3 text-base font-bold leading-6 text-white transition-colors hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Fale com especialista
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-primary transition-colors group-hover:text-accent">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>

        {/* Acordeao */}
        <div className="w-full lg:w-[720px] lg:shrink-0">
          {PERGUNTAS.map((item, index) => {
            const isOpen = openId === item.id;
            const panelId = `faq-${item.id}`;
            const buttonId = `${panelId}-trigger`;

            return (
              <div
                key={item.id}
                className={`service-item border-b border-gray-200 pb-[17px] ${
                  isOpen ? 'active' : ''
                } ${index > 0 ? 'pt-4' : ''}`}
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left text-lg font-bold leading-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {item.q}
                    {isOpen ? (
                      <Minus className="h-5 w-5 shrink-0" aria-hidden="true" />
                    ) : (
                      <Plus className="h-5 w-5 shrink-0" aria-hidden="true" />
                    )}
                  </button>
                </h3>

                <div className="service-content" id={panelId} role="region" aria-labelledby={buttonId}>
                  <div>
                    <p className="pb-6 pt-2 text-base leading-6 text-gray-600">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
