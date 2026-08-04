import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '@/lib/contato';

const MODALIDADES = [
  'Consórcio de Imóvel',
  'Consórcio de Veículos',
  'Consórcio de Pesados',
  'Consórcio Empresarial',
  'Consórcio para Investimento',
  'Quero ser um Parceiro RBS',
];

const CAMPOS = [
  ['nome', 'Nome'],
  ['sobrenome', 'Sobrenome'],
  ['email', 'E-mail'],
  ['telefone', 'Telefone'],
  ['interesse', 'Interesse'],
  ['mensagem', 'Mensagem'],
];

export default function ContactForm() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const nome = [data.get('nome'), data.get('sobrenome')].filter(Boolean).join(' ').trim();

    const linhas = CAMPOS.filter(([campo]) => campo !== 'nome' && campo !== 'sobrenome')
      .map(([campo, rotulo]) => {
        const valor = String(data.get(campo) || '').trim();
        return valor ? `*${rotulo}:* ${valor}` : null;
      })
      .filter(Boolean);

    const texto = [
      `Olá! Vim pelo site da RBS.`,
      '',
      nome ? `*Nome:* ${nome}` : null,
      ...linhas,
    ]
      .filter((linha) => linha !== null)
      .join('\n');

    window.open(whatsappLink(texto), '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="bg-white px-6 py-16 text-primary md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="gs-reveal grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="mb-2 font-sans text-h2-m md:text-h2">
              Envie sua <span className="text-accent">mensagem</span>
            </h2>
            <p className="mb-8 text-paragraph text-gray-500 md:mb-10">
              Preencha os campos abaixo e o WhatsApp abre com tudo pronto — você só confere e envia.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
                <div>
                  <label
                    htmlFor="nome"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400"
                  >
                    Nome
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    required
                    autoComplete="given-name"
                    placeholder="Seu nome"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-accent focus:bg-white md:text-base"
                  />
                </div>
                <div>
                  <label
                    htmlFor="sobrenome"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400"
                  >
                    Sobrenome
                  </label>
                  <input
                    id="sobrenome"
                    name="sobrenome"
                    type="text"
                    autoComplete="family-name"
                    placeholder="Seu sobrenome"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-accent focus:bg-white md:text-base"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="seu@email.com.br"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-accent focus:bg-white md:text-base"
                />
              </div>

              <div>
                <label
                  htmlFor="telefone"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400"
                >
                  Telefone
                </label>
                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(41) 90000-0000"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-accent focus:bg-white md:text-base"
                />
              </div>

              <div>
                <label
                  htmlFor="interesse"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400"
                >
                  Tenho interesse em
                </label>
                <select
                  id="interesse"
                  name="interesse"
                  required
                  defaultValue=""
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 outline-none transition focus:border-accent focus:bg-white md:text-base"
                >
                  <option value="" disabled>
                    Selecione uma opção
                  </option>
                  {MODALIDADES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="mensagem"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400"
                >
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={5}
                  placeholder="Conte seu objetivo e o momento em que você está."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-accent focus:bg-white md:text-base"
                />
              </div>

              <button
                type="submit"
                className="group inline-flex items-center gap-5 rounded-full bg-accent py-3 pl-6 pr-3 text-sm font-bold text-white transition hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Enviar pelo WhatsApp
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-accent transition group-hover:text-primary">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>

              <p className="text-xs leading-5 text-gray-400">
                Ao enviar, o WhatsApp abre em uma nova aba com a mensagem já escrita.
              </p>
            </form>
          </div>

          <div className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-3xl">
              <img
                src="/images/webp/ctaimage.webp"
                alt="Aperto de mãos selando uma parceria com a RBS"
                loading="lazy"
                className="h-[250px] w-full object-cover sm:h-[300px] lg:h-[350px]"
              />
            </div>

            <div className="relative flex flex-1 flex-col justify-center overflow-hidden rounded-3xl bg-primary p-8 text-white md:p-10">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />

              <h3 className="relative mb-3 font-sans text-h3-m md:text-h3">Prefere falar agora?</h3>
              <p className="relative mb-8 text-paragraph text-white/70">
                Se preferir pular o formulário, chame direto no WhatsApp. Você fala com a equipe e já
                sai do primeiro contato com uma orientação sobre o seu caso.
              </p>

              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-4 self-start rounded-full bg-accent py-3 pl-6 pr-3 text-sm font-bold text-white transition-colors hover:bg-[#bd9541] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Chamar no WhatsApp
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-accent">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
