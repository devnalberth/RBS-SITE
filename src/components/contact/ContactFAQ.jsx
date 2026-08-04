import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const PERGUNTAS = [
  {
    question: 'Em quanto tempo recebo retorno?',
    answer:
      'Respondemos os contatos em até 24 horas úteis. Se precisar de algo mais rápido, o WhatsApp é o canal mais direto — normalmente o retorno sai no mesmo dia.',
  },
  {
    question: 'O primeiro atendimento tem custo?',
    answer:
      'Não. O diagnóstico inicial é consultivo e sem compromisso: entendemos seu objetivo, analisamos sua realidade atual e só então apresentamos os cenários possíveis.',
  },
  {
    question: 'Posso ir até o escritório?',
    answer:
      'Sim. Estamos na R. Padre Anchieta, 712 — Mercês, em Curitiba. Recomendamos agendar antes pelo WhatsApp para garantir que um especialista esteja disponível para te atender.',
  },
  {
    question: 'Vocês atendem clientes de outros estados?',
    answer:
      'Sim. Boa parte do acompanhamento é feita a distância, por videochamada e WhatsApp, com a mesma proximidade do atendimento presencial. Hoje temos clientes e parceiros em várias regiões do Brasil.',
  },
  {
    question: 'Sou consultor ou tenho escritório. Como funciona a parceria?',
    answer:
      'Selecione "Quero ser um Parceiro RBS" no formulário ou chame no WhatsApp. Apresentamos o modelo de comissionamento, o suporte comercial e a estrutura de treinamento e backoffice que oferecemos.',
  },
  {
    question: 'O que devo ter em mãos no primeiro contato?',
    answer:
      'Basta ter clareza do seu objetivo e uma ideia da capacidade de investimento mensal. Se não souber ainda, tudo bem — parte do nosso trabalho é justamente ajudar a organizar isso.',
  },
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-gray-50 px-6 py-16 text-primary md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="gs-reveal mb-10 text-center md:mb-14">
          <h2 className="mb-4 font-sans text-h2-m md:text-h2">
            Dúvidas <span className="text-accent">frequentes</span>
          </h2>
          <p className="mx-auto max-w-xl text-paragraph text-gray-500">
            Respostas rápidas para você chegar preparado ao primeiro contato.
          </p>
        </div>

        <div className="gs-reveal space-y-4">
          {PERGUNTAS.map((faq, i) => {
            const isOpen = openIndex === i;
            const panelId = `contato-faq-${i}`;
            const buttonId = `${panelId}-trigger`;

            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-gray-100 bg-white transition hover:border-gray-200"
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left text-base font-bold transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:p-6 md:text-lg"
                  >
                    {faq.question}
                    {isOpen ? (
                      <Minus className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                    ) : (
                      <Plus className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                    )}
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? '320px' : '0px' }}
                >
                  <p className="px-5 pb-5 text-paragraph text-gray-500 md:px-6 md:pb-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
