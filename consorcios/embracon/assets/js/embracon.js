/*
 * Interações da página Embracon, reconstruídas a partir do comportamento do site original
 * (Next.js + Framer Motion + Radix), sem carregar os scripts da Embracon.
 * O formulário de atendimento fica em ../../assets/lead-form.js.
 */
(() => {
  'use strict';

  // Ativa as animações de entrada apenas quando o JavaScript está disponível.
  document.documentElement.classList.add('emb-js');

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  // Interpola um valor a partir de pontos de progresso (equivalente ao useTransform do Framer Motion).
  function interpolate(progress, input, output) {
    if (progress <= input[0]) return output[0];
    for (let i = 1; i < input.length; i++) {
      if (progress <= input[i]) {
        const t = (progress - input[i - 1]) / (input[i] - input[i - 1]);
        return output[i - 1] + (output[i] - output[i - 1]) * t;
      }
    }
    return output[output.length - 1];
  }

  /* ---------- Rolagem: topo fixo, vídeo do hero e seção da matriz ---------- */
  function initScrollEffects() {
    const nav = document.querySelector('[data-emb-nav]');
    const heroVideo = document.querySelector('[data-hero-video]');
    const history = document.querySelector('[data-history]');
    let previousY = scrollY;
    let queued = false;

    function update() {
      queued = false;
      const y = scrollY;

      if (nav) {
        nav.dataset.hasScrolled = String(y > 30);
        nav.dataset.scrollDirection = y > previousY && y > 200 ? 'down' : 'up';
      }
      previousY = y;

      if (heroVideo) {
        // offset ["start start", "end end"]: opacidade 1 → 1 → 0 em 0, 10% e 70% do percurso.
        const rect = heroVideo.getBoundingClientRect();
        const range = rect.height - innerHeight;
        const progress = range > 0 ? clamp(-rect.top / range, 0, 1) : 0;
        heroVideo.style.opacity = String(interpolate(progress, [0, .1, .7], [1, 1, 0]));
      }

      if (history) {
        // offset ["start start", "end start"]: progresso de 0 a 1 enquanto a seção atravessa o topo da tela.
        const rect = history.getBoundingClientRect();
        const progress = clamp(-rect.top / rect.height, 0, 1);
        const base = Math.max(1.66667, (innerHeight / innerWidth) * 2.9629688888888888);
        history.style.setProperty('--history-scale', interpolate(progress, [.3, .5, .66], [1.1 * base, base, 1]).toFixed(4));
        history.style.setProperty('--history-shade', interpolate(progress, [0, 1], [1, 5 / 255]).toFixed(4));
        history.style.setProperty('--history-y', `${interpolate(progress, [0, 1], [19, -26]).toFixed(2)}%`);
      }
    }

    const schedule = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    };
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    update();
  }

  /* ---------- Menus do topo (desktop) ---------- */
  function initDesktopMenus() {
    const triggers = [...document.querySelectorAll('[data-nav-trigger]')];
    const root = document.querySelector('[data-nav-root]');
    if (!triggers.length || !root) return;
    let active = null;
    let closeTimer;

    function setOpen(trigger, open) {
      const panel = document.getElementById(trigger.getAttribute('aria-controls'));
      trigger.dataset.state = open ? 'open' : 'closed';
      trigger.setAttribute('aria-expanded', String(open));
      if (panel) {
        panel.hidden = !open;
        panel.dataset.state = open ? 'open' : 'closed';
      }
    }
    function open(trigger) {
      clearTimeout(closeTimer);
      if (active && active !== trigger) setOpen(active, false);
      active = trigger;
      setOpen(trigger, true);
    }
    function close() {
      if (!active) return;
      setOpen(active, false);
      active = null;
    }

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => (active === trigger ? close() : open(trigger)));
      trigger.addEventListener('pointerenter', (event) => { if (event.pointerType === 'mouse') open(trigger); });
    });
    root.addEventListener('pointerleave', (event) => {
      if (event.pointerType === 'mouse') closeTimer = setTimeout(close, 150);
    });
    root.addEventListener('pointerenter', () => clearTimeout(closeTimer));
    document.addEventListener('click', (event) => { if (!root.contains(event.target)) close(); });
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || !active) return;
      const trigger = active;
      close();
      trigger.focus();
    });
    // Qualquer item escolhido (formulário, seção da página ou site da RBS) fecha o submenu.
    root.addEventListener('click', (event) => { if (event.target.closest('a')) close(); });
  }

  /* ---------- Menu móvel: itens que levam a uma seção desta página ---------- */
  function initMobileMenuLinks() {
    const menu = document.getElementById('consorcio-menu');
    if (!menu) return;
    menu.addEventListener('click', (event) => {
      const link = event.target.closest('a[href^="#"]:not([data-open-lead])');
      const target = link && document.getElementById(link.getAttribute('href').slice(1));
      if (!target) return;
      event.preventDefault();
      menu.close();
      // Rola depois que o diálogo fecha e devolve o foco ao botão do menu.
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
        history.replaceState(null, '', link.getAttribute('href'));
      });
    });
  }

  /* ---------- Palavra animada do título ---------- */
  function initHeroWord() {
    const word = document.querySelector('[data-hero-word]');
    if (!word || reducedMotion) return;
    const words = ['SONHOS', 'DESAFIOS', 'METAS', 'CONQUISTAS'];
    let index = 0;
    setInterval(() => {
      if (document.hidden) return;
      index = (index + 1) % words.length;
      // AnimatePresence mode="wait": a palavra atual sai (0,5 s) antes da próxima entrar.
      word.classList.add('is-leaving');
      setTimeout(() => {
        word.textContent = words[index];
        word.classList.remove('is-leaving');
        word.classList.add('is-entering');
        word.getBoundingClientRect();
        word.classList.remove('is-entering');
      }, 500);
    }, 2000);
  }

  /* ---------- Animações de entrada na rolagem ---------- */
  function initReveal() {
    const all = [...document.querySelectorAll('[data-reveal]')];
    if (reducedMotion || !('IntersectionObserver' in window)) {
      all.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    all.filter((el) => el.hasAttribute('data-reveal-index')).forEach((el) => {
      el.style.transitionDelay = `${Number(el.dataset.revealIndex) * 0.1}s`;
      el.addEventListener('transitionend', () => { el.style.transitionDelay = ''; }, { once: true });
    });

    // Elementos que animam ao montar (carrosséis), independentemente da posição na tela.
    all.filter((el) => el.hasAttribute('data-reveal-mount')).forEach((el) => {
      requestAnimationFrame(() => el.classList.add('is-visible'));
    });

    const once = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        once.unobserve(entry.target);
      });
    }, { threshold: 0.05 });

    // Frases do topo: entram e saem conforme a rolagem (viewport margin "100% 0px -300px 0px").
    const repeat = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting));
    }, { rootMargin: '100% 0px -300px 0px' });

    all.forEach((el) => {
      if (el.hasAttribute('data-reveal-mount')) return;
      (el.hasAttribute('data-reveal-repeat') ? repeat : once).observe(el);
    });
  }

  /* ---------- Carrosséis: 4 itens visíveis que avançam a cada 4 s ---------- */
  function initCarousels() {
    document.querySelectorAll('[data-carousel]').forEach((track) => {
      const template = track.querySelector('template');
      const items = template ? [...template.content.children] : [];
      if (items.length < 5 || reducedMotion) return;
      let first = 0;

      setInterval(() => {
        if (document.hidden) return;
        const slots = [...track.children].filter((el) => el.tagName !== 'TEMPLATE' && !el.dataset.leaving);
        const leaving = slots[0];
        if (!leaving) return;

        // AnimatePresence mode="popLayout": o primeiro item sai do fluxo e desaparece para a esquerda.
        leaving.dataset.leaving = 'true';
        const left = leaving.offsetLeft;
        leaving.style.position = 'absolute';
        leaving.style.margin = '0';
        leaving.style.left = `${left}px`;
        leaving.animate(
          [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateX(-50px)' }],
          { duration: 500, easing: 'ease-out', fill: 'forwards' }
        ).finished.then(() => leaving.remove());

        first = (first + 1) % items.length;
        const next = items[(first + 3) % items.length].cloneNode(true);
        next.classList.add('is-visible');
        template.before(next);
        next.animate(
          [{ opacity: 0, transform: 'translateX(50px)' }, { opacity: 1, transform: 'none' }],
          { duration: 500, delay: 300, easing: 'ease-out', fill: 'backwards' }
        );
      }, 4000);
    });
  }

  /* ---------- Vídeos do YouTube (carregados só no clique) ---------- */
  function initYouTube() {
    document.querySelectorAll('lite-youtube').forEach((player) => {
      player.addEventListener('click', () => {
        if (player.classList.contains('lyt-activated')) return;
        const iframe = document.createElement('iframe');
        iframe.title = player.getAttribute('playlabel') || 'Vídeo do YouTube';
        iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(player.getAttribute('videoid'))}?autoplay=1`;
        player.classList.add('lyt-activated');
        player.append(iframe);
        iframe.focus();
      });
    });
  }

  /* ---------- Vídeo de fundo ---------- */
  function initBackgroundVideo() {
    const video = document.querySelector('[data-hero-video] video');
    if (!video) return;
    if (reducedMotion) {
      video.removeAttribute('autoplay');
      video.pause();
      return;
    }
    video.muted = true;
    video.play().catch(() => { /* o primeiro quadro continua visível */ });
  }

  function init() {
    initScrollEffects();
    initDesktopMenus();
    initMobileMenuLinks();
    initHeroWord();
    initReveal();
    initCarousels();
    initYouTube();
    initBackgroundVideo();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
