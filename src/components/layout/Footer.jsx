import Link from 'next/link';
import { useRouter } from 'next/router';
import { NAV_LINKS, scrollToAnchor } from './navLinks';

const REDES = [
  { name: 'LinkedIn', icon: '/icons/Linkedin.svg', href: 'https://www.linkedin.com/' },
  { name: 'Instagram', icon: '/icons/Instagram.svg', href: 'https://www.instagram.com/' },
];

const LEGAIS = [
  { label: 'Política de Privacidade', href: '/privacy' },
  { label: 'Termos de Uso', href: '/terms' },
];

export default function Footer() {
  const router = useRouter();

  const handleNavClick = (event, id) => {
    if (!id || router.pathname !== '/') return;
    if (scrollToAnchor(id)) event.preventDefault();
  };

  return (
    <footer className="bg-primary pb-5 pt-10">
      <div className="mx-auto flex max-w-7xl flex-col px-8 py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="lg:w-[320px]">
            <Link href="/" aria-label="RBS Consultoria Inteligente — ir para o início">
              <img
                src="/images/logo/logo.png"
                alt="RBS Consultoria Inteligente"
                width={62}
                height={61}
                className="h-[61px] w-[62px] object-contain"
              />
            </Link>
            <p className="max-w-[320px] pt-3 text-sm leading-5 text-white/30">
              Consultoria estratégica em consórcios para planejamento patrimonial e financeiro.
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 lg:justify-center">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(event) => handleNavClick(event, link.id)}
                    className="text-sm leading-5 text-white/40 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex gap-4">
            {REDES.map((rede) => (
              <li key={rede.name}>
                <a
                  href={rede.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`RBS Consultoria no ${rede.name}`}
                  className="block opacity-70 transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <img
                    src={rede.icon}
                    alt=""
                    aria-hidden="true"
                    width={23}
                    height={23}
                    className="block"
                    style={{ width: 23, height: 23 }}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 border-t border-white/[0.06] pt-[33px]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-4 text-white/30">
              © 2026 RBS Consultoria Inteligente. Todos os direitos reservados.
            </p>

            <ul className="flex flex-wrap gap-4">
              {LEGAIS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs leading-4 text-white/30 transition-colors hover:text-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
