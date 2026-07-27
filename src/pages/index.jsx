import Head from "next/head";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import MetodoSection from "@/components/home/MetodoSection";
import ConsorciosSection from "@/components/home/ConsorciosSection";
import AdministradorasSection from "@/components/home/AdministradorasSection";
import ResultadosSection from "@/components/home/ResultadosSection";
import SobreSection from "@/components/home/SobreSection";
import FaqSection from "@/components/home/FaqSection";
import CtaSection from "@/components/home/CtaSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>Empower - Business Consulting & Training</title>
        <meta name="description" content="Expert strategic consulting to drive sustainable growth, operational innovation, and lasting business transformation." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="selection:bg-accent selection:text-white">
        {/* 01 */} <HeroSection />
        {/* 02 */} <ServicesSection />
        {/* 03 */} <MetodoSection />
        {/* 04 */} <ConsorciosSection />
        {/* 05 */} <AdministradorasSection />
        {/* 06 */} <ResultadosSection />
        {/* 07 */} <SobreSection />
        {/* 08 */} <FaqSection />
        {/* 09 */} <CtaSection />
      </main>
    </>
  );
}
