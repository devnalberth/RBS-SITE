import Head from 'next/head';
import ContempladasCatalog from '@/components/contempladas/ContempladasCatalog';

export default function Contempladas() {
  return (
    <>
      <Head>
        <title>Cartas Contempladas | RBS Consultoria Inteligente</title>
        <meta
          name="description"
          content="Consulte cartas contempladas disponíveis, compare crédito, entrada, prazo e parcelas e monte sua proposta com a RBS Consultoria Inteligente."
        />
      </Head>
      <ContempladasCatalog />
    </>
  );
}
