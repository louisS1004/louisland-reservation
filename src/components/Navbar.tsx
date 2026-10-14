import { useState } from 'react';
import { Ticket, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenReservation: () => void;
  activeSection: string;
}

export default function Navbar({ onOpenReservation, activeSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Attractions', href: '#attractions' },
    { label: 'Horaires & Accès', href: '#horaires' },
    { label: 'Tarifs', href: '#tarifs' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#accueil"
            className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0 group"
          >
            <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 shadow-sm group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 fill-slate-950" />
            </span>
            <span className="tracking-tight">Louisland</span>
          </a>

          {/* Zone 2: 4-5 single-line nav links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-950 ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-amber-600 font-bold border-b-2 border-amber-500 py-1'
                    : ''
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenReservation}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-xl shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Ticket className="w-4 h-4" />
              <span>Réservation</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-slate-950 focus:outline-none"
              aria-label="Ouvrir le menu de navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenReservation();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-sm transition-all"
          >
            <Ticket className="w-4 h-4" />
            <span>Réserver mes billets</span>
          </button>
        </div>
      )}
    </header>
  );
}
