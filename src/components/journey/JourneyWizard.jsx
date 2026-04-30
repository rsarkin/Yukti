import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useJourney } from '../../context/JourneyContext';
import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../constants/translations';
import EligibilityChecker from './EligibilityChecker';
import RegistrationGuide from './RegistrationGuide';
import VotingDayGuide from './VotingDayGuide';

export default function JourneyWizard() {
  const { journeyState, updateJourney } = useJourney();
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].journey;
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => Math.max(0, prev - 1));

  const stages = [t.stages.eligibility, t.stages.registration, t.stages.preparation, t.stages.ready];

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-20 px-4" id="journey-wizard">
      <div className="max-w-3xl mx-auto">
        <div className="mb-20 relative">
          {/* Background Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-[var(--color-text-primary)]/5 -translate-y-1/2 rounded-full" />
          
          {/* Progress Line */}
          <div 
            className="absolute top-1/2 left-0 h-1 bg-[var(--color-accent-blue)] -translate-y-1/2 transition-all duration-1000 ease-in-out rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)]" 
            style={{ width: `${(currentStep / (stages.length - 1)) * 100}%` }}
          />

          {/* Dots & Labels */}
          <div className="relative flex justify-between px-0">
            {stages.map((stage, idx) => {
              const isActive = idx === currentStep;
              const isCompleted = idx < currentStep;
              
              return (
                <div key={idx} className="flex flex-col items-center">
                  <div 
                    className={`w-5 h-5 rounded-full border-2 transition-all duration-700 flex items-center justify-center z-10 ${
                      isActive || isCompleted 
                        ? 'border-[var(--color-accent-blue)] bg-[var(--color-accent-blue)] shadow-lg' 
                        : 'border-[var(--color-text-primary)]/10 bg-[var(--color-bg)]'
                    }`}
                  >
                    {isCompleted ? (
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : isActive ? (
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    ) : null}
                  </div>
                  <div className="absolute mt-10 flex flex-col items-center">
                    <span 
                      className={`text-[10px] uppercase tracking-[0.2em] font-sans font-bold transition-all duration-700 text-center ${
                        isActive ? 'text-[var(--color-text-primary)] scale-110' : isCompleted ? 'text-[var(--color-accent-blue)]' : 'text-[var(--color-text-primary)]/20'
                      }`}
                    >
                      {stage}
                    </span>
                    {isActive && <div className="mt-1 w-1 h-1 bg-[var(--color-accent-blue)] rounded-full" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="min-h-[400px]">
          {currentStep === 0 && (
            <EligibilityChecker onComplete={(data) => {
              updateJourney(data);
              nextStep();
            }} />
          )}

          {currentStep === 1 && (
            <RegistrationGuide onNext={nextStep} onBack={prevStep} />
          )}

          {currentStep === 2 && (
            <VotingDayGuide onNext={nextStep} onBack={prevStep} />
          )}

          {currentStep === 3 && (
            <div className="text-center p-12 bg-[var(--color-bg-card)] border border-[var(--color-accent-soft)]/20 rounded-sm fade-in">
              <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center">
                <svg className="w-12 h-12 text-[var(--color-accent-blue)]" fill="none" stroke="currentColor" strokeWidth="0.8" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h2 className="text-4xl font-sans font-semibold mb-6 text-[var(--color-text-primary)]">{t.readyTitle}</h2>
              <p className="text-[var(--color-text-muted)] font-sans mb-10 text-lg">{t.readyBody}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/evm"
                  className="px-8 py-3 bg-[var(--color-text-primary)] text-white font-sans uppercase tracking-widest text-xs hover:bg-[var(--color-accent-blue)] transition-all"
                >
                  {t.tryEvm}
                </Link>
                <Link
                  to="/booth"
                  className="px-8 py-3 bg-[var(--color-accent-blue)] text-white font-sans uppercase tracking-widest text-xs hover:opacity-90 transition-all shadow-md"
                >
                  {language === 'hi' ? 'अपना बूथ खोजें' : 'Locate Your Booth'}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}