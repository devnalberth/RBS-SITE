export const NAV_LINKS = [
  { id: null, href: '/', label: 'Início' },
  { id: 'sobre', href: '/#sobre', label: 'Sobre' },
  { id: 'modalidades', href: '/#modalidades', label: 'Modalidades' },
  { id: 'administradoras', href: '/#administradoras', label: 'Administradoras' },
  { id: 'consorcios', href: '/#consorcios', label: 'Estratégias' },
  { id: 'faq', href: '/#faq', label: 'FAQ' },
];

export function scrollToAnchor(id) {
  const target = document.getElementById(id);
  if (!target) return false;

  if (window.__lenis) window.__lenis.scrollTo(target, { offset: -100 });
  else target.scrollIntoView({ behavior: 'smooth' });

  return true;
}
