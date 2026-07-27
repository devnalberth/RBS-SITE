import { Mail, MapPin, Phone } from 'lucide-react';

const contactInfo = [
  {
    icon: <Mail className="h-5 w-5 text-accent" />,
    label: 'Email Us',
    value: 'contactinfo@gmail.com',
    href: 'mailto:contactinfo@gmail.com',
  },
  {
    icon: <Phone className="h-5 w-5 text-accent" />,
    label: 'Call Us',
    value: '+99 1234 5478',
    href: 'tel:+9912345478',
  },
  {
    icon: <MapPin className="h-5 w-5 text-accent" />,
    label: 'Visit Us',
    value: 'Los Angeles, CA 90017 United States',
    href: null,
  },
];

export default function ContactHero() {
  return (
    <section className="px-4 pb-10 pt-28 sm:px-6 md:pb-16 md:pt-36 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        <div className="gs-reveal mb-10 md:mb-16">
          <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            Contact Us
          </span>
          <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
            Let&apos;s Start a{' '}
            <span className="font-serif-italic font-normal text-accent">Conversation</span>
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base lg:text-lg">
            Have a question or ready to get started? We&apos;d love to hear from you. Reach out and our team will get back to you within 24 hours.
          </p>
        </div>

        <div className="gs-reveal grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
          {contactInfo.map((item, i) => (
            <div
              key={i}
              className="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-5 transition hover:border-accent/20 hover:shadow-md md:p-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10 transition group-hover:bg-accent/20">
                {item.icon}
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="text-sm font-bold text-primary transition hover:text-accent md:text-base">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm font-bold text-primary md:text-base">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
