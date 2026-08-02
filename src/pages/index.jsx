import Head from "next/head";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import MetodoSection from "@/components/home/MetodoSection";
import ConsorciosSection from "@/components/home/ConsorciosSection";
import InteligenciaSection from "@/components/home/InteligenciaSection";
import AdministradorasSection from "@/components/home/AdministradorasSection";
import ResultadosSection from "@/components/home/ResultadosSection";
import SobreSection from "@/components/home/SobreSection";
import FaqSection from "@/components/home/FaqSection";
import CtaSection from "@/components/home/CtaSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>RBS Consultoria Inteligente | Consórcio com estratégia</title>
        <meta
          name="description"
          content="Consultoria estratégica em consórcios para construção de patrimônio: diagnóstico, escolha do grupo, estratégia de lance e acompanhamento até a contemplação."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="selection:bg-accent selection:text-white">
        {/* 01 */} <HeroSection />
        {/* 02 */} <AdministradorasSection />
        {/* 03 */} <ServicesSection />
        {/* 04 */} <MetodoSection />
        {/* 05 */} <ConsorciosSection />
        {/* 06 */} <InteligenciaSection />
        {/* 07 */} <ResultadosSection />
        {/* 08 */} <SobreSection />
        {/* 09 */} <FaqSection />
        {/* 10 */} <CtaSection />
      </main>
    </>
  );
}
