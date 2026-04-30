import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../constants/translations';

export default function Footer() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].footer;
  const th = TRANSLATIONS[language].home;

  return (
    <footer className="bg-[var(--color-bg)] border-t border-[var(--color-accent-soft)]/10">
      {/* CTA Section */}
      <div className="py-20 border-b border-[var(--color-accent-soft)]/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-sans font-semibold text-[var(--color-text-primary)] mb-8">{th.footerCta}</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <Link
              to="/journey"
              className="px-10 py-4 bg-[var(--color-text-primary)] text-[var(--color-white)] font-sans uppercase tracking-[0.2em] text-sm hover:bg-[var(--color-accent-blue)] transition-colors"
            >
              {th.footerCtaJourney} &rarr;
            </Link>
            <Link
              to="/chat"
              className="px-10 py-4 border border-[var(--color-text-primary)] text-[var(--color-text-primary)] font-sans uppercase tracking-[0.2em] text-sm hover:bg-[var(--color-accent-soft)] hover:text-white transition-colors"
            >
              {th.footerCtaChat} &rarr;
            </Link>
          </div>
          <p className="text-[var(--color-text-muted)] text-sm font-sans">{th.footerAvailable}</p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-sans font-bold text-[var(--color-text-primary)] mb-2">Yukti</h3>
              <p className="text-[var(--color-text-muted)] font-sans text-sm max-w-xs">{t.tagline}</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-[var(--color-text-muted)] text-xs font-sans">{t.copyright} &copy; 2026</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}