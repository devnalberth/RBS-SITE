/**
 * Menu unico do site — usado pela Navbar (desktop e mobile) e pelo Footer.
 * Os ids apontam para as secoes da home; manter em sincronia com os
 * `id` declarados nos componentes de src/components/home.
 */
export const NAV_LINKS = [
  { id: null, href: '/', label: 'Home' },
  { id: 'sobre', href: '/#sobre', label: 'Sobre' },
  { id: 'modalidades', href: '/#modalidades', label: 'Modalidades' },
  { id: 'administradoras', href: '/#administradoras', label: 'Administradoras' },
  { id: 'estrategias', href: '/#estrategias', label: 'Estratégias' },
  { id: 'faq', href: '/#faq', label: 'FAQ' },
];

/**
 * Rola ate a secao passando pelo Lenis, para nao brigar com o scroll suave.
 * Devolve false quando a secao ainda nao existe na pagina, deixando o Link
 * do Next seguir o seu caminho normal.
 */
export function scrollToAnchor(id) {
  const target = document.getElementById(id);
  if (!target) return false;

  if (window.__lenis) window.__lenis.scrollTo(target, { offset: -100 });
  else target.scrollIntoView({ behavior: 'smooth' });

  return true;
}
