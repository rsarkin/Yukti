import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../constants/translations';
import BallotUnit from './BallotUnit';
import VVPATAnimation from './VVPATAnimation';
import EVMInfoAccordion from './EVMInfoAccordion';

export default function EVMSimulator() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].evm;
  const [step, setStep] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleStart = () => setStep(2);
  const handleArmed = () => setStep(3);
  const handleVote = (candidate) => {
    setSelectedCandidate(candidate);
    setStep(4);
  };
  const playBeep = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); // Standard EVM beep frequency
    
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.05);
    gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime + 0.4);
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.5);
  };

  const handleVVPATComplete = () => {
    playBeep();
    setStep(5);
  };
  const handleReset = () => {
    setSelectedCandidate(null);
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-20 px-4" id="evm-simulator">
      <div className="max-w-4xl mx-auto">
        {/* Step 1 — Introduction */}
        {step === 1 && (
          <div className="text-center p-12 bg-[var(--color-bg-card)] border border-[var(--color-accent-soft)]/20 rounded-sm shadow-warm fade-in">
            <svg className="w-24 h-24 mx-auto mb-8 text-[var(--color-accent-blue)] opacity-40" fill="none" stroke="currentColor" strokeWidth="0.5" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="1" />
              <path d="M6 8h4v3H6zM6 13h4v3H6zM12 8h6M12 11h6M12 14h4" />
              <circle cx="20" cy="8" r="1" />
            </svg>
            <h1 className="text-4xl font-sans font-semibold mb-6 text-[var(--color-text-primary)]">{t.introTitle}</h1>
            <p className="text-[var(--color-text-muted)] font-sans mb-12 text-lg max-w-xl mx-auto">{t.introBody}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
              <div className="p-6 bg-[var(--color-bg)] border border-[var(--color-text-primary)]/5 rounded-lg">
                <h3 className="text-[10px] font-sans font-bold text-[var(--color-accent-blue)] uppercase tracking-widest mb-3">{t.units.ballot}</h3>
                <p className="text-xs text-[var(--color-text-muted)] font-sans leading-relaxed">{t.units.ballotDesc}</p>
              </div>
              <div className="p-6 bg-[var(--color-bg)] border border-[var(--color-text-primary)]/5 rounded-lg">
                <h3 className="text-[10px] font-sans font-bold text-[var(--color-accent-blue)] uppercase tracking-widest mb-3">{t.units.control}</h3>
                <p className="text-xs text-[var(--color-text-muted)] font-sans leading-relaxed">{t.units.controlDesc}</p>
              </div>
              <div className="p-6 bg-[var(--color-bg)] border border-[var(--color-text-primary)]/5 rounded-lg">
                <h3 className="text-[10px] font-sans font-bold text-[var(--color-accent-blue)] uppercase tracking-widest mb-3">{t.units.vvpat}</h3>
                <p className="text-xs text-[var(--color-text-muted)] font-sans leading-relaxed">{t.units.vvpatDesc}</p>
              </div>
            </div>

            <button
              onClick={handleStart}
              className="px-12 py-4 bg-[var(--color-text-primary)] text-white font-sans uppercase tracking-widest hover:bg-[var(--color-accent-blue)] transition-all"
            >
              {t.startSim} &rarr;
            </button>
          </div>
        )}

        {/* Step 2 — Presiding Officer */}
        {step === 2 && (
          <div className="text-center p-12 bg-[var(--color-bg-card)] border border-[var(--color-accent-soft)]/20 rounded-sm fade-in">
            <h2 className="text-2xl font-sans font-semibold mb-8 text-[var(--color-text-primary)]">{t.officerTitle}</h2>
            <div className="mb-12 flex justify-center">
              <button
                onClick={handleArmed}
                className="w-32 h-32 rounded-full bg-red-600 border-8 border-red-800 shadow-xl flex items-center justify-center group active:scale-95 transition-transform pulse-glow"
                aria-label="Arm the ballot unit"
              >
                <div className="text-white font-sans font-bold uppercase tracking-tighter text-xs">Ballot</div>
              </button>
            </div>
            <p className="text-[var(--color-text-muted)] font-sans animate-pulse">{t.officerBody}</p>
          </div>
        )}

        {/* Step 3 — Ballot Unit */}
        {step === 3 && (
          <div className="fade-in">
            <BallotUnit onVote={handleVote} />
          </div>
        )}

        {/* Step 4 — VVPAT */}
        {step === 4 && (
          <div className="fade-in">
            <VVPATAnimation candidate={selectedCandidate} onComplete={handleVVPATComplete} />
          </div>
        )}

        {/* Step 5 — Confirmation */}
        {step === 5 && (
          <div className="text-center p-12 bg-[var(--color-bg-card)] border border-[var(--color-accent-soft)]/20 rounded-sm shadow-warm fade-in">
            <div className="w-20 h-20 mx-auto mb-8 flex items-center justify-center">
              <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" strokeWidth="0.8" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M9 12l2 2 4-4" strokeWidth="1.5" />
              </svg>
            </div>
            <h2 className="text-4xl font-sans font-semibold mb-4 text-[var(--color-text-primary)]">{t.confirmedTitle}</h2>
            <div className="text-6xl font-sans font-bold text-[var(--color-accent-blue)] mb-8 opacity-20">BEEP</div>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleReset}
                className="px-8 py-3 border border-[var(--color-text-primary)] text-[var(--color-text-primary)] font-sans uppercase tracking-widest text-xs hover:bg-[var(--color-bg)] transition-all"
              >
                {t.voteAgain}
              </button>
              <Link
                to="/booth"
                className="px-8 py-3 bg-[var(--color-accent-blue)] text-white font-sans uppercase tracking-widest text-xs hover:opacity-90 transition-all shadow-md"
              >
                {language === 'hi' ? 'अपना बूथ खोजें' : 'Locate Your Booth'}
              </Link>
            </div>
          </div>
        )}

        {/* FAQ Accordion */}
        <div className="mt-20">
          <EVMInfoAccordion />
        </div>
      </div>
    </div>
  );
}