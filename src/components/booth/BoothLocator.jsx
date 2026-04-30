import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../constants/translations';

const WalkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM6 14l3-3 4-1 3 3M9 22l3-5 1-4M13 10v7l-2 4" />
  </svg>
);

const CycleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5.5" cy="17.5" r="3.5" />
    <circle cx="18.5" cy="17.5" r="3.5" />
    <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM12 17.5V14l-3-3 4-3 2 3h2" />
  </svg>
);

const RickshawIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v7c0 .6.4 1 1 1h1" />
    <circle cx="7.5" cy="17.5" r="2.5" />
    <circle cx="16.5" cy="17.5" r="2.5" />
  </svg>
);

export default function BoothLocator() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].booth;
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!id) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setResult({
        name: language === 'hi' ? 'राजकीय प्राथमिक विद्यालय' : 'Government Primary School',
        boothNo: '142',
        address: 'Sector 12, New Delhi, 110075',
        distance: '0.8 km',
        route: language === 'hi' ? 'मुख्य सड़क के माध्यम से सबसे छोटा रास्ता' : 'Shortest path via Main Road',
        transport: [
          { mode: language === 'hi' ? 'पैदल' : 'Walk', time: '10 mins', icon: <WalkIcon /> },
          { mode: language === 'hi' ? 'साइकिल' : 'Cycle', time: '4 mins', icon: <CycleIcon /> },
          { mode: language === 'hi' ? 'ऑटो' : 'Auto', time: '2 mins', icon: <RickshawIcon /> }
        ]
      });
    }, 1200);
  };

  const handleAskYukti = () => {
    const prompt = language === 'hi' 
      ? `मेरा बूथ मिल गया है: ${result?.name}, ${result?.address}। वहां पहुंचने के लिए मुझे क्या परिवहन विकल्प चुनने चाहिए और किन बातों का ध्यान रखना चाहिए?` 
      : `I found my booth: ${result?.name}, ${result?.address}. What transportation should I use and what should I keep in mind while traveling there?`;
    navigate('/chat', { state: { initialPrompt: prompt } });
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-20 px-4" id="booth-locator">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-5xl font-sans font-bold text-[var(--color-text-primary)] tracking-tight">
            {t.title}
          </h1>
          <p className="text-[var(--color-text-muted)] font-sans text-xl max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {!result ? (
          <div className="max-w-xl mx-auto p-12 bg-[var(--color-bg-card)] border border-[var(--color-accent-soft)]/20 rounded-sm shadow-warm fade-in">
            <form onSubmit={handleSearch} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-[var(--color-text-primary)]">
                  {language === 'hi' ? 'अपना पिनकोड दर्ज करें' : 'Enter Your Pincode'}
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={id}
                  onChange={(e) => setId(e.target.value.replace(/\D/g, ''))}
                  placeholder="110001"
                  className="w-full bg-[var(--color-bg)] border border-[var(--color-text-primary)]/10 p-4 font-mono text-lg focus:border-[var(--color-accent-blue)] outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isSearching || id.length < 6}
                className="w-full py-5 bg-[var(--color-text-primary)] text-white font-sans uppercase tracking-[0.2em] text-xs font-bold hover:bg-[var(--color-accent-blue)] transition-all disabled:opacity-50"
              >
                {isSearching ? (language === 'hi' ? 'निकटतम बूथ खोज रहे हैं...' : 'Finding Nearest Booth...') : (language === 'hi' ? 'बूथ खोजें' : 'Find Booth')}
              </button>
            </form>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 fade-in">
            {/* Map Mockup */}
            <div className="space-y-6">
              <div className="aspect-video w-full bg-[var(--color-bg-card)] border border-[var(--color-text-primary)]/5 rounded-sm relative overflow-hidden group">
                {/* Fake Map UI */}
                <div className="absolute inset-0 bg-slate-200/50 flex items-center justify-center">
                   <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight="0" 
                    marginWidth="0" 
                    style={{ filter: 'invert(90%) hue-rotate(180deg) contrast(1.2)' }}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(result.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  ></iframe>
                </div>

                {/* Transit Markers Overlays */}
                <div className="absolute top-[30%] left-[40%] group/marker">
                  <div className="flex flex-col items-center gap-1 cursor-pointer hover:scale-110 transition-transform">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                      <span className="text-[10px]">🚌</span>
                    </div>
                    <div className="bg-black/80 backdrop-blur px-2 py-0.5 rounded text-[8px] text-white uppercase tracking-tighter opacity-0 group-hover/marker:opacity-100 transition-opacity">
                      {language === 'hi' ? 'बस स्टॉप' : 'Bus Stop'}
                    </div>
                  </div>
                </div>

                <div className="absolute top-[60%] left-[65%] group/marker">
                  <div className="flex flex-col items-center gap-1 cursor-pointer hover:scale-110 transition-transform">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                      <span className="text-[10px]">🛺</span>
                    </div>
                    <div className="bg-black/80 backdrop-blur px-2 py-0.5 rounded text-[8px] text-white uppercase tracking-tighter opacity-0 group-hover/marker:opacity-100 transition-opacity">
                      {language === 'hi' ? 'रिक्शा स्टैंड' : 'Rickshaw Stand'}
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 left-4 p-4 bg-white/90 backdrop-blur shadow-lg rounded border border-black/5">
                  <div className="text-[var(--color-accent-blue)] font-bold text-lg">Yukti Maps</div>
                  <div className="text-[10px] text-black/40 uppercase tracking-widest">{result.distance} to destination</div>
                </div>
              </div>
              
              <div className="p-8 bg-[var(--color-bg-card)] border border-[var(--color-accent-soft)]/20 rounded-sm">
                <h2 className="text-2xl font-sans font-bold text-[var(--color-text-primary)] mb-2">
                  {result.name}
                </h2>
                <div className="text-[var(--color-accent-blue)] font-sans font-bold text-xs uppercase tracking-widest mb-4">
                  Booth No. {result.boothNo}
                </div>
                <p className="text-[var(--color-text-muted)] font-sans leading-relaxed mb-6">
                  {result.address}
                </p>
                <div className="pt-6 border-t border-[var(--color-text-primary)]/5 flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-sans font-bold text-[var(--color-text-primary)]">
                    {result.route}
                  </span>
                </div>
              </div>
            </div>

            {/* Transportation & Footer */}
            <div className="space-y-8">
              <div className="p-8 bg-[var(--color-bg-card)] border border-[var(--color-accent-soft)]/20 rounded-sm">
                <h3 className="text-xs font-sans font-bold text-[var(--color-accent-blue)] uppercase tracking-[0.4em] mb-8">
                  {language === 'hi' ? 'परिवहन सुझाव' : 'Recommended Transit'}
                </h3>
                <div className="space-y-6">
                  {result.transport.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-[var(--color-bg)] border border-[var(--color-text-primary)]/5 rounded hover:border-[var(--color-accent-blue)] transition-all cursor-default">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <div className="font-sans font-bold text-[var(--color-text-primary)]">{item.mode}</div>
                          <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest">{language === 'hi' ? 'सबसे छोटा रास्ता' : 'Fastest Route'}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-sans font-bold text-[var(--color-accent-blue)]">{item.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 border border-[var(--color-text-primary)]/10 rounded-sm space-y-6">
                <p className="text-sm text-[var(--color-text-muted)] font-sans text-center">
                  {language === 'hi' ? 'भीड़ की स्थिति या पार्किंग के बारे में युक्ति से पूछें' : 'Ask Yukti about crowd levels or parking availability'}
                </p>
                <button
                  onClick={handleAskYukti}
                  className="w-full py-4 bg-[var(--color-text-primary)] text-white font-sans uppercase tracking-[0.2em] text-xs font-bold hover:bg-[var(--color-accent-blue)] transition-all"
                >
                  {language === 'hi' ? 'युक्ति से पूछें' : 'Ask Yukti'} &rarr;
                </button>
                <button
                  onClick={() => setResult(null)}
                  className="w-full text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)] transition-colors"
                >
                  {language === 'hi' ? 'पुनः खोजें' : 'Search Different ID'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}