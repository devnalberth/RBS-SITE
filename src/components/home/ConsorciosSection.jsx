import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import 'swiper/css';

const CONSORCIOS = [
  {
    title: 'Consórcio para Investimento',
    text: 'Utilização do consórcio como ferramenta de alavancagem patrimonial.',
    img: '/images/webp/home/modalide-investimentos.webp',
    alt: 'Gráfico de valorização projetado sobre a tela de um notebook',
  },
  {
    title: 'Consórcio Empresarial',
    text: 'Soluções corporativas para expandir, renovar frota ou adquirir ativos.',
    img: '/images/webp/home/modalidade-empresarial.webp',
    alt: 'Equipe reunida em escritório analisando resultados no computador',
  },
  {
    title: 'Consórcio de Imóvel',
    text: 'A modalidade mais estratégica para construção de patrimônio imobiliário sem juros bancários.',
    img: '/images/webp/home/modalidade-imoveis.webp',
    alt: 'Entrega das chaves de um imóvel recém-adquirido',
  },
  {
    title: 'Consórcio de Veículos',
    text: 'Solução inteligente para aquisição de veículos leves sem os juros do financiamento.',
    img: '/images/webp/home/modalidade-veiculos.webp',
    alt: 'Casal sorrindo dentro do carro novo',
  },
  {
    title: 'Consórcio de Pesados',
    text: 'Especializado em máquinas agrícolas, caminhões e equipamentos industriais.',
    img: '/images/webp/home/modalidade-pesados.webp',
    alt: 'Caminhão e maquinário pesado em operação',
  },
];

export default function ConsorciosSection() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const syncEdges = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section id="consorcios" className="scroll-mt-28 bg-white px-6 py-24 text-primary">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-[576px] font-serif text-h2-m md:text-h2">
            Encontre a solução <span className="block text-accent">ideal para você</span>
          </h2>

          <div className="flex shrink-0 gap-3">
            <button
              ref={prevRef}
              type="button"
              disabled={isBeginning}
              aria-label="Ver modalidade anterior"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d1d5db] transition-opacity hover:bg-light disabled:opacity-40 disabled:hover:bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              ref={nextRef}
              type="button"
              disabled={isEnd}
              aria-label="Ver próxima modalidade"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white transition-opacity hover:bg-[#bd9541] disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="pt-12">
          <Swiper
            modules={[Navigation, A11y]}
            slidesPerView="auto"
            spaceBetween={24}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            a11y={{
              containerMessage: 'Modalidades de consórcio',
              prevSlideMessage: 'Modalidade anterior',
              nextSlideMessage: 'Próxima modalidade',
              slideLabelMessage: 'Modalidade {{index}} de {{slidesLength}}',
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            onSwiper={syncEdges}
            onSlideChange={syncEdges}
            onResize={syncEdges}
            className="!overflow-hidden"
          >
            {CONSORCIOS.map((consorcio) => (
              <SwiperSlide key={consorcio.title} className="!h-[400px] !w-[300px] sm:!w-[360px]">
                <article className="relative h-[400px] overflow-hidden rounded-3xl shadow-sm">
                  <img
                    src={consorcio.img}
                    alt={consorcio.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Painel de vidro — top fixo em 240px conforme o wireframe */}
                  <div className="absolute left-6 right-6 top-[240px] rounded-xl bg-white/10 p-4">
                    <h3 className="text-xl font-bold leading-7 text-white">{consorcio.title}</h3>
                    <p className="pt-2 text-sm leading-5 text-[#e5e7eb]">{consorcio.text}</p>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
