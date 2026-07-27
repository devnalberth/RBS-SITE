import Head from 'next/head';
import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import ContactMap from '@/components/contact/ContactMap';
import ContactFAQ from '@/components/contact/ContactFAQ';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us - Empower | Get In Touch</title>
        <meta
          name="description"
          content="Get in touch with Empower. Send us a message, call us, or visit our Los Angeles office. We respond within 24 hours."
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
