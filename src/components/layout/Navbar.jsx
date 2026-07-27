import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { NAV_LINKS, scrollToAnchor } from './navLinks';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const router = useRouter();

  const isHome = router.pathname === '/';
  const isActive = (id) => (isHome ? activeId === id : id === null && isHome);

  const linkStateClass = (id) =>
    isActive(id) ? 'text-accent font-bold' : 'hover:text-accent';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Destaca no menu a secao que estiver cruzando o meio da viewport.
  useEffect(() => {
    if (!isHome) return undefined;

    const sections = NAV_LINKS.filter((link) => link.id)
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
        else if (window.scrollY < 200) setActiveId(null);
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  const handleNavClick = (event, id) => {
    if (menuOpen) closeMenu();
    if (!id || !isHome) return;

    if (scrollToAnchor(id)) {
      event.preventDefault();
      setActiveId(id);
    }
  };

  return (
    <>
      <nav className="fixed w-full z-50 top-0 transition-all duration-300">
        <div
          className={`max-w-7xl mx-auto px-6 py-4 flex justify-between items-center rounded-b-2xl border-b border-gray-100 transition-all duration-300 ${
            scrolled ? 'bg-white/95 shadow-md' : 'bg-white/80 backdrop-blur-md shadow-sm'
          }`}
        >
          <Link href="/" className="relative z-50 shrink-0" aria-label="RBS Consultoria Inteligente — ir para o início">
            <img
              src="/images/logo/logorbsblack.webp"
              alt="RBS Consultoria Inteligente"
              width={62}
              height={61}
              className="h-[52px] w-[53px] object-contain md:h-[61px] md:w-[62px]"
            />
          </Link>

          <div className="hidden lg:flex space-x-8 items-center text-sm leading-5 font-medium text-primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.id)}
                aria-current={isActive(link.id) ? 'true' : undefined}
                className={`transition-colors ${linkStateClass(link.id)}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 relative z-50">
            <Link
              href="/contact"
              className="group hidden items-center gap-3 rounded-full bg-primary py-2 pl-5 pr-2 text-sm font-bold leading-5 text-white transition-colors hover:bg-accent lg:flex"
            >
              Fale com Especialista
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-primary transition-colors group-hover:text-accent">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
            <button
              onClick={toggleMenu}
              className="lg:hidden text-primary p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Menu mobile */}
      <div
        className={`fixed inset-0 bg-white z-40 transform lg:hidden flex flex-col pt-24 px-6 pb-6 overflow-y-auto mobile-menu ${
          menuOpen ? 'open' : 'translate-x-full'
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col space-y-6 text-lg font-medium text-primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(event) => handleNavClick(event, link.id)}
              tabIndex={menuOpen ? undefined : -1}
              className={`border-b border-gray-100 pb-2 transition-colors ${linkStateClass(link.id)}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="mt-auto pt-10">
          <Link
            href="/contact"
            onClick={closeMenu}
            tabIndex={menuOpen ? undefined : -1}
            className="group flex w-full items-center justify-between gap-3 rounded-full bg-primary py-3 pl-6 pr-3 text-sm font-bold text-white transition-colors hover:bg-accent"
          >
            Fale com Especialista
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-primary transition-colors group-hover:text-accent">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
