import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../constants/translations';

export default function Navbar() {
  const { language, toggleLanguage } = useLanguage();
  const t = TRANSLATIONS[language].nav;
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { path: '/journey', label: t.journey },
    { path: '/preparation', label: t.prep },
    { path: '/report', label: t.report },
    { path: '/volunteer', label: t.volunteer },
    { path: '/news', label: t.news },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-[var(--color-bg)]/90 backdrop-blur-xl border-b border-[var(--color-text-primary)]/5" aria-label="Main navigation">
      <div className="container mx-auto px-8 py-6 flex justify-between items-center">
        
        {/* Brand Logo */}
        <Link to="/" className="group flex items-baseline" aria-label="Yukti Home">
          <span className="text-2xl md:text-4xl font-sans font-black text-[var(--color-text-primary)] tracking-tighter uppercase">
            Yukti
          </span>
          <span className="text-2xl md:text-4xl font-sans font-black text-[var(--color-accent-blue)] group-hover:scale-125 transition-transform duration-300 ml-0.5">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative py-2 text-[11px] font-sans font-bold uppercase tracking-[0.25em] transition-all duration-300 group ${
                isActive(link.path)
                  ? 'text-[var(--color-accent-blue)]'
                  : 'text-[var(--color-text-primary)]/60 hover:text-[var(--color-text-primary)]'
              }`}
            >
              {link.label}
              {/* Animated Underline */}
              <span className={`absolute bottom-0 left-0 h-[2px] bg-[var(--color-accent-blue)] transition-all duration-500 ${
                isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-6">
          <button
            onClick={toggleLanguage}
            className="relative overflow-hidden px-5 py-2.5 border-2 border-[var(--color-text-primary)]/10 text-[10px] font-sans font-black uppercase tracking-[0.2em] hover:border-[var(--color-accent-blue)] hover:text-[var(--color-accent-blue)] transition-all group rounded-none"
            aria-label="Toggle language"
          >
            <span className="relative z-10">
              {language === 'en' ? 'English / हिंदी' : 'हिंदी / English'}
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-12 h-12 flex flex-col items-center justify-center gap-2 bg-[var(--color-text-primary)]/5 rounded-full hover:bg-[var(--color-text-primary)]/10 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className={`block w-6 h-[1.5px] bg-[var(--color-text-primary)] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-[var(--color-text-primary)] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100 bg-[var(--color-bg)] border-t border-[var(--color-text-primary)]/5' : 'max-h-0 opacity-0'}`}>
        <div className="container mx-auto px-8 py-10 flex flex-col gap-8">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`text-2xl font-sans font-bold uppercase tracking-widest transition-all ${
                isActive(link.path)
                  ? 'text-[var(--color-accent-blue)] pl-4 border-l-4 border-[var(--color-accent-blue)]'
                  : 'text-[var(--color-text-primary)]/40 hover:text-[var(--color-text-primary)] hover:pl-4 transition-all'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}