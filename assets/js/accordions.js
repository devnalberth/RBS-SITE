(function () {
  'use strict';

  document.querySelectorAll('[data-accordion]').forEach((accordion) => {
    const items = Array.from(accordion.querySelectorAll('.accordion-item'));
    const singleOpen = accordion.dataset.singleOpen === 'true';

    items.forEach((item, index) => {
      const trigger = item.querySelector('.accordion-trigger');
      const panel = item.querySelector('.accordion-panel');
      const icon = item.querySelector('.accordion-trigger__icon');
      if (!trigger || !panel) return;

      const panelId = panel.id || `accordion-panel-${Math.random().toString(36).slice(2)}-${index}`;
      const triggerId = trigger.id || `${panelId}-trigger`;
      panel.id = panelId;
      trigger.id = triggerId;
      trigger.setAttribute('aria-controls', panelId);
      panel.setAttribute('role', 'region');
      panel.setAttribute('aria-labelledby', triggerId);

      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        if (singleOpen && isOpen) return;

        if (singleOpen) {
          items.forEach((other) => {
            other.classList.remove('is-open');
            other.querySelector('.accordion-trigger')?.setAttribute('aria-expanded', 'false');
          });
        }

        item.classList.toggle('is-open', !isOpen);
        trigger.setAttribute('aria-expanded', String(!isOpen));
        if (icon && (icon.textContent === '+' || icon.textContent === '−')) {
          icon.textContent = !isOpen ? '−' : '+';
        }
      });
    });
  });
})();
