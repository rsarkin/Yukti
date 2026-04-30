import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../constants/translations';
import { VotingIcon, LocationIcon } from '../icons/LineIcons';

export default function VotingPrep() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const t = TRANSLATIONS[language];

  const modules = [
    {
      id: 'evm',
      title: language === 'hi' ? 'ईवीएम सिम्युलेटर' : 'EVM Simulator',
      subtitle: language === 'hi' ? 'वोट डालने का अभ्यास करें' : 'Practice your vote',
      desc: language === 'hi' 
        ? 'ईवीएम मशीन का उपयोग करना सीखें ताकि मतदान के दिन आप पूरी तरह तैयार रहें।' 
        : 'Experience the real voting process. Learn how to use the Ballot and Control units before you step into the booth.',
      path: '/evm',
      icon: <VotingIcon />,
      color: 'var(--color-accent-blue)'
    },
    {
      id: 'booth',
      title: language === 'hi' ? 'बूथ लोकेटर' : 'Booth Locator',
      subtitle: language === 'hi' ? 'अपना केंद्र खोजें' : 'Find your station',
      desc: language === 'hi' 
        ? 'पिनकोड का उपयोग करके अपने नजदीकी मतदान केंद्र का पता लगाएं और वहां पहुंचने का सबसे अच्छा रास्ता देखें।' 
        : 'Locate your designated polling station using your Pincode and get real-time transit recommendations.',
      path: '/booth',
      icon: <LocationIcon />,
      color: 'var(--color-accent-blue)'
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-20 space-y-4">
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-[var(--color-text-primary)] tracking-tight">
            {language === 'hi' ? 'मतदान की तैयारी' : 'Voting Preparation'}
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto font-sans leading-relaxed px-4">
            {language === 'hi' 
              ? 'मतदान के दिन के लिए तैयार हो जाइए। अपनी मशीन का अभ्यास करें और अपना स्थान खोजें।' 
              : 'Everything you need to be ready for election day. Practice the process and find your way to the booth.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {modules.map((mod) => (
            <div 
              key={mod.id}
              onClick={() => navigate(mod.path)}
              className="group relative bg-[var(--color-bg-card)] border border-[var(--color-text-primary)]/5 p-8 md:p-12 cursor-pointer hover:border-[var(--color-accent-blue)]/30 transition-all duration-500 overflow-hidden shadow-2xl flex flex-col h-full"
            >
              {/* Identical Background Accent Animation */}
              <div 
                className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.1] group-hover:scale-150 transition-all duration-700 ease-in-out"
                style={{ backgroundColor: mod.color, clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
              />

              <div className="relative z-10 flex flex-col h-full space-y-12">
                {/* Header Section */}
                <div className="flex justify-between items-center">
                  <div className="w-16 h-16 bg-[var(--color-bg)] rounded-2xl flex items-center justify-center text-[var(--color-accent-blue)] shadow-inner group-hover:shadow-lg transition-all duration-500" style={{ color: mod.color }}>
                    <div className="scale-150 transition-transform duration-500">{mod.icon}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-blue)] transition-colors duration-500">
                      {language === 'hi' ? 'शुरू करें' : 'Get Ready'}
                    </span>
                    <span className="text-lg group-hover:translate-x-2 transition-transform duration-500">→</span>
                  </div>
                </div>

                {/* Content Section (Flex-grow ensures symmetry) */}
                <div className="space-y-6 flex-grow">
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent-blue)] mb-3" style={{ color: mod.color }}>
                      {mod.subtitle}
                    </h3>
                    <h2 className="text-4xl font-sans font-bold text-[var(--color-text-primary)] tracking-tight">
                      {mod.title}
                    </h2>
                  </div>
                  <p className="text-lg text-[var(--color-text-muted)] leading-relaxed font-sans">
                    {mod.desc}
                  </p>
                </div>

                {/* Footer Section */}
                <div className="pt-8 border-t border-[var(--color-text-primary)]/5 flex items-center gap-4">
                   <div className="w-12 h-[1px] bg-[var(--color-accent-blue)] group-hover:w-20 transition-all duration-500" style={{ backgroundColor: mod.color }} />
                   <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-primary)]">
                    {language === 'hi' ? 'मॉड्यूल दर्ज करें' : 'Enter Module'}
                   </span>
                </div>
              </div>

              {/* Identical Hover Glow Animation */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[var(--color-accent-blue)]/5 rounded-full blur-[100px] group-hover:bg-[var(--color-accent-blue)]/20 group-hover:scale-125 transition-all duration-700" />
            </div>
          ))}
        </div>

        {/* Support Section */}
        <div className="mt-20 text-center space-y-6">
           <div className="inline-block p-4 bg-[var(--color-bg-card)] border border-dashed border-[var(--color-text-primary)]/10 rounded-full px-8 hover:border-[var(--color-accent-blue)] transition-colors">
              <p className="text-sm text-[var(--color-text-muted)] font-sans">
                {language === 'hi' ? 'कुछ और चाहिए? हमारे ' : 'Need more help? Check our '}
                <button onClick={() => navigate('/journey')} className="text-[var(--color-accent-blue)] font-bold hover:underline">
                  {language === 'hi' ? 'मतदाता यात्रा' : 'Voter Journey'}
                </button>
                {language === 'hi' ? ' पर वापस जाएं' : ' guide'}
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
