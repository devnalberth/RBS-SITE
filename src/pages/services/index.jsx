import Head from 'next/head';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesOverview from '@/components/services/ServicesOverview';
import ServicesProcess from '@/components/services/ServicesProcess';
import ServicesPricing from '@/components/services/ServicesPricing';
import ServicesCTA from '@/components/services/ServicesCTA';

export default function Services() {
  return (
    <>
      <Head>
        <title>Services - Empower | Strategic Consulting Solutions</title>
        <meta
          name="description"
          content="Explore our full suite of strategic consulting services — from wealth finance and risk assessment to growth planning and operational excellence."
        />
      </Head>
      <main className="selection:bg-accent selection:text-white">
        <ServicesHero />
        <ServicesOverview />
        <ServicesProcess />
        <ServicesPricing />
        <ServicesCTA />
      </main>
    </>
  );
}
