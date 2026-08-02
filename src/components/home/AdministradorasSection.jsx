import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const ADMINISTRADORAS = [
  {
    name: 'Consórcio Embracon',
    file: 'embracon',
    logo: 'h-[190px]',
    text: 'A maior administradora de consórcios do Brasil. Tradição, solidez e excelência.',
  },
  {
    name: 'Consórcio Volkswagen',
    file: 'volkswagen',
    logo: 'h-[200px]',
    text: 'A escolha inteligente para realizar seus planos com segurança e eficiência.',
  },
  {
    name: 'Bradesco Consórcios',
    file: 'bradesco',
    logo: 'h-[142px]',
    text: 'A solidez do Bradesco com a flexibilidade e vantagens do consórcio.',
  },
];

export default function AdministradorasSection() {
  return (
    <section id="administradoras" className="scroll-mt-28 bg-white px-6 py-24 text-primary">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5">
        <p className="text-center text-paragraph uppercase text-accent">Representação Master</p>

        <h2 className="max-w-[900px] text-center font-serif text-2xl leading-[1.1] tracking-[-0.9px] md:text-[36px]">
          Trabalhamos com as melhores administradoras do mercado.
        </h2>

        <div className="w-full pt-6">
          <Swiper
            modules={[Pagination, A11y]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            pagination={{ clickable: true, el: '.adm-dots' }}
            a11y={{ containerMessage: 'Administradoras parceiras' }}
            className="!px-1 !pb-2"
          >
            {ADMINISTRADORAS.map((item) => (
              <SwiperSlide key={item.file} className="!h-auto">
                <article className="flex h-full min-h-[258px] flex-col items-center justify-between gap-4 rounded-[14px] border-[0.5px] border-primary bg-white px-[30px] py-5">
                  <div className="flex h-[120px] w-full items-center justify-center overflow-hidden">
                    <img
                      src={`/images/webp/administradoras/${item.file}.webp`}
                      alt={item.name}
                      loading="lazy"
                      className={`w-auto max-w-none ${item.logo}`}
                    />
                  </div>

                  <p className="text-center text-paragraph">{item.text}</p>

                  <a
                    href="/contact"
                    className="group inline-flex items-center gap-1 text-paragraph text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    Saiba mais
                    <img
                      src="/icons/arrowright.svg"
                      alt=""
                      aria-hidden="true"
                      width={14}
                      height={14}
                      className="block transition-transform group-hover:translate-x-1"
                      style={{ width: 14, height: 14 }}
                    />
                  </a>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="adm-dots flex justify-center gap-2" />
      </div>
    </section>
  );
}
