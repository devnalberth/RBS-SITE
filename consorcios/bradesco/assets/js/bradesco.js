/*
 * Interações da página Bradesco Consórcios.
 * Adaptado de consorcios.js, footer/index.js e carrossel.js do site oficial, sem rastreamento,
 * login ou formulários do Bradesco. As ações vêm de atributos data-* (o original usava onclick).
 * O formulário de atendimento da RBS fica em ../../assets/lead-form.js.
 */
(($) => {
  'use strict';

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollDuration = reducedMotion ? 0 : 600;

  /* ---------- Rolagem suave (scrollById / scrollEl / toTop do original) ---------- */
  function scrollToTarget(selector) {
    let target = selector;
    // Em telas menores, "O que é consórcio?" leva para a versão em abas.
    if (selector === '#id-entenda' && window.innerWidth <= 992) target = '#id-entenda-mobile';
    const $el = $(target);
    if (!$el.length) return;
    document.querySelector('.custom-navbar')?.classList.remove('open');
    setTimeout(() => {
      $('html, body').animate({ scrollTop: $el.offset().top - 120 }, scrollDuration);
    }, 200);
  }

  $(document).on('click', '[data-scroll-to]', function (event) {
    event.preventDefault();
    scrollToTarget(this.dataset.scrollTo);
  });
  $(document).on('click', '[data-to-top]', (event) => {
    event.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, scrollDuration);
  });
  $(document).on('click', '[data-nav-toggle]', () => {
    document.querySelector('.custom-navbar')?.classList.toggle('open');
  });
  // Ao abrir o formulário pelo menu móvel, fecha o menu.
  $(document).on('click', '.custom-navbar [data-open-lead]', () => {
    document.querySelector('.custom-navbar')?.classList.remove('open');
  });

  /* ---------- Perguntas frequentes ---------- */
  // expansivel(): abre/fecha um item e fecha o anterior (o original usa uma referência única para tudo).
  let questionOpened = null;
  $(document).on('click', '[data-expand]', function () {
    if (questionOpened && questionOpened !== this) questionOpened.classList.remove('open');
    this.classList.toggle('open');
    questionOpened = this;
  });

  // Collapse do Bootstrap 4 (data-toggle="collapse" + data-parent), com a mesma animação de altura.
  function showCollapse(panel) {
    if (panel.classList.contains('show')) return;
    if (reducedMotion) { panel.classList.add('show'); return; }
    panel.classList.remove('collapse');
    panel.classList.add('collapsing');
    panel.style.height = '0px';
    panel.getBoundingClientRect();
    panel.style.height = `${panel.scrollHeight}px`;
    panel.addEventListener('transitionend', function done() {
      panel.removeEventListener('transitionend', done);
      panel.classList.remove('collapsing');
      panel.classList.add('collapse', 'show');
      panel.style.height = '';
    });
  }
  function hideCollapse(panel) {
    if (!panel.classList.contains('show')) return;
    if (reducedMotion) { panel.classList.remove('show'); return; }
    panel.style.height = `${panel.getBoundingClientRect().height}px`;
    panel.getBoundingClientRect();
    panel.classList.add('collapsing');
    panel.classList.remove('collapse', 'show');
    panel.style.height = '0px';
    panel.addEventListener('transitionend', function done() {
      panel.removeEventListener('transitionend', done);
      panel.classList.remove('collapsing');
      panel.classList.add('collapse');
      panel.style.height = '';
    });
  }
  $(document).on('click', '[data-toggle="collapse"]', function (event) {
    event.preventDefault();
    const id = (this.getAttribute('href') || this.dataset.target || '').replace(/^#/, '');
    const panel = document.getElementById(id);
    if (!panel) return;
    const opening = !panel.classList.contains('show');
    const parent = panel.dataset.parent && document.querySelector(panel.dataset.parent);
    if (opening && parent) {
      parent.querySelectorAll('.collapse.show').forEach((other) => {
        if (other === panel) return;
        hideCollapse(other);
        document.querySelector(`[data-toggle="collapse"][href="#${other.id}"]`)?.setAttribute('aria-expanded', 'false');
      });
    }
    (opening ? showCollapse : hideCollapse)(panel);
    this.setAttribute('aria-expanded', String(opening));
  });

  /* ---------- Abas "Entenda / Etapa / Contemplação" (versão móvel) ---------- */
  $(document).on('click', '[data-tab]', function () {
    $(this).parent().children().removeClass('open');
    this.classList.add('open');
    const $content = $(`#${this.dataset.tab}`);
    $content.parent().children().removeClass('open');
    $content.addClass('open');
    setTimeout(() => window.AOS?.refreshHard(), 300);
  });

  /* ---------- "Veja o que mais você pode comprar" ---------- */
  // O original troca os textos de Aeronaves e Ônibus; aqui cada card mostra o próprio texto.
  const planos = {
    'Embarcações': 'Com o crédito desta opção, você pode comprar iates, veleiros ou lanchas. Disponível apenas para embarcações 0 km.',
    'Aeronaves': 'Na Bradesco Consórcios, você pode sonhar alto. Se pretende comprar helicópteros, jatos executivos e aeronaves leves, esta é a opção ideal pra você.',
    'Ônibus': 'Contrate o Consórcio Bradesco pra comprar ônibus, micro-ônibus ou renovar a frota e garanta que sua empresa faça viagens com mais tranquilidade.',
  };
  function selectPlano(index) {
    const $cards = $('.planos .card-plano');
    const card = $cards.get(index);
    if (!card) return;
    $cards.removeClass('selected');
    card.classList.add('selected');
    $('.planos .descr-bottom').text(planos[card.title] || '');
    $('.planos .slick-dots li').removeClass('slick-active').eq(index).addClass('slick-active');
  }
  $(document).on('click', '[data-plano]', function () {
    selectPlano($('.planos .card-plano').index(this));
  });

  /* ---------- Carrosséis Slick (mesmas opções e larguras do original) ---------- */
  const carousels = [
    { selector: '.carrossel-cards', active: (w) => w < 361, options: { variableWidth: true } },
    { selector: '.facilidades .contents .carrossel', active: (w) => w <= 768, options: {} },
    { selector: '.planos .content .carrossel', active: (w) => w <= 1024, options: { variableWidth: true, arrows: false } },
    { selector: '.simule .bg .content .carrossel', active: (w) => w <= 1024, options: { variableWidth: true, arrows: false } },
  ];
  const base = { accessibility: true, infinite: false, slidesToShow: 1, slidesToScroll: 1, dots: true, mobileFirst: true, useTransform: false };

  function syncCarousels() {
    const width = window.innerWidth;
    carousels.forEach((c) => {
      const $el = $(c.selector);
      const on = $el.hasClass('slick-initialized');
      if (c.active(width) && !on) $el.slick({ ...base, ...c.options });
      else if (!c.active(width) && on) $el.slick('unslick');
      else if (on) $el.slick('setPosition');
    });
    $('.entenda .contents .carrossel').slick('setPosition');
  }

  function initEntenda() {
    const $carousel = $('.entenda .contents .carrossel');
    const $controls = $('.entenda .contents .slick-dots-custom');
    $carousel.slick({ ...base, centerMode: true, centerPadding: 0, adaptiveHeight: true, appendDots: $controls, appendArrows: $controls });
    $controls.find('.slick-prev').hide();
    $carousel.on('beforeChange', (event, slick, current, next) => {
      $controls.find('.slick-prev').toggle(next !== 0);
      $('.buttom-item1').toggle(next === 0);
      $controls.find('.slick-next').toggle(next + 1 !== slick.slideCount);
    });
    $('.entenda-mobile .tab-contents #c-etapa .content .carrossel').slick({ ...base, variableWidth: true, arrows: false, centerMode: true });
  }

  /* ---------- Rodapé (footer/index.js do original) ---------- */
  function initFooter() {
    const items = [...document.querySelectorAll('.c-footer .js-collapse')];
    const contents = [...document.querySelectorAll('.c-footer .js-content')];
    items.forEach((item) => item.addEventListener('click', (event) => {
      event.preventDefault();
      const content = item.nextElementSibling;
      const wasOpen = content.classList.contains('is-open') && !content.classList.contains('is-closed');
      items.forEach((i) => { i.classList.remove('is-active'); i.setAttribute('aria-expanded', 'false'); });
      contents.forEach((c) => { c.classList.remove('is-open', 'a-fadeIn'); c.classList.add('is-closed'); });
      if (!wasOpen) {
        content.classList.remove('is-closed');
        content.classList.add('is-open', 'a-fadeIn');
        item.classList.add('is-active');
        item.setAttribute('aria-expanded', 'true');
      }
    }));
  }

  /* ---------- Banner (carrossel.js do original) ---------- */
  function initBanner() {
    if (!window.Swiper || !document.querySelector('[data-banner-swiper]')) return;
    // eslint-disable-next-line no-new
    new window.Swiper('[data-banner-swiper]', {
      loop: true,
      autoplay: reducedMotion ? false : { delay: 9000, disableOnInteraction: false },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: (index, className) => `<span class="${className}"></span>`,
      },
    });
  }

  $(() => {
    initBanner();
    initFooter();
    if (window.AOS) {
      window.AOS.init({ disable: reducedMotion });
      setTimeout(() => window.AOS.refreshHard(), 1000);
    }
    initEntenda();
    syncCarousels();
    // O original mantém o primeiro plano selecionado e sincroniza o texto ao arrastar o carrossel (telas menores).
    $('.planos .content .carrossel').on('afterChange', (event, slick, current) => selectPlano(current));
    let resizeTimer;
    $(window).on('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(syncCarousels, 150);
    });
  });
})(window.jQuery);
