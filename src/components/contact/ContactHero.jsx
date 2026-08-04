import { Mail, MapPin, MessageCircle } from 'lucide-react';
import { EMAIL, ENDERECO, MAPS_URL, whatsappLink } from '@/lib/contato';

const CANAIS = [
  {
    icon: <MessageCircle className="h-5 w-5 text-accent" />,
    label: 'WhatsApp',
    value: 'Falar com um especialista',
    href: whatsappLink(),
    external: true,
  },
  {
    icon: <Mail className="h-5 w-5 text-accent" />,
    label: 'E-mail',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icon: <MapPin className="h-5 w-5 text-accent" />,
    label: 'Escritório',
    value: ENDERECO,
    href: MAPS_URL,
    external: true,
  },
];

export default function ContactHero() {
  return (
    <section className="bg-white px-4 pb-10 pt-28 text-primary sm:px-6 md:pb-16 md:pt-36 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        <div className="gs-reveal mb-10 md:mb-16">
          <p className="mb-4 text-paragraph uppercase text-accent">Contato</p>

          <h1 className="mb-6 max-w-3xl font-sans text-h2-m md:text-h2">
            Vamos estruturar sua <span className="text-accent">estratégia</span>
          </h1>

          <p className="max-w-2xl text-paragraph text-gray-500">
            Tem uma dúvida ou já quer começar? Fale com a nossa equipe pelo canal que preferir — o
            diagnóstico inicial é consultivo e sem compromisso.
          </p>
        </div>

        <div className="gs-reveal grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
          {CANAIS.map((item) => (
            <div
              key={item.label}
              className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-5 transition hover:border-accent/20 hover:shadow-md md:p-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10 transition group-hover:bg-accent/20">
                {item.icon}
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {item.label}
                </p>
                <a
                  href={item.href}
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="text-sm font-bold text-primary transition hover:text-accent md:text-base"
                >
                  {item.value}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
