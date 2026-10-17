(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const menu = document.getElementById('consorcio-menu');
  let menuTrigger;
  document.querySelectorAll('[data-mobile-menu]').forEach((button) => {
    button.addEventListener('click', () => {
      menuTrigger = button;
      menu.showModal();
      button.setAttribute('aria-expanded', 'true');
      menu.querySelector('nav summary, nav a, nav button')?.focus();
    });
  });
  menu?.querySelector('[data-close-menu]').addEventListener('click', () => menu.close());
  menu?.addEventListener('close', () => { menuTrigger?.setAttribute('aria-expanded','false'); menuTrigger?.focus(); });

  // As interações exclusivas da Embracon ficam em consorcios/embracon/assets/js/embracon.js.
  document.querySelectorAll('[data-disclosure]').forEach((button) => {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    if (!panel) return;
    button.addEventListener('click', () => { panel.hidden = !panel.hidden; button.setAttribute('aria-expanded', String(!panel.hidden)); });
  });

  // As interações da Volkswagen ficam em consorcios/volkswagen/assets/js/volkswagen.js.
  document.querySelectorAll('[data-scroll-to]').forEach((button) => button.addEventListener('click', (event) => {
    event.preventDefault(); document.getElementById(button.dataset.scrollTo)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  }));
})();
