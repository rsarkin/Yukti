import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../constants/translations';

export default function RegistrationGuide({ onNext, onBack }) {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].journey;
  const navigate = useNavigate();

  const handleAskYukti = () => {
    const prompt = language === 'hi' 
      ? 'मुझे भारत में मतदाता पंजीकरण (फॉर्म 6) के लिए चरण-दर-चरण कुल मार्गदर्शिका दें। कृपया अधिकतम पठनीयता बनाए रखें, स्पष्ट चरणों का उपयोग करें, और दस्तावेज़ तैयार करने से लेकर अंतिम सबमिशन तक मेरा मार्गदर्शन करें।' 
      : 'Give me a total step-by-step guide for voter registration (Form 6) in India. Please maintain maximum readability, use clear stages, and guide me through document preparation to final submission.';
    navigate('/chat', { state: { initialPrompt: prompt } });
  };

  return (
    <div className="fade-in space-y-16 py-8">
      <div className="space-y-6">
        <h2 className="text-5xl font-sans font-bold text-[var(--color-text-primary)] tracking-tight leading-tight">
          {t.registrationTitle}
        </h2>
        <p className="text-xl text-[var(--color-text-muted)] font-sans leading-relaxed max-w-2xl">
          {language === 'hi' 
            ? 'आपका वोट ही आपकी ताकत है। चुनाव आयोग के साथ पंजीकरण करना अब पूरी तरह से डिजिटल और सरल है।' 
            : 'Your vote is your voice. Registering with the Election Commission is now completely digital and simple.'}
        </p>
      </div>

      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-12 border-t border-[var(--color-text-primary)]/10">
          <div className="space-y-8">
            <h3 className="text-sm font-sans font-bold text-[var(--color-accent-blue)] uppercase tracking-[0.3em]">
              {language === 'hi' ? 'दस्तावेज़ जिनकी आवश्यकता है' : 'Required Documents'}
            </h3>
            <ul className="space-y-6">
              {[
                { title: language === 'hi' ? 'फोटो' : 'Photograph', desc: language === 'hi' ? 'हालिया पासपोर्ट साइज (सफेद पृष्ठभूमि)' : 'Recent passport size with white background' },
                { title: language === 'hi' ? 'आयु प्रमाण' : 'Age Proof', desc: language === 'hi' ? 'आधार कार्ड, पैन, या जन्म प्रमाण पत्र' : 'Aadhaar, PAN, or Birth Certificate' },
                { title: language === 'hi' ? 'पता प्रमाण' : 'Address Proof', desc: language === 'hi' ? 'बिजली बिल, बैंक पासबुक, या राशन कार्ड' : 'Utility bill, Bank Passbook, or Ration Card' }
              ].map((item, i) => (
                <li key={i} className="group">
                  <div className="flex items-center gap-4 mb-1">
                    <span className="w-2 h-2 bg-[var(--color-text-primary)] rounded-full group-hover:bg-[var(--color-accent-blue)] transition-colors" />
                    <span className="font-sans font-bold text-[var(--color-text-primary)] text-lg">{item.title}</span>
                  </div>
                  <p className="pl-6 text-[var(--color-text-muted)] text-sm font-sans">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-sm font-sans font-bold text-[var(--color-accent-blue)] uppercase tracking-[0.3em]">
              {language === 'hi' ? 'अगले कदम' : 'The Process'}
            </h3>
            <div className="space-y-6">
              {[
                language === 'hi' ? 'NVSP पोर्टल पर लॉग इन करें' : 'Log in to the NVSP portal',
                language === 'hi' ? 'फॉर्म 6 चुनें और जानकारी भरें' : 'Select Form 6 and enter details',
                language === 'hi' ? 'दस्तावेज़ अपलोड करें और सबमिट करें' : 'Upload documents and submit'
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <span className="font-mono text-xs text-[var(--color-text-primary)]/40 mt-1">0{i+1}</span>
                  <p className="text-[var(--color-text-muted)] font-sans text-lg leading-snug">{step}</p>
                </div>
              ))}
            </div>
            
            <div className="flex gap-4 pt-4">
              <a
                href="https://voters.eci.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-5 text-center bg-[var(--color-text-primary)] text-white font-sans uppercase tracking-[0.2em] text-xs font-bold hover:bg-[var(--color-accent-blue)] transition-all shadow-xl"
              >
                {language === 'hi' ? 'पोर्टल खोलें' : 'Open Portal'}
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <button
            onClick={onNext}
            className="w-full py-6 bg-[var(--color-text-primary)] text-white font-sans text-sm uppercase tracking-[0.3em] font-bold hover:bg-[var(--color-accent-blue)] transition-all shadow-2xl"
          >
            {language === 'hi' ? 'अगला: मतदान की तैयारी' : 'Next: Voting Preparation'} &rarr;
          </button>
        </div>
      </div>

      <div className="pt-20 border-t border-[var(--color-text-primary)]/5 text-center">
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
  );
}