import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

const caseStudies = [
  {
    img: '/images/webp/case-1-optimized.webp',
    title: 'Digital Transformation with Streamlined Operations',
    desc: 'Modernizing legacy systems to boost team efficiency and cut costs significantly.',
  },
  {
    img: '/images/webp/case-2-optimized.webp',
    title: 'Optimizing Workflow for Higher Profits',
    desc: "Expanding Harper & Co's retail presence with data-driven strategies for sustainable growth.",
  },
  {
    img: '/images/webp/case-3-optimized.webp',
    title: 'Driving Growth Through Market Expansion',
    desc: 'Successfully penetrating the Asia-Pacific market within 6 months.',
  },
  {
    img: '/images/webp/case-4-optimized.webp',
    title: 'Streamlining Operations for Scalable Growth',
    desc: 'Managing HR and logistics across borders seamlessly.',
  },
  {
    img: '/images/webp/case-1-optimized.webp',
    title: 'Digital Transformation with Streamlined Operations',
    desc: 'Modernizing legacy systems to boost team efficiency and cut costs significantly.',
  },
  {
    img: '/images/webp/case-2-optimized.webp',
    title: 'Optimizing Workflow for Higher Profits',
    desc: "Expanding Harper & Co's retail presence with data-driven strategies for sustainable growth.",
  },
  {
    img: '/images/webp/case-3-optimized.webp',
    title: 'Driving Growth Through Market Expansion',
    desc: 'Successfully penetrating the Asia-Pacific market within 6 months.',
  },
  {
    img: '/images/webp/case-4-optimized.webp',
    title: 'Streamlining Operations for Scalable Growth',
    desc: 'Managing HR and logistics across borders seamlessly.',
  },
];

export default function CaseStudiesSection() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-50 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gs-reveal px-2 lg:px-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-xl leading-tight">
            How We Helped Clients Grow <span className="font-serif-italic text-accent">Smarter</span>
          </h2>
          <div className="flex gap-2 md:gap-3 mt-4 md:mt-0">
            <button
              ref={prevRef}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-300 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              ref={nextRef}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent text-white flex items-center justify-center hover:bg-primary transition"
            >
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        <div className="px-2 lg:px-10">
          <Swiper
            modules={[Navigation, FreeMode]}
            loop={true}
            freeMode={{ enabled: true, sticky: true }}
            grabCursor={true}
            speed={600}
            spaceBetween={16}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 16 },
              768: { slidesPerView: 2.5, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 3.5, spaceBetween: 24 },
            }}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
          >
            {caseStudies.map((cs, i) => (
              <SwiperSlide key={i}>
                <div className="relative group rounded-2xl md:rounded-3xl overflow-hidden shadow-sm">
                  <img
                    src={cs.img}
                    alt={cs.title}
                    className="w-full h-[300px] md:h-[400px] object-cover transition transform group-hover:scale-105 duration-700"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-white/10 backdrop-blur p-3 md:p-4 rounded-xl text-white">
                    <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 leading-snug">{cs.title}</h3>
                    <p className="text-xs md:text-sm line-clamp-2 text-gray-200">{cs.desc}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
