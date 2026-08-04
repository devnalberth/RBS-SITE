import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let lenis;

    import('@studio-freight/lenis')
      .then(({ default: Lenis }) => {
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smooth: true,
          mouseMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
          infinite: false,
        });

        // Exposto para que a Navbar consiga rolar ate as ancoras sem brigar
        // com o scroll suave do Lenis.
        window.__lenis = lenis;

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
      })
      .catch(() => {});

    // Respeita "reduzir movimento": mostra o conteudo sem animar, em vez de
    // deixa-lo em opacity 0 esperando um ScrollTrigger que nunca vai rodar.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const revealElements = document.querySelectorAll('.gs-reveal');
    const staggerGroups = document.querySelectorAll('.gs-stagger');
    const staggerChildren = [...staggerGroups].flatMap((group) => [...group.children]);

    if (prefersReducedMotion) {
      gsap.set([...revealElements, ...staggerChildren], {
        y: 0,
        opacity: 1,
        clearProps: 'transform',
      });
      return () => {
        if (lenis) lenis.destroy();
        delete window.__lenis;
      };
    }

    const trigger = (elem) => ({
      trigger: elem,
      start: 'top 85%',
      toggleActions: 'play none none none',
    });

    revealElements.forEach((elem) => {
      gsap.fromTo(
        elem,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: trigger(elem),
        }
      );
    });

    // Entrada em cascata: os filhos diretos do container entram em sequencia.
    staggerGroups.forEach((group) => {
      gsap.fromTo(
        group.children,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: trigger(group),
        }
      );
    });

    return () => {
      if (lenis) lenis.destroy();
      delete window.__lenis;
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
