import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../constants/translations';

/* SVG party symbols for VVPAT slip (mirrors BallotUnit) */
const PartySymbolSmall = ({ party }) => {
  const symbols = {
    'Sun Party': (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-[var(--color-caramel)]">
        <circle cx="12" cy="12" r="5" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    'River Party': (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-[var(--color-accent-blue)]">
        <path d="M2 6c3 0 4 2 7 2s4-2 7-2 4 2 7 2M2 12c3 0 4 2 7 2s4-2 7-2 4 2 7 2M2 18c3 0 4 2 7 2s4-2 7-2 4 2 7 2" />
      </svg>
    ),
    'Mountain Party': (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-[var(--color-text-muted)]">
        <path d="M2 20L8 8l4 6 4-10 6 16H2z" />
      </svg>
    ),
    'Star Party': (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-[var(--color-caramel)]">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
      </svg>
    ),
    'Leaf Party': (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-[var(--color-accent-blue)]">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34M17 8A5 5 0 0121 3c-1 4-1 8-5 13M17 8c-4 4-8.5 4.5-9 4.5" />
      </svg>
    ),
    'NOTA': (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-[var(--color-text-muted)]">
        <circle cx="12" cy="12" r="10" /><path d="M4.93 4.93l14.14 14.14" />
      </svg>
    ),
  };
  return symbols[party] || null;
};

export default function VVPATAnimation({ candidate, onComplete }) {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].evm;
  const [timeLeft, setTimeLeft] = useState(7);
  const [isDropping, setIsDropping] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsDropping(true);
      const done = setTimeout(onComplete, 1500);
      return () => clearTimeout(done);
    }
  }, [timeLeft, onComplete]);

  return (
    <div className="flex flex-col items-center">
      <div className="bg-slate-300 p-8 rounded-sm shadow-xl w-full max-w-md border-4 border-slate-400">
        <div className="bg-slate-800 p-4 rounded-sm mb-8 text-center text-green-400 font-mono text-sm tracking-widest uppercase">
          {t.vvpatTitle}
        </div>

        <div className="relative bg-slate-900 aspect-[4/5] overflow-hidden border-8 border-slate-500 flex items-center justify-center p-8">
          <div className={`w-full bg-white p-6 shadow-lg transform transition-all duration-1000 ease-out ${
            isDropping ? 'translate-y-[150%] opacity-0' : 'translate-y-0'
          }`}>
            <div className="flex justify-between items-start mb-12">
              <div className="text-[10px] text-slate-400 font-sans uppercase">ECI / 2026 / VVPAT</div>
              <div className="text-xl font-sans font-semibold">{candidate.id}</div>
            </div>
            <div className="text-center py-8 border-y-2 border-dashed border-slate-200">
              <div className="mb-4 flex justify-center" aria-hidden="true">
                <PartySymbolSmall party={candidate.party} />
              </div>
              <div className="text-2xl font-sans font-semibold text-slate-900">{candidate.name}</div>
              <div className="text-xs font-sans text-slate-500 uppercase mt-2 tracking-widest">{candidate.party}</div>
            </div>
          </div>

          <div className="absolute top-4 right-4 text-green-500 font-mono text-4xl opacity-40">
            0{timeLeft}s
          </div>
        </div>
      </div>

      <p className="mt-8 text-[var(--color-text-muted)] font-sans text-center max-w-sm">
        {t.vvpatBody}
      </p>
    </div>
  );
}
