import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../constants/translations';

export default function VotingDayGuide({ onNext, onBack }) {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].journey;
  const navigate = useNavigate();

  const handleAskYukti = () => {
    const prompt = language === 'hi' 
      ? 'मतदान के दिन की तैयारी के लिए मुझे एक संपूर्ण चरण-दर-चरण मार्गदर्शिका दें। मुझे क्या ले जाना चाहिए, मतदान केंद्र पर क्या उम्मीद करनी चाहिए और ईवीएम का उपयोग कैसे करना चाहिए? कृपया इसे पठनीय और स्पष्ट चरणों में रखें।' 
      : 'Give me a total step-by-step guide for Voting Day preparation. What should I carry, what should I expect at the polling booth, and how to use the EVM? Please keep it readable and in clear stages.';
    navigate('/chat', { state: { initialPrompt: prompt } });
  };

  return (
    <div className="fade-in space-y-16 py-8">
      <div className="space-y-6">
        <h2 className="text-5xl font-sans font-bold text-[var(--color-text-primary)] tracking-tight leading-tight">
          {t.votingDayTitle}
        </h2>
        <p className="text-xl text-[var(--color-text-muted)] font-sans leading-relaxed max-w-2xl">
          {language === 'hi' 
            ? 'तैयारी ही आत्मविश्वास की कुंजी है। जानें कि मतदान के दिन आपको किन चीजों की आवश्यकता होगी और बूथ पर क्या अपेक्षा करें।' 
            : 'Preparation is the key to confidence. Know exactly what you need to carry and what to expect at the polling station.'}
        </p>
      </div>

      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-12 border-t border-[var(--color-text-primary)]/10">
          <div className="space-y-8">
            <h3 className="text-sm font-sans font-bold text-[var(--color-accent-blue)] uppercase tracking-[0.3em]">
              {language === 'hi' ? 'जरूरी सामान' : 'Essential Items'}
            </h3>
            <ul className="space-y-6">
              {[
                { title: language === 'hi' ? 'वोटर आईडी (EPIC)' : 'Voter ID (EPIC)', desc: language === 'hi' ? 'आपका प्राथमिक पहचान पत्र' : 'Your primary identification document' },
                { title: language === 'hi' ? 'वोटर स्लिप' : 'Voter Slip', desc: language === 'hi' ? 'बूथ और क्रम संख्या खोजने के लिए' : 'To find your booth and serial number easily' },
                { title: language === 'hi' ? 'वैकल्पिक आईडी' : 'Alternative ID', desc: language === 'hi' ? 'आधार, पैन या पासपोर्ट (यदि वोटर आईडी नहीं है)' : 'Aadhaar, PAN, or Passport (if Voter ID is missing)' }
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
              {language === 'hi' ? 'बूथ पर क्या होगा' : 'At the Booth'}
            </h3>
            <div className="space-y-6">
              {[
                language === 'hi' ? 'प्रथम मतदान अधिकारी द्वारा पहचान का सत्यापन' : 'Identity verification by 1st Polling Officer',
                language === 'hi' ? 'द्वितीय अधिकारी द्वारा अमिट स्याही और हस्ताक्षर' : 'Indelible ink and signature by 2nd Officer',
                language === 'hi' ? 'ईवीएम पर अपना वोट दर्ज करें' : 'Record your vote on the EVM privately'
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <span className="font-mono text-xs text-[var(--color-text-primary)]/40 mt-1">0{i+1}</span>
                  <p className="text-[var(--color-text-muted)] font-sans text-lg leading-snug">{step}</p>
                </div>
              ))}
            </div>
            
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleAskYukti}
                className="flex-1 py-5 bg-[var(--color-text-primary)] text-white font-sans uppercase tracking-[0.2em] text-xs font-bold hover:bg-[var(--color-accent-blue)] transition-all shadow-xl"
              >
                {language === 'hi' ? 'विस्तृत गाइड मांगें' : 'Get Detailed Guide'}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <button
            onClick={onNext}
            className="w-full py-6 bg-[var(--color-text-primary)] text-white font-sans text-sm uppercase tracking-[0.3em] font-bold hover:bg-[var(--color-accent-blue)] transition-all shadow-2xl"
          >
            {language === 'hi' ? 'अगला: यात्रा पूरी हुई' : 'Next: Journey Complete'} &rarr;
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