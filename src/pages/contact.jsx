import Head from 'next/head';
import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import ContactMap from '@/components/contact/ContactMap';
import ContactFAQ from '@/components/contact/ContactFAQ';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contato | RBS Consultoria Inteligente</title>
        <meta
          name="description"
          content="Fale com a RBS Consultoria Inteligente. Atendimento por WhatsApp, e-mail ou presencial em Curitiba para estruturar seu consórcio com estratégia."
        />
      </Head>
      <main className="selection:bg-accent selection:text-white">
        <ContactHero />
        <ContactForm />
        <ContactMap />
        <ContactFAQ />
      </main>
    </>
  );
}
