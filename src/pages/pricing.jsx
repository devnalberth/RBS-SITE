import Head from 'next/head';
import PricingHero from '@/components/pricing/PricingHero';
import PricingCompare from '@/components/pricing/PricingCompare';
import PricingFAQ from '@/components/pricing/PricingFAQ';
import PricingCTA from '@/components/pricing/PricingCTA';

export default function Pricing() {
  return (
    <>
      <Head>
        <title>Pricing - Empower | Transparent Consulting Plans</title>
        <meta
          name="description"
          content="Simple, transparent pricing for strategic consulting. Choose from Starter, Growth, or Enterprise plans to match your business needs."
        />
      </Head>
      <main className="selection:bg-accent selection:text-white">
        <PricingHero />
        <PricingCompare />
        <PricingFAQ />
        <PricingCTA />
      </main>
    </>
  );
}
