/* ==========================================================================
   RBS Consultoria Inteligente — main.js
   Sem dependências. Edite apenas o bloco CONFIG.
   ========================================================================== */

const CONFIG = {
  // WhatsApp oficial de parcerias: DDI + DDD + número, só dígitos (ex.: 5582999999999)
  whatsapp: '5511989864178',
  // E-mail que recebe a documentação
  email: 'credenciamento@rbsconsultoriainteligente.com.br',
  // Endpoint que registra o lead e envia o e-mail antes de abrir o WhatsApp.
  // Hostinger/PHP: 'api/credenciamento.php' (relativo à raiz do site). Vazio = só WhatsApp.
  formEndpoint: 'api/credenciamento.php',
  // Link da Roma Capital (consumidor final)
  romaCapitalUrl: '#',
  // Validação da certificação PCA-10. Ideal: o link do badge do Rodrigo na Brasil Open Badge.
  // Enquanto isso, a consulta pública de certificados da ABAC (busca por nome ou CPF).
  pcaValidationUrl: 'https://moodle.abac.kaptiva.com.br/mod/customcert/verify_certificate.php',
  // Tempo até abrir o WhatsApp depois do envio (ms)
  redirectDelay: 1500,
};

(() => {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isSubpage = /^\/credenciamento(\.html)?\/?$/.test(location.pathname);
  const rootPath = $('link[rel="stylesheet"][href*="assets/css/style.css"]')?.getAttribute('href').replace(/assets\/css\/style\.css.*$/, '') || '';

  const waLink = (msg) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
  const mailLink = (subject, body) => `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const store = {
    get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* sem storage */ } },
  };

  /* ---------- links de WhatsApp, e-mail e Roma Capital ---------- */
  $$('[data-wa]').forEach((a) => { a.href = waLink(a.dataset.wa); });
  $$('[data-email]').forEach((a) => { a.href = `mailto:${CONFIG.email}`; a.textContent = CONFIG.email; });
  $$('[data-email-text]').forEach((el) => { el.textContent = CONFIG.email; });
  $$('[data-roma]').forEach((a) => { a.href = CONFIG.romaCapitalUrl; });
  $$('[data-pca]').forEach((a) => { a.href = CONFIG.pcaValidationUrl; });
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  const footerIcons = [
    ['.site-footer a[data-wa]', 'whatsapp.svg'],
    ['.site-footer a[href*="linkedin.com"]', 'linkedin.svg'],
    ['.site-footer a[href*="instagram.com"]', 'instagram.svg'],
  ];
  footerIcons.forEach(([selector, icon]) => {
    $$(selector).forEach((link) => {
      if (link.querySelector('img') || link.closest('.site-footer__credits')) return;
      link.classList.add('site-footer__icon-link');
      const image = document.createElement('img');
      image.src = `${rootPath}assets/icons/${icon}`;
      image.alt = '';
      image.width = 18;
      image.height = 18;
      image.setAttribute('aria-hidden', 'true');
      link.prepend(image);
    });
  });

  if (!$('.whatsapp-float')) {
    const floatingWhatsapp = document.createElement('a');
    floatingWhatsapp.className = 'whatsapp-float';
    floatingWhatsapp.href = waLink('Olá! Vim pelo site da RBS e quero falar com a equipe de parcerias.');
    floatingWhatsapp.target = '_blank';
    floatingWhatsapp.rel = 'noopener';
    floatingWhatsapp.setAttribute('aria-label', 'Falar com a RBS pelo WhatsApp');
    floatingWhatsapp.innerHTML = `<img src="${rootPath}assets/icons/whatsapp.svg" alt="" width="30" height="30" aria-hidden="true">`;
    document.body.append(floatingWhatsapp);
  }

  /* ---------- vídeo do hero ---------- */
  $$('[data-hero-video]').forEach((v) => {
    if (reduceMotion) { v.removeAttribute('autoplay'); v.pause(); }
  });

  /* ---------- imagens ausentes viram placeholder ---------- */
  $$('.media > img').forEach((img) => {
    const fig = img.parentElement;
    const miss = () => { fig.classList.add('is-missing'); img.remove(); };
    if (img.complete && img.naturalWidth === 0) miss();
    else img.addEventListener('error', miss, { once: true });
  });

  /* ---------- UTMs (guardadas na sessão) ---------- */
  const params = new URLSearchParams(location.search);
  ['utm_source', 'utm_medium', 'utm_campaign'].forEach((k) => {
    const v = params.get(k);
    if (v) store.set(k, v);
  });

  /* ---------- header: sombra ao rolar + menu mobile ---------- */
  const header = $('[data-header]');
  const toggle = $('[data-menu-toggle]');
  const drawer = $('#drawer');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const setMenu = (open) => {
    if (!toggle || !drawer) return;
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    drawer.hidden = !open;
  };
  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  drawer?.addEventListener('click', (e) => { if (e.target.closest('a, button')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

  /* ---------- menu: seção ativa ---------- */
  const navLinks = $$('.site-nav__list a[data-nav^="#"]');
  if (navLinks.length && 'IntersectionObserver' in window && !isSubpage) {
    const map = new Map();
    navLinks.forEach((a) => {
      const id = a.dataset.nav.slice(1);
      const sec = document.getElementById(id);
      if (sec) map.set(sec, a);
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('is-active'));
          map.get(en.target)?.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    map.forEach((_, sec) => io.observe(sec));
  }

  /* ---------- acordeão exclusivo (fallback p/ navegadores sem details[name]) ---------- */
  $$('[data-acc]').forEach((d) => {
    d.addEventListener('toggle', () => {
      if (!d.open) return;
      $$(`[data-acc][name="${d.getAttribute('name')}"]`).forEach((o) => { if (o !== d) o.open = false; });
    });
  });

  /* ---------- carrosséis ----------
     data-autoplay="ms"  gira sozinho (pausa no hover, foco e toque)
     data-highlight       destaca o card ativo; controles ficam visíveis mesmo sem rolagem */
  $$('[data-carousel]').forEach((root) => {
    const track = $('[data-track]', root);
    const slides = $$('.carousel__slide', track);
    const dotsWrap = $('[data-dots]', root);
    const prev = $('[data-prev]', root);
    const next = $('[data-next]', root);
    const autoplayMs = Number(root.dataset.autoplay) || 0;
    const highlight = root.hasAttribute('data-highlight');
    let index = 0;
    let timer = null;
    let paused = false;

    const dots = slides.map((s, n) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'rbs-dot';
      b.setAttribute('aria-label', `Ir para ${s.getAttribute('aria-label') || `item ${n + 1}`}`);
      b.addEventListener('click', () => { go(n); restart(); });
      dotsWrap?.appendChild(b);
      return b;
    });

    const maxScroll = () => Math.max(0, track.scrollWidth - track.clientWidth);
    const pos = (n) => Math.min(slides[n].offsetLeft - slides[0].offsetLeft, maxScroll());
    const isStatic = () => maxScroll() <= 4;

    const render = () => {
      root.classList.toggle('is-static', isStatic() && !highlight);
      dots.forEach((d, n) => d.setAttribute('aria-current', String(n === index)));
      if (highlight) slides.forEach((s, n) => s.firstElementChild?.classList.toggle('is-active', n === index));
    };

    const go = (n) => {
      index = (n + slides.length) % slides.length;
      track.scrollTo({ left: pos(index), behavior: reduceMotion ? 'auto' : 'smooth' });
      render();
    };

    prev?.addEventListener('click', () => { go(index - 1); restart(); });
    next?.addEventListener('click', () => { go(index + 1); restart(); });

    let raf = null;
    let programmatic = null;
    track.addEventListener('scroll', () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = track.scrollLeft;
        if (Math.abs(pos(index) - x) <= 4) return; // já está no card atual
        clearTimeout(programmatic);
        programmatic = setTimeout(() => {
          const x2 = track.scrollLeft;
          if (Math.abs(pos(index) - x2) <= 4) return;
          let best = 0; let dist = Infinity;
          slides.forEach((_, n) => { const d = Math.abs(pos(n) - x2); if (d < dist) { dist = d; best = n; } });
          index = best; render();
        }, 120);
      });
    }, { passive: true });

    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); restart(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); restart(); }
    });

    const stop = () => { clearInterval(timer); timer = null; };
    const start = () => {
      if (!autoplayMs || reduceMotion || (isStatic() && !highlight)) return;
      stop();
      timer = setInterval(() => { if (!paused && !document.hidden) go(index + 1); }, autoplayMs);
    };
    const restart = () => { if (timer) start(); };
    ['mouseenter', 'focusin', 'touchstart'].forEach((ev) => root.addEventListener(ev, () => { paused = true; }, { passive: true }));
    ['mouseleave', 'focusout', 'touchend'].forEach((ev) => root.addEventListener(ev, () => { paused = false; }, { passive: true }));

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([en]) => { if (en.isIntersecting) start(); else stop(); }, { threshold: .35 }).observe(root);
    } else start();

    window.addEventListener('resize', () => { render(); }, { passive: true });
    render();
  });

  /* ---------- animações de entrada ----------
     Só anima o que ainda está abaixo da dobra; o topo da página usa a animação de CSS. */
  const REVEAL_GROUPS = '.grid, .steps, .rbs-faq, .carousel__track';
  const REVEAL_SINGLES = [
    '.section__head', '.head-row', '.turn', '.split__media', '.rbs-acc', '.method__intro',
    '.founder', '.cert', '.faq-layout__aside', '.cta', '.section__foot', '.rbs-docs', '.rbs-next',
    '.form-section', '.contact-map', '.legal__toc', '.legal__body > *', '.rbs-stats',
  ].join(', ');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const fold = window.innerHeight * 0.92;
    const below = (el) => el.getBoundingClientRect().top > fold && !el.closest('.page-top, .hero, dialog');
    const done = (el) => {
      el.addEventListener('transitionend', (e) => {
        if (e.target !== el || e.propertyName !== 'opacity') return;
        el.removeAttribute('data-reveal');
        el.classList.remove('is-in');
        el.style.removeProperty('--reveal-delay');
      });
      el.classList.add('is-in');
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const t = en.target;
        (t.hasAttribute('data-reveal-group') ? $$(':scope > [data-reveal]', t) : [t]).forEach(done);
        io.unobserve(t);
      });
    }, { rootMargin: '0px 0px -8% 0px' });

    $$(REVEAL_GROUPS).filter(below).forEach((g) => {
      g.setAttribute('data-reveal-group', '');
      Array.from(g.children).forEach((c, n) => {
        c.setAttribute('data-reveal', '');
        c.style.setProperty('--reveal-delay', `${Math.min(n, 5) * 90}ms`);
      });
      io.observe(g);
    });
    $$(REVEAL_SINGLES).filter(below).forEach((el) => {
      if (el.closest('[data-reveal]') || $('[data-reveal]', el)) return;
      el.setAttribute('data-reveal', '');
      io.observe(el);
    });
  }

  /* ---------- popup do formulário ---------- */
  const dialog = $('#form-dialog');
  let lastOpener = null;
  const openDialog = (adm) => {
    if (!dialog) return;
    const f = $('[data-lead-form]', dialog);
    resetForm(f);
    if (adm) preselectAdm(f, adm);
    lastOpener = document.activeElement;
    if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
    document.documentElement.classList.add('has-dialog');
    setTimeout(() => $('input:not([type="hidden"])', f)?.focus(), 50);
  };
  const closeDialog = () => {
    if (!dialog) return;
    if (dialog.open) { if (typeof dialog.close === 'function') dialog.close(); else dialog.removeAttribute('open'); }
  };
  dialog?.addEventListener('close', () => {
    document.documentElement.classList.remove('has-dialog');
    lastOpener?.focus?.();
  });
  dialog?.addEventListener('click', (e) => { if (e.target === dialog) closeDialog(); });
  $$('[data-close-dialog]').forEach((b) => b.addEventListener('click', closeDialog));
  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-open-form]');
    if (!opener) return;
    e.preventDefault();
    const activeTab = $('[data-tab][aria-selected="true"]');
    openDialog(opener.dataset.adm || (activeTab ? activeTab.dataset.tab : ''));
  });

  /* ---------- formulário ---------- */
  const ADM_NAMES = { bradesco: 'Bradesco Consórcios', embracon: 'Embracon', volkswagen: 'Volkswagen Consórcio' };
  const ADM_UNDECIDED = 'Ainda não sei';

  // Dados de cadastro que cada administradora pede, na ordem em que chegam: [rótulo, campo]
  const LAYOUTS = {
    padrao: {
      empresa: [['Razão social', 'razao_social'], ['CNPJ', 'cnpj'], ['Telefone', 'telefone_empresa'], ['E-mail do sócio administrador', 'email_socio_admin'], ['Chave Pix', 'chave_pix']],
      socios: 'Dados do Sócio',
      socio: [['Nome', 'nome'], ['CPF', 'cpf'], ['E-mail do responsável', 'email'], ['Telefone', 'whatsapp']],
    },
    volkswagen: {
      empresa: [['CNPJ', 'cnpj'], ['Razão social', 'razao_social'], ['Telefone', 'telefone_empresa'], ['E-mail', 'email_socio_admin'], ['Endereço', 'endereco'], ['Número', 'numero'], ['Complemento', 'complemento'], ['Bairro', 'bairro'], ['Cidade', 'cidade_empresa'], ['Estado', 'estado'], ['CEP', 'cep'], ['Nº de inscrição municipal', 'inscricao_municipal'], ['Nome do conselho', 'conselho'], ['Nº de inscrição no conselho', 'numero_conselho']],
      socios: 'Dados dos Sócios',
      socio: [['Nome completo do sócio responsável', 'nome'], ['E-mail', 'email'], ['Telefone', 'whatsapp'], ['RG', 'rg'], ['CPF', 'cpf']],
    },
  };
  const SOCIO_EXTRA = [['Nome completo', 'socio_nome[]'], ['E-mail', 'socio_email[]'], ['Telefone', 'socio_telefone[]'], ['RG', 'socio_rg[]'], ['CPF', 'socio_cpf[]']];
  const MAX_SOCIOS_EXTRA = 5;

  // Volkswagen pede o cadastro completo; Bradesco, Embracon ou nenhuma escolhida usam o padrão
  const layoutsFor = (slugs) => {
    const volkswagen = slugs.includes('volkswagen');
    return { volkswagen, padrao: !volkswagen || slugs.some((s) => s !== 'volkswagen') };
  };
  const slugsOf = (names) => Object.keys(ADM_NAMES).filter((k) => names.includes(ADM_NAMES[k]));

  function preselectAdm(form, adm) {
    const box = $(`[data-adm-check="${adm}"]`, form);
    if (box) box.checked = true;
    const origin = $('input[name="administradora_origem"]', form);
    if (origin) origin.value = ADM_NAMES[adm] || '';
    updateCnpjFields(form);
  }

  function resetForm(form) {
    if (!form) return;
    const wrap = form.parentElement;
    const success = $('[data-form-success]', wrap);
    form.hidden = false;
    if (success) success.hidden = true;
    $$('.rbs-field.is-error', form).forEach((f) => f.classList.remove('is-error'));
    $$('.rbs-error', form).forEach((e) => { e.hidden = true; e.textContent = ''; });
  }

  const maskPhone = (v) => {
    const d = v.replace(/\D/g, '').slice(0, 11);
    if (d.length <= 2) return d ? `(${d}` : '';
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  };
  const formatBy = (chars, pattern) => {
    let i = 0;
    let out = '';
    for (const p of pattern) {
      if (i >= chars.length) break;
      out += p === '#' ? chars[i++] : p;
    }
    return out;
  };
  // CNPJ aceita o formato alfanumérico (Receita Federal, 2026)
  const cnpjChars = (v) => v.toUpperCase().replace(/[^0-9A-Z]/g, '').slice(0, 14);
  const MASKS = {
    phone: maskPhone,
    cnpj: (v) => formatBy(cnpjChars(v), '##.###.###/####-##'),
    cpf: (v) => formatBy(v.replace(/\D/g, '').slice(0, 11), '###.###.###-##'),
    cep: (v) => formatBy(v.replace(/\D/g, '').slice(0, 8), '#####-###'),
  };
  document.addEventListener('input', (e) => {
    const mask = MASKS[e.target.dataset?.mask];
    if (mask) e.target.value = mask(e.target.value);
  });

  const checkDigit = (nums, weights) => {
    const r = nums.reduce((sum, n, i) => sum + n * weights[i], 0) % 11;
    return r < 2 ? 0 : 11 - r;
  };
  const validCpf = (v) => {
    const d = [...v.replace(/\D/g, '')].map(Number);
    if (d.length !== 11 || d.every((n) => n === d[0])) return false;
    const w = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    return checkDigit(d.slice(0, 9), w.slice(1)) === d[9] && checkDigit(d.slice(0, 10), w) === d[10];
  };
  const validCnpj = (v) => {
    const c = cnpjChars(v);
    if (!/^[0-9A-Z]{12}\d{2}$/.test(c) || /^(.)\1+$/.test(c)) return false;
    const d = [...c].map((ch) => ch.charCodeAt(0) - 48);
    const w = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    return checkDigit(d.slice(0, 12), w.slice(1)) === d[12] && checkDigit(d.slice(0, 13), w) === d[13];
  };
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const setError = (form, key, msg) => {
    const field = $(`[data-field="${key}"]`, form);
    if (!field) return;
    field.classList.toggle('is-error', !!msg);
    const err = $('.rbs-error', field);
    if (err) { err.textContent = msg || ''; err.hidden = !msg; }
    $$('input, select, textarea', field).forEach((c) => c.setAttribute('aria-invalid', msg ? 'true' : 'false'));
  };

  const updateCnpjFields = (form) => {
    const group = $('[data-cnpj-fields]', form);
    if (!group) return;
    const on = $('input[name="possui_cnpj"]:checked', form)?.value === 'Sim';
    const layouts = layoutsFor($$('[data-adm-check]:checked', form).map((c) => c.dataset.admCheck));
    group.hidden = !on;
    $$('[data-layout]', group).forEach((el) => { el.hidden = !layouts[el.dataset.layout]; });
    $$('input, select', group).forEach((inp) => {
      inp.disabled = !on || !!inp.closest('[data-layout][hidden]');
      if (inp.disabled) setError(form, inp.closest('[data-field]')?.dataset.field, '');
    });
  };

  let socioSeq = 0;
  const renumberSocios = (form) => {
    const boxes = $$('[data-socio]', form);
    boxes.forEach((box, i) => {
      $('[data-socio-title]', box).textContent = `Sócio ${i + 2}`;
      box.setAttribute('aria-label', `Sócio ${i + 2}`);
      $('[data-remove-socio]', box).setAttribute('aria-label', `Remover sócio ${i + 2}`);
    });
    const add = $('[data-add-socio]', form);
    if (add) add.hidden = boxes.length >= MAX_SOCIOS_EXTRA;
  };
  const addSocio = (form) => {
    const list = $('[data-socios]', form);
    if (!list || $$('[data-socio]', list).length >= MAX_SOCIOS_EXTRA) return;
    const n = ++socioSeq;
    const field = (label, name, attrs, full = false) => `<div class="rbs-field${full ? ' is-full' : ''}" data-field="socio${n}_${name}"><label class="rbs-label" for="socio${n}-${name}">${label}</label><input class="rbs-input" id="socio${n}-${name}" name="socio_${name}[]" ${attrs} required aria-describedby="socio${n}-${name}-err"><span class="rbs-error" id="socio${n}-${name}-err" hidden></span></div>`;
    const box = document.createElement('div');
    box.className = 'rbs-socio';
    box.dataset.socio = '';
    box.setAttribute('role', 'group');
    box.innerHTML = '<div class="rbs-socio__head is-full"><span data-socio-title></span><button type="button" class="rbs-socio__remove" data-remove-socio>Remover</button></div>'
      + field('Nome completo', 'nome', 'type="text"', true)
      + field('E-mail', 'email', 'type="email"')
      + field('Telefone', 'telefone', 'type="tel" inputmode="numeric" maxlength="15" data-mask="phone"')
      + field('RG', 'rg', 'type="text" maxlength="20"')
      + field('CPF', 'cpf', 'type="text" inputmode="numeric" maxlength="14" data-mask="cpf"');
    list.append(box);
    renumberSocios(form);
    $('input', box).focus();
  };

  const fillAddress = async (input) => {
    const cep = input.value.replace(/\D/g, '');
    if (cep.length !== 8 || input.dataset.cep === cep) return;
    input.dataset.cep = cep;
    try {
      const data = await (await fetch(`https://viacep.com.br/ws/${cep}/json/`)).json();
      if (data.erro) return;
      [['endereco', 'logradouro'], ['bairro', 'bairro'], ['cidade_empresa', 'localidade'], ['estado', 'uf']].forEach(([name, key]) => {
        const el = input.form.elements[name];
        if (!el || !data[key] || (el.value && !el.dataset.auto)) return;
        el.value = data[key];
        el.dataset.auto = '1';
        setError(input.form, el.closest('[data-field]').dataset.field, '');
      });
    } catch (e) { /* segue com o preenchimento manual */ }
  };

  const validateGroup = (form, errors) => {
    $$('[data-cnpj-fields] [data-field]', form).forEach((field) => {
      const input = $('input, select', field);
      if (!input || input.disabled) return;
      const key = field.dataset.field;
      const v = input.value.trim();
      const digits = v.replace(/\D/g, '');
      if (!v) {
        if (input.required) errors[key] = input.tagName === 'SELECT' ? 'Selecione uma opção.' : 'Preencha este campo.';
        return;
      }
      const mask = input.dataset.mask;
      if (mask === 'cnpj' && !validCnpj(v)) errors[key] = 'Informe um CNPJ válido.';
      else if (mask === 'cpf' && !validCpf(v)) errors[key] = 'Informe um CPF válido.';
      else if (mask === 'cep' && digits.length !== 8) errors[key] = 'Informe o CEP com 8 dígitos.';
      else if (mask === 'phone' && (digits.length < 10 || digits.length > 11)) errors[key] = 'Informe o DDD e o número.';
      else if (input.type === 'email' && !EMAIL_RE.test(v)) errors[key] = 'Informe um e-mail válido.';
    });
  };

  const validate = (form) => {
    const fd = new FormData(form);
    const errors = {};
    const nome = (fd.get('nome') || '').trim();
    const tel = (fd.get('whatsapp') || '').replace(/\D/g, '');
    const email = (fd.get('email') || '').trim();
    if (nome.length < 3) errors.nome = 'Informe seu nome completo.';
    if (tel.length < 10 || tel.length > 11) errors.whatsapp = 'Informe o DDD e o número, com 10 ou 11 dígitos.';
    if (!EMAIL_RE.test(email)) errors.email = 'Informe um e-mail válido, como nome@empresa.com.br.';
    if (!(fd.get('cidade') || '').trim()) errors.cidade = 'Informe sua cidade e estado.';
    if (!fd.get('perfil')) errors.perfil = 'Selecione o seu perfil profissional.';
    if (!fd.get('possui_cnpj')) errors.cnpj = 'Escolha sim ou não.';
    if (!fd.get('atua_consorcio')) errors.atua = 'Escolha sim ou não.';
    validateGroup(form, errors);
    if (!fd.get('consentimento')) errors.consentimento = 'Para seguir, autorize o contato da RBS.';
    const groupKeys = $$('[data-cnpj-fields] [data-field]', form).map((f) => f.dataset.field);
    ['nome', 'whatsapp', 'email', 'cidade', 'perfil', 'cnpj', 'atua', ...groupKeys, 'consentimento'].forEach((k) => setError(form, k, errors[k]));
    return errors;
  };

  const admLabelOf = (fd) => fd.getAll('administradoras').filter((a) => a !== ADM_UNDECIDED).join(', ')
    || (fd.get('administradora_origem') || '').trim() || 'A definir';

  const buildSections = (fd) => {
    const val = (k) => (fd.get(k) || '').trim();
    const rows = (pairs) => pairs.map(([label, name]) => [label, val(name)]);
    const sections = [];
    if (val('possui_cnpj') === 'Sim') {
      const layouts = layoutsFor(slugsOf(fd.getAll('administradoras')));
      const layout = layouts.volkswagen ? LAYOUTS.volkswagen : LAYOUTS.padrao;
      const empresa = layouts.volkswagen && layouts.padrao ? [...layout.empresa, ['Chave Pix', 'chave_pix']] : layout.empresa;
      sections.push({ title: 'Dados da Empresa', rows: rows(empresa) });
      sections.push({ title: layout.socios, rows: rows(layout.socio) });
      if (layouts.volkswagen) {
        fd.getAll('socio_nome[]').forEach((_, i) => {
          sections.push({ title: `Sócio ${i + 2}`, rows: SOCIO_EXTRA.map(([label, name]) => [label, (fd.getAll(name)[i] || '').trim()]) });
        });
      }
      sections.push({ title: 'Perfil', rows: rows([['Cidade/UF', 'cidade'], ['Perfil profissional', 'perfil'], ['Já atua com consórcio', 'atua_consorcio'], ['Tamanho da equipe', 'tamanho_equipe']]) });
    } else {
      sections.push({ title: 'Contato', rows: rows([['Nome', 'nome'], ['WhatsApp', 'whatsapp'], ['E-mail', 'email'], ['Cidade/UF', 'cidade']]) });
      sections.push({ title: 'Perfil', rows: rows([['Perfil profissional', 'perfil'], ['Possui CNPJ', 'possui_cnpj'], ['Já atua com consórcio', 'atua_consorcio'], ['Tamanho da equipe', 'tamanho_equipe']]) });
    }
    if (val('mensagem')) sections.push({ title: 'Mensagem', rows: [['', val('mensagem')]] });
    return sections
      .map((s) => ({ ...s, rows: s.rows.filter(([, v]) => v) }))
      .filter((s) => s.rows.length);
  };

  const buildMessage = (adm, sections) => [
    'Olá, Rodrigo! Acabei de enviar minha solicitação de credenciamento pelo site da RBS.',
    '',
    `*CREDENCIAMENTO: ${adm.toUpperCase()}*`,
    ...sections.flatMap(({ title, rows }) => ['', `*${title}*`, ...rows.map(([k, v]) => (k ? `${k}: ${v}` : v))]),
  ].join('\n');

  const docsTemplate = (slug) => {
    const layout = slug === 'volkswagen' ? LAYOUTS.volkswagen : LAYOUTS.padrao;
    const blanks = (pairs) => pairs.map(([label]) => `${label}:`);
    return [
      `ADMINISTRADORA: ${ADM_NAMES[slug].toUpperCase()}`, '',
      'DADOS DA EMPRESA', ...blanks(layout.empresa), '',
      `${layout.socios.toUpperCase()}${slug === 'volkswagen' ? ' (repita para cada sócio)' : ''}`, ...blanks(layout.socio),
    ].join('\n');
  };

  const send = async (fd, resumo) => {
    if (!CONFIG.formEndpoint) return;
    const url = /^https?:/.test(CONFIG.formEndpoint) ? CONFIG.formEndpoint : rootPath + CONFIG.formEndpoint;
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8000);
    try {
      const body = new FormData();
      fd.forEach((v, k) => { if (k !== 'administradoras') body.append(k, v); });
      body.append('administradoras', fd.getAll('administradoras').join(', '));
      body.append('resumo', JSON.stringify(resumo));
      await fetch(url, { method: 'POST', body, signal: ctrl.signal, headers: { Accept: 'application/json' } });
    } catch (e) {
      // o WhatsApp segue abrindo mesmo se o registro falhar
      console.warn('Falha ao registrar o lead:', e);
    } finally { clearTimeout(t); }
  };

  $$('[data-lead-form]').forEach((form) => {
    const clearOn = (e) => {
      const field = e.target.closest('[data-field]');
      if (field && field.classList.contains('is-error')) setError(form, field.dataset.field, '');
    };
    form.addEventListener('input', (e) => {
      clearOn(e);
      delete e.target.dataset.auto;
      if (e.target.dataset.mask === 'cep') fillAddress(e.target);
    });
    form.addEventListener('change', clearOn);
    form.addEventListener('change', (e) => { if (['possui_cnpj', 'administradoras'].includes(e.target.name)) updateCnpjFields(form); });
    form.addEventListener('click', (e) => {
      if (e.target.closest('[data-add-socio]')) addSocio(form);
      const remove = e.target.closest('[data-remove-socio]');
      if (!remove) return;
      remove.closest('[data-socio]').remove();
      renumberSocios(form);
      $('[data-add-socio]', form)?.focus();
    });
    updateCnpjFields(form);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if ($('input[name="site_empresa"]', form).value) return; // honeypot
      const errors = validate(form);
      const keys = Object.keys(errors);
      if (keys.length) {
        const first = $(`[data-field="${keys[0]}"] input, [data-field="${keys[0]}"] select`, form);
        first?.focus();
        return;
      }
      const submit = $('button[type="submit"]', form);
      submit.disabled = true;
      submit.firstChild.textContent = 'Enviando…';

      $('input[name="pagina"]', form).value = location.href;
      ['utm_source', 'utm_medium', 'utm_campaign'].forEach((k) => { $(`input[name="${k}"]`, form).value = store.get(k) || ''; });
      const fd = new FormData(form);
      const adm = admLabelOf(fd);
      const sections = buildSections(fd);
      await send(fd, { administradora: adm, secoes: sections });

      const link = waLink(buildMessage(adm, sections));
      const success = $('[data-form-success]', form.parentElement);
      $('[data-success-wa]', success).href = link;
      form.hidden = true;
      success.hidden = false;
      success.focus();
      submit.disabled = false;
      submit.firstChild.textContent = 'Solicitar credenciamento';
      form.reset();
      $$('[data-socio]', form).forEach((box) => box.remove());
      renumberSocios(form);
      updateCnpjFields(form);

      // evento para GTM / Meta Pixel
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'credenciamento_enviado', perfil: fd.get('perfil'), administradoras: fd.getAll('administradoras').join(',') });

      setTimeout(() => { window.location.href = link; }, CONFIG.redirectDelay);
    });
  });

  /* ---------- cliques rastreáveis ---------- */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="https://wa.me"], a[href^="mailto:"]');
    if (!a) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: a.href.startsWith('mailto') ? 'clique_email' : 'clique_whatsapp', label: a.textContent.trim() });
  });

  /* ---------- abas de credenciamento ---------- */
  const tablist = $('[data-tabs]');
  if (tablist) {
    const tabs = $$('[data-tab]', tablist);
    const nameEl = $('[data-adm-name]');
    const waBtn = $('[data-wa-adm]');
    const mailBtn = $('[data-mail-adm]');
    const pageForm = $('#formulario [data-lead-form]');

    const select = (slug, focus = false, updateHash = true) => {
      const tab = tabs.find((t) => t.dataset.tab === slug) || tabs[0];
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        $(`#${t.getAttribute('aria-controls')}`).hidden = !on;
      });
      const name = ADM_NAMES[tab.dataset.tab];
      if (nameEl) nameEl.textContent = name;
      if (waBtn) waBtn.href = waLink(`Olá, Rodrigo! Quero me credenciar para atuar com ${tab.dataset.tab === 'embracon' ? 'a' : tab.dataset.tab === 'bradesco' ? 'o' : 'a'} ${name} pela estrutura RBS. Pode me orientar sobre a documentação?`);
      if (mailBtn) mailBtn.href = mailLink(`Credenciamento | ${name} | [Razão social]`,
        `Olá, equipe RBS!\n\nSegue a documentação para análise de credenciamento.\n\n${docsTemplate(tab.dataset.tab)}\n\nDocumentos em anexo.`);
      if (pageForm) {
        $$('[data-adm-check]', pageForm).forEach((c) => { c.checked = c.dataset.admCheck === tab.dataset.tab; });
        const origin = $('input[name="administradora_origem"]', pageForm);
        if (origin) origin.value = name;
        updateCnpjFields(pageForm);
      }
      if (focus) tab.focus();
      if (updateHash && history.replaceState) history.replaceState(null, '', `#${tab.dataset.tab}`);
    };

    tabs.forEach((t, n) => {
      t.addEventListener('click', () => select(t.dataset.tab));
      t.addEventListener('keydown', (e) => {
        let k = null;
        if (e.key === 'ArrowRight') k = (n + 1) % tabs.length;
        if (e.key === 'ArrowLeft') k = (n - 1 + tabs.length) % tabs.length;
        if (e.key === 'Home') k = 0;
        if (e.key === 'End') k = tabs.length - 1;
        if (k !== null) { e.preventDefault(); select(tabs[k].dataset.tab, true); }
      });
    });

    const fromHash = () => location.hash.replace('#', '').toLowerCase();
    select(ADM_NAMES[fromHash()] ? fromHash() : 'bradesco', false, false);
    window.addEventListener('hashchange', () => { if (ADM_NAMES[fromHash()]) select(fromHash(), false, false); });
  }

})();
