(function () {
  'use strict';

  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');

  function setMenu(open) {
    if (!menuToggle || !mobileNav) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    mobileNav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  }

  menuToggle?.addEventListener('click', () => {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  mobileNav?.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  function syncHeader() {
    header?.classList.toggle('is-scrolled', window.scrollY > 40);
  }

  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach((element) => observer.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add('is-visible'));
  }

  if (document.body.dataset.page === 'home' && 'IntersectionObserver' in window) {
    const sectionLinks = Array.from(document.querySelectorAll('[data-section-link]'));
    const sections = sectionLinks
      .map((link) => document.getElementById(link.dataset.sectionLink))
      .filter(Boolean);
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.sectionLink === entry.target.id));
      });
    }, { rootMargin: '-42% 0px -52% 0px' });
    sections.forEach((section) => sectionObserver.observe(section));
  }
})();
