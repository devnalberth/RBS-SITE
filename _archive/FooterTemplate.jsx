import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="pt-16 md:pt-20 pb-6 px-6 border-t border-gray-100 mt-10">
      <div className="max-w-7xl mx-auto gs-reveal">
        {/* Top Footer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 mb-12 md:mb-16">
          {/* Newsletter */}
          <div className="lg:col-span-5">
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Newsletter</h3>
            <div className="flex items-center bg-gray-50 rounded-full p-1 md:p-1.5 border border-gray-200 mb-3 md:mb-4 max-w-md w-full">
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-transparent border-none outline-none px-4 w-full text-xs md:text-sm"
              />
              <button className="bg-accent text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full font-medium hover:bg-primary transition whitespace-nowrap flex items-center gap-2 text-xs md:text-sm">
                Subscribe <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            </div>
            <p className="text-gray-500 text-xs md:text-sm">Let&apos;s transform your vision into results.</p>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8">
            <div>
              <h4 className="font-bold text-base md:text-lg mb-4 md:mb-6">Main Pages</h4>
              <ul className="space-y-3 md:space-y-4 text-gray-500 text-xs md:text-sm">
                <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
                <li><Link href="/case-study" className="hover:text-accent transition">Case Study</Link></li>
                <li><Link href="/pricing" className="hover:text-accent transition">Pricing</Link></li>
                <li><Link href="/blog" className="hover:text-accent transition">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-base md:text-lg mb-4 md:mb-6">Company</h4>
              <ul className="space-y-3 md:space-y-4 text-gray-500 text-xs md:text-sm">
                <li><Link href="/contact" className="hover:text-accent transition">Contact</Link></li>
                <li><Link href="/services" className="hover:text-accent transition">Services</Link></li>
                <li><Link href="/about" className="hover:text-accent transition">About Us</Link></li>
                <li><Link href="/pricing" className="hover:text-accent transition">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-base md:text-lg mb-4 md:mb-6">Template</h4>
              <ul className="space-y-3 md:space-y-4 text-gray-500 text-xs md:text-sm">
                <li><Link href="/services/wealth-finance" className="hover:text-accent transition">Service Details</Link></li>
                <li><Link href="/case-study/digital-transformation" className="hover:text-accent transition">Case Study Details</Link></li>
                <li><Link href="/changelog" className="hover:text-accent transition">Changelog</Link></li>
                <li><Link href="/404" className="hover:text-accent transition">404</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Middle Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 py-8 md:py-10 border-t border-gray-100 mb-6">
          <div>
            <p className="text-xs md:text-sm text-gray-400 mb-1">Email</p>
            <a href="mailto:contactinfo@gmail.com" className="font-bold hover:text-accent transition text-sm md:text-base break-all">
              contactinfo@gmail.com
            </a>
          </div>
          <div>
            <p className="text-xs md:text-sm text-gray-400 mb-1">Visit Us</p>
            <p className="font-bold text-sm md:text-base">Los Angeles, CA 90017 United States</p>
          </div>
          <div>
            <p className="text-xs md:text-sm text-gray-400 mb-1">Call Us Now</p>
            <a href="tel:+9912345478" className="font-bold hover:text-accent transition text-sm md:text-base">
              +99 1234 5478
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-primary text-white rounded-2xl p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="text-xl md:text-2xl font-bold uppercase tracking-tight">Empower</div>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-xs md:text-sm font-medium">
            <Link href="/changelog" className="hover:text-accent transition">Changelog</Link>
            <span className="hidden sm:inline">•</span>
            <Link href="/terms" className="hover:text-accent transition">Terms &amp; Conditions</Link>
          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs text-gray-400 px-2 text-center md:text-left gap-4">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <Link href="https://twitter.com" className="hover:text-primary transition">Twitter</Link>
            <Link href="https://linkedin.com" className="hover:text-primary transition">LinkedIn</Link>
            <Link href="https://facebook.com" className="hover:text-primary transition">Facebook</Link>
            <Link href="https://instagram.com" className="hover:text-primary transition">Instagram</Link>
          </div>
          <p>&copy; 2026. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
