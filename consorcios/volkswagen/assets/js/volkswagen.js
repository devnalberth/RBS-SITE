/*
 * Interações da página Consórcio Jetta, reconstruídas a partir dos chunks do site oficial
 * (Next.js + framer-motion + Radix + Headless UI). O formulário de atendimento fica em
 * ../../assets/lead-form.js.
 */
(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const anyDialogOpen = () => Boolean($('dialog[open]')) || !$('[data-vw-exit]')?.hidden;
  // Mesmo critério do react-intersection-observer usado no original.
  const inView = (entry, threshold) => entry.isIntersecting && entry.intersectionRatio >= threshold;

  /* Topo: fundo ao rolar (> 200 px), rótulo "Menu" some, botão "Simule aqui" flutuante (> 400 px)
     e parallax da imagem do topo (0 → 25vh enquanto o topo sai da tela). */
  const nav = $('nav[data-scrolled]');
  const menuLabel = $('[data-vw-menu-label]');
  const floatSimulate = $('[data-vw-float-simulate]');
  const header = $('#headerComponent');
  const parallax = $('[data-vw-parallax]');
  let ticking = false;
  function onScroll() {
    ticking = false;
    const y = scrollY;
    const scrolled = y > 200;
    nav.dataset.scrolled = String(scrolled);
    menuLabel.classList.toggle('invisible', scrolled);
    menuLabel.classList.toggle('-translate-x-5', scrolled);
    menuLabel.classList.toggle('opacity-0', scrolled);
    menuLabel.classList.toggle('-translate-x-0', !scrolled);
    menuLabel.classList.toggle('opacity-100', !scrolled);
    floatSimulate.classList.toggle('hidden', y <= 400);
    floatSimulate.classList.toggle('flex', y > 400);
    if (!reduced) {
      const top = header.offsetTop;
      const progress = Math.min(Math.max((y - top) / header.offsetHeight, 0), 1);
      parallax.style.setProperty('--vw-parallax', `${progress * 25}vh`);
    }
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* Vídeo do Jetta (assets/video): inserido quando a área entra na tela, como no original.
     Se o arquivo não carregar, a área mostra uma foto do Jetta. */
  const videoBox = $('[data-vw-video]');
  if (videoBox && 'IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      videoObserver.disconnect();
      const video = document.createElement('video');
      Object.assign(video, { muted: true, loop: true, playsInline: true, controls: true, preload: 'metadata', autoplay: !reduced });
      video.className = 'h-full w-full animate-appear object-cover opacity-0';
      video.title = videoBox.dataset.vwVideoTitle;
      video.addEventListener('error', () => {
        const img = document.createElement('img');
        img.className = 'vw-img-fill object-cover';
        img.alt = 'Foto do Jetta';
        img.src = videoBox.dataset.vwVideoFallback;
        video.replaceWith(img);
      });
      video.src = videoBox.dataset.vwVideo;
      videoBox.append(video);
    });
    videoObserver.observe(videoBox);
  }

  /* "Consórcio Jetta — Consulte nossos planos": o carro desliza quando metade do bloco aparece. */
  const slide = $('[data-vw-slide]');
  if (slide && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      slide.classList.toggle('translate-x-0', inView(entry, 0.5));
      slide.classList.toggle('translate-x-36', !inView(entry, 0.5));
    }, { threshold: 0.5 }).observe(slide.closest('[data-vw-slide-trigger]'));
  }

  /* Imagens fixas ao lado das vantagens: a primeira aparece quando o texto está inteiro na
     área ampliada (mesmos threshold e rootMargin do original). */
  const fade = $('[data-vw-crossfade]');
  const fadeTrigger = $('[data-vw-crossfade-trigger]');
  if (fade && fadeTrigger && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      fade.classList.toggle('opacity-100', inView(entry, 1));
      fade.classList.toggle('opacity-0', !inView(entry, 1));
    }, { threshold: 1, rootMargin: '200% 0px 20% 0px' }).observe(fadeTrigger);
  }

  /* Menu lateral com submenus (Carros, Caminhões, Central de Ajuda, Informações Legais). */
  const menu = $('#consorcio-menu');
  const menuButton = $('[data-mobile-menu]');
  let closeTimer;
  function closeSubmenus() {
    $$('[data-vw-subpanel]', menu).forEach((panel) => { panel.classList.remove('is-open'); panel.hidden = true; });
    $$('[data-vw-submenu]', menu).forEach((button) => button.setAttribute('aria-expanded', 'false'));
  }
  function openMenu() {
    clearTimeout(closeTimer);
    closeSubmenus();
    menu.showModal();
    menuButton.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => menu.classList.add('is-open'));
    $('[data-close-menu]', menu).focus();
  }
  function closeMenu() {
    menu.classList.remove('is-open');
    closeTimer = setTimeout(() => { if (menu.open) menu.close(); }, reduced ? 0 : 400);
  }
  menuButton.addEventListener('click', openMenu);
  $('[data-close-menu]', menu).addEventListener('click', closeMenu);
  menu.addEventListener('click', (event) => { if (event.target === menu) closeMenu(); });
  menu.addEventListener('cancel', (event) => {
    event.preventDefault();
    const sub = $('[data-vw-subpanel].is-open', menu);
    if (sub) closeSubmenu(sub); else closeMenu();
  });
  menu.addEventListener('close', () => {
    menu.classList.remove('is-open');
    closeSubmenus();
    menuButton.setAttribute('aria-expanded', 'false');
    // Ao abrir o formulário a partir do menu, o foco fica no formulário.
    if (!$('dialog[open]')) menuButton.focus();
  });
  function closeSubmenu(panel) {
    panel.classList.remove('is-open');
    const button = $(`[aria-controls="${panel.id}"]`, menu);
    button.setAttribute('aria-expanded', 'false');
    setTimeout(() => { panel.hidden = true; }, reduced ? 0 : 400);
    button.focus();
  }
  $$('[data-vw-submenu]', menu).forEach((button) => {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    button.addEventListener('click', () => {
      closeSubmenus();
      panel.hidden = false;
      button.setAttribute('aria-expanded', 'true');
      requestAnimationFrame(() => panel.classList.add('is-open'));
      $('[data-vw-submenu-back]', panel).focus({ preventScroll: true });
    });
    $('[data-vw-submenu-back]', panel).addEventListener('click', () => closeSubmenu(panel));
  });
  // O submenu passa da borda da gaveta (overflow-hidden), como no original; o foco por teclado
  // não pode rolar a gaveta para o lado.
  const drawer = $('[data-vw-drawer]', menu);
  drawer.addEventListener('scroll', () => { if (drawer.scrollLeft) drawer.scrollLeft = 0; });
  // Clique na gaveta, fora do submenu aberto, fecha o submenu (onInteractOutside do original).
  drawer.addEventListener('click', (event) => {
    const sub = $('[data-vw-subpanel].is-open', menu);
    if (sub && !sub.contains(event.target) && !event.target.closest('[data-vw-submenu]')) closeSubmenu(sub);
  });

  /* Rodapé: grupos abertos por padrão; o título recolhe e expande a lista. */
  $$('[data-vw-disclosure]').forEach((button) => {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    const icon = $('svg', button);
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      [button, panel].forEach((el) => { el.dataset.headlessuiState = open ? 'open' : ''; });
      panel.classList.toggle('is-closed', !open);
      icon.classList.toggle('-rotate-180', open);
    });
  });
  $$('[data-vw-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });

  /* Botão "Acessibilidade em libras": o original carrega o Hand Talk com o token da Volkswagen.
     Aqui o clique carrega o VLibras (governo federal) e o botão dele assume o lugar deste. */
  const libras = $('[data-vw-libras]');
  const librasLabel = $('[data-vw-libras-label]');
  const librasButton = $('#hand-talk-button');
  function showLibrasLabel(show) {
    librasButton.classList.toggle('rounded-bl-none', show);
    if (show) {
      librasLabel.hidden = false;
      librasLabel.classList.add('is-entering');
      requestAnimationFrame(() => librasLabel.classList.remove('is-entering'));
    } else librasLabel.hidden = true;
  }
  librasButton.addEventListener('mouseenter', () => showLibrasLabel(true));
  librasButton.addEventListener('mouseleave', () => showLibrasLabel(false));
  librasButton.addEventListener('focus', () => showLibrasLabel(true));
  librasButton.addEventListener('blur', () => showLibrasLabel(false));
  librasButton.addEventListener('click', () => {
    if (window.VLibrasWidget?.open) { window.VLibrasWidget.open(); return; }
    librasButton.disabled = true;
    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.onload = () => {
      new window.VLibras.Widget('https://vlibras.gov.br/app');
      window.VLibrasWidget.open();
      libras.remove();
    };
    script.onerror = () => { librasButton.disabled = false; };
    document.body.append(script);
  });

  /* Pop-up de saída: no computador, quando o cursor sai da página; até 1024 px, quando o
     visitante volta a rolar para cima depois de 10% da página. Depois de fechado, volta em 24 h. */
  const exit = $('[data-vw-exit]');
  const exitKey = 'rbsVwExitPopup';
  let maxProgress = 0;
  let exitFocus;
  function exitSnoozed() {
    try { return Date.now() < JSON.parse(localStorage.getItem(exitKey))?.expiry; } catch { return false; }
  }
  function showExit() {
    if (!exit.hidden || exitSnoozed() || anyDialogOpen()) return;
    exitFocus = document.activeElement;
    exit.hidden = false;
    document.documentElement.classList.add('consorcio-modal-open');
    $('[data-vw-exit-close]', exit).focus();
  }
  function snoozeExit() {
    exit.hidden = true;
    document.documentElement.classList.remove('consorcio-modal-open');
    try { if (!localStorage.getItem(exitKey)) localStorage.setItem(exitKey, JSON.stringify({ time: new Date(), expiry: Date.now() + 24 * 36e5 })); } catch { /* armazenamento indisponível */ }
  }
  function hideExit() {
    snoozeExit();
    exitFocus?.focus?.({ preventScroll: true });
  }
  document.documentElement.addEventListener('mouseleave', showExit);
  addEventListener('scroll', () => {
    if (innerWidth > 1024) return;
    const progress = scrollY / Math.max(document.documentElement.scrollHeight - innerHeight, 1);
    if (progress >= 0.1 && progress >= maxProgress) maxProgress = progress;
    if (maxProgress && progress <= maxProgress - 0.024) showExit();
  }, { passive: true });
  $('[data-vw-exit-close]', exit).addEventListener('click', hideExit);
  exit.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') hideExit();
    if (event.key === 'Tab') {
      const items = $$('button, a[href]', exit);
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  // O "Simule aqui" do pop-up abre o formulário da RBS (lead-form.js).
  $('[data-open-lead]', exit).addEventListener('click', snoozeExit);
})();
