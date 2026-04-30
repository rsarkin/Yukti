import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../constants/translations';

export default function FormStepper() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].register;
  const navigate = useNavigate();

  const handleAskYukti = () => {
    navigate('/chat', { state: { initialPrompt: language === 'hi' ? 'मुझे फॉर्म 6 भरने में मदद करें' : 'Help me fill out Form 6' } });
  };

  return (
    <div className="min-h-[80vh] bg-[var(--color-bg)] py-20 px-6" id="form-stepper">
      <div className="max-w-3xl mx-auto space-y-16">
        
        <div className="fade-in space-y-6">
          <h1 className="text-5xl md:text-6xl font-sans font-bold text-[var(--color-text-primary)] tracking-tight">
            {t.title}
          </h1>
          <p className="text-xl text-[var(--color-text-muted)] font-sans leading-relaxed max-w-2xl">
            {language === 'hi' 
              ? 'भारत में मतदान करने के लिए पंजीकरण करना एक सरल प्रक्रिया है। आपको बस फॉर्म 6 भरने और आवश्यक दस्तावेज़ संलग्न करने की आवश्यकता है।' 
              : 'Registering to vote in India is a straightforward process. All you need is to fill out Form 6 and attach the required documents.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 fade-in">
          <div className="space-y-8">
            <h3 className="text-2xl font-sans font-bold text-[var(--color-text-primary)] border-b border-[var(--color-text-primary)]/10 pb-4">
              {language === 'hi' ? 'दस्तावेज़ों की सूची' : 'Checklist of Documents'}
            </h3>
            <ul className="space-y-6">
              {[
                language === 'hi' ? 'हालिया पासपोर्ट साइज फोटो' : 'Recent passport-size photograph',
                language === 'hi' ? 'आयु प्रमाण (आधार, जन्म प्रमाण पत्र, आदि)' : 'Proof of Age (Aadhaar, Birth Certificate, etc.)',
                language === 'hi' ? 'निवास प्रमाण (आधार, राशन कार्ड, बिजली बिल)' : 'Proof of Residence (Aadhaar, Ration Card, Utility Bill)'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-[var(--color-text-muted)] font-sans text-lg">
                  <span className="mt-2 w-2 h-2 bg-[var(--color-accent-blue)] rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-center gap-6">
            <a
              href="https://voters.eci.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-6 text-center bg-[var(--color-text-primary)] text-white font-sans uppercase tracking-[0.2em] text-sm font-bold hover:bg-[var(--color-accent-blue)] transition-all shadow-xl"
            >
              {language === 'hi' ? 'ECI पोर्टल पर जाएं' : 'Go to ECI Portal'}
            </a>
            <button
              onClick={handleAskYukti}
              className="w-full py-6 border-2 border-[var(--color-text-primary)] text-[var(--color-text-primary)] font-sans uppercase tracking-[0.2em] text-sm font-bold hover:bg-[var(--color-text-primary)] hover:text-white transition-all"
            >
              {language === 'hi' ? 'फॉर्म भरने में सहायता लें' : 'Get Help with Form'}
            </button>
          </div>
        </div>

        <div className="pt-24 border-t border-[var(--color-text-primary)]/5 text-center fade-in">
          <button 
            onClick={handleAskYukti}
            className="group inline-flex flex-col items-center gap-3"
          >
            <span className="text-[var(--color-text-muted)] font-sans text-xs uppercase tracking-[0.4em] group-hover:text-[var(--color-accent-blue)] transition-colors">
              {language === 'hi' ? 'उलझन में हैं? युक्ति से पूछें' : 'Confused? Ask Yukti'}
            </span>
            <div className="w-12 h-0.5 bg-[var(--color-accent-blue)]/20 group-hover:w-24 group-hover:bg-[var(--color-accent-blue)] transition-all duration-500" />
          </button>
        </div>

      </div>
    </div>
  );
}