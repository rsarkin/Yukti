import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../constants/translations';

export default function ConstitutionSection() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].home;

  return (
    <section className="py-24 bg-[var(--color-bg)]" id="constitution-section">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 flex justify-center">
            <div className="relative p-12 bg-[var(--color-bg-card)] border border-[var(--color-accent-soft)]/10 rounded-sm">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[var(--color-accent-blue)] opacity-40" aria-hidden="true">
                <path d="M4 19.5V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v15.5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5z" />
                <path d="M12 7v10M8 10h8M8 14h8" />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-accent-blue)] font-sans">
                  {language === 'hi' ? 'अनुच्छेद' : 'Article'}
                </span>
                <div className="text-4xl font-sans font-semibold text-[var(--color-text-primary)]">326</div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <span className="inline-block px-3 py-1 bg-[var(--color-caramel)]/10 text-[var(--color-caramel)] text-xs font-sans uppercase tracking-widest mb-6 rounded-full">
              {t.constitutionBadge}
            </span>
            <h2 className="text-4xl md:text-5xl font-sans font-semibold mb-8 text-[var(--color-text-primary)] leading-tight">
              {t.constitutionTitle}
            </h2>
            <p className="text-lg text-[var(--color-text-muted)] font-sans mb-8 leading-relaxed">
              {t.constitutionBody}
            </p>
            <ul className="space-y-4 text-[var(--color-text-primary)] font-sans font-bold text-xl">
              <li>&mdash; Dr. B.R. Ambedkar</li>
              <li>&mdash; Jawaharlal Nehru</li>
              <li>&mdash; {language === 'hi' ? '1949 की संविधान सभा' : 'The Constituent Assembly of 1949'}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}