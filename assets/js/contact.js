(function () {
  'use strict';

  const WHATSAPP = '5511989864178';
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = [data.get('nome'), data.get('sobrenome')].filter(Boolean).join(' ').trim();
    const fields = [
      ['E-mail', data.get('email')],
      ['Telefone', data.get('telefone')],
      ['Interesse', data.get('interesse')],
      ['Mensagem', data.get('mensagem')],
    ];
    const lines = [
      'Olá! Vim pelo site da RBS.',
      '',
      name ? `*Nome:* ${name}` : null,
      ...fields.map(([label, value]) => String(value || '').trim() ? `*${label}:* ${String(value).trim()}` : null),
    ].filter((line) => line !== null);

    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener,noreferrer');
  });
})();
