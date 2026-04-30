import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../constants/translations';

export default function EligibilityChecker({ onComplete }) {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].journey;
  const [age, setAge] = useState('');
  const [citizen, setCitizen] = useState(null);
  const [votedBefore, setVotedBefore] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (age === '18' && citizen === true && votedBefore !== null) {
      onComplete({
        isEligible: true,
        isFirstTimer: votedBefore === false,
        age: 18
      });
    }
  };

  const isMinor = age === '17';

  return (
    <div className="p-12 bg-[var(--color-bg-card)] border border-[var(--color-accent-soft)]/20 rounded-sm fade-in">
      <h2 className="text-3xl font-sans font-semibold mb-10 text-[var(--color-text-primary)]">{t.eligibility}</h2>

      <form onSubmit={handleSubmit} className="space-y-12">
        <div>
          <label className="block text-sm font-sans uppercase tracking-widest text-[var(--color-text-muted)] mb-6">
            Are you 18 years of age or older?
          </label>
          <div className="flex gap-4">
            {[true, false].map((val) => (
              <button
                key={`age-${val}`}
                type="button"
                onClick={() => { setAge(val ? '18' : '17'); setVotedBefore(null); setCitizen(null); }}
                className={`flex-1 py-4 border font-sans uppercase tracking-widest text-xs transition-all ${
                  (val && age === '18') || (!val && age === '17')
                    ? 'bg-[var(--color-text-primary)] text-white border-[var(--color-text-primary)] shadow-md'
                    : 'border-[var(--color-text-primary)]/20 text-[var(--color-text-primary)] hover:bg-[var(--color-bg)]'
                }`}
              >
                {val ? t.yes : t.no}
              </button>
            ))}
          </div>
          {age === '18' && (
            <div className="mt-4 p-3 bg-blue-50/50 border border-blue-200 text-blue-800 text-xs font-sans rounded-sm">
              Great! You meet the age requirement.
            </div>
          )}
        </div>

        {!isMinor && age === '18' && (
          <div className="space-y-12 fade-in">
            <div>
              <label className="block text-sm font-sans uppercase tracking-widest text-[var(--color-text-muted)] mb-6">
                {t.citizenLabel}
              </label>
              <div className="flex gap-4">
                {[true, false].map((val) => (
                  <button
                    key={`citizen-${val}`}
                    type="button"
                    onClick={() => setCitizen(val)}
                    className={`flex-1 py-4 border font-sans uppercase tracking-widest text-xs transition-all ${
                      citizen === val
                        ? 'bg-[var(--color-text-primary)] text-white border-[var(--color-text-primary)] shadow-md'
                        : 'border-[var(--color-text-primary)]/20 text-[var(--color-text-primary)] hover:bg-[var(--color-bg)]'
                    }`}
                  >
                    {val ? t.yes : t.no}
                  </button>
                ))}
              </div>
              {citizen === false && (
                <div className="mt-4 p-4 bg-orange-50 border border-orange-200 text-orange-800 text-sm font-sans rounded-sm">
                  NRIs can vote with a valid Indian passport. Otherwise, only citizens are eligible.
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-sans uppercase tracking-widest text-[var(--color-text-muted)] mb-6">
                {t.votedLabel}
              </label>
              <div className="flex gap-4">
                {[true, false].map((val) => (
                  <button
                    key={`vote-${val}`}
                    type="button"
                    onClick={() => setVotedBefore(val)}
                    className={`flex-1 py-4 border font-sans uppercase tracking-widest text-xs transition-all ${
                      votedBefore === val
                        ? 'bg-[var(--color-text-primary)] text-white border-[var(--color-text-primary)] shadow-md'
                        : 'border-[var(--color-text-primary)]/20 text-[var(--color-text-primary)] hover:bg-[var(--color-bg)]'
                    }`}
                  >
                    {val ? t.yes : t.no}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {isMinor ? (
          <div className="space-y-6 fade-in">
            <p className="text-orange-800 text-sm font-sans text-center italic">
              You must be 18 to vote, but you can lead the change today.
            </p>
            <Link 
              to="/volunteer" 
              className="block w-full py-5 bg-[var(--color-accent-blue)] text-white font-sans uppercase tracking-[0.2em] text-sm text-center hover:bg-opacity-90 transition-all shadow-lg font-bold"
            >
              Revolutionary &rarr;
            </Link>
          </div>
        ) : (
          <button
            type="submit"
            className="w-full py-5 bg-[var(--color-text-primary)] text-white font-sans uppercase tracking-[0.2em] text-sm hover:bg-[var(--color-accent-blue)] transition-colors disabled:opacity-30 disabled:hover:bg-[var(--color-text-primary)]"
            disabled={age === '' || citizen === null || votedBefore === null}
          >
            Start my journey
          </button>
        )}
      </form>
    </div>
  );
}
