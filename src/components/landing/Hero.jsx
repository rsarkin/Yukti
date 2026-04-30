import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../constants/translations';

export default function Hero() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].home;

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[var(--color-bg)] overflow-hidden" id="hero-section">
      {/* Animated ambient orbs */}
      <div className="absolute top-1/4 left-1/6 w-40 h-40 bg-[var(--color-accent-blue)] opacity-[0.06] rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/5 w-56 h-56 bg-[var(--color-caramel)] opacity-[0.06] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-[var(--color-accent-soft)] opacity-[0.04] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>

      <div className="z-10 text-center max-w-4xl px-6 py-12">
        <h1 className="text-4xl md:text-7xl font-bold text-[var(--color-text-primary)] mb-6 tracking-tight fade-in leading-tight">
          {t.heroTitle}
        </h1>
        <p className="text-base md:text-xl text-[var(--color-text-muted)] mb-10 md:mb-14 font-sans fade-in delay-300 max-w-2xl mx-auto leading-relaxed">
          {t.heroSubtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in delay-500">
          <Link
            to="/journey"
            className="px-10 py-4 bg-[var(--color-text-primary)] text-[var(--color-white)] font-sans uppercase tracking-[0.2em] text-sm hover:bg-[var(--color-accent-blue)] transition-all duration-300 w-full sm:w-auto"
            id="hero-cta-journey"
          >
            {t.heroCta} &rarr;
          </Link>
          <Link
            to="/chat"
            className="px-10 py-4 border border-[var(--color-text-primary)] text-[var(--color-text-primary)] font-sans uppercase tracking-[0.2em] text-sm hover:bg-[var(--color-accent-soft)] hover:text-white transition-all duration-300 w-full sm:w-auto"
            id="hero-cta-chat"
          >
            {t.footerCtaChat} &rarr;
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-[var(--color-accent-blue)] opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.8" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}