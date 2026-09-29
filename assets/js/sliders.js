(function () {
  'use strict';

  const track = document.querySelector('[data-slider-track]');
  if (!track) return;

  const amount = () => Math.min(384, track.clientWidth * 0.84);
  document.querySelector('[data-slider-prev]')?.addEventListener('click', () => {
    track.scrollBy({ left: -amount(), behavior: 'smooth' });
  });
  document.querySelector('[data-slider-next]')?.addEventListener('click', () => {
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 12;
    track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + amount(), behavior: 'smooth' });
  });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let timer = window.setInterval(() => {
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 12;
      track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + amount(), behavior: 'smooth' });
    }, 4200);
    track.addEventListener('pointerenter', () => window.clearInterval(timer));
  }
})();
