import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../constants/translations';

const MOCK_NEWS = [
  {
    id: 1,
    headline: "Election Commission Announces Phase-wise Schedule for 2026 State Elections",
    summary: "The ECI has released the detailed schedule for upcoming state assembly elections across five states, with polling dates spread across three phases starting next month.",
    content: "The Election Commission of India (ECI) today announced the full schedule for the upcoming General Assembly elections in five major states. Chief Election Commissioner Rajiv Kumar, in a televised press briefing, stated that the polls will be conducted in three distinct phases to ensure maximum security and voter turnout.\n\nPhase 1 will cover 42 constituencies and is scheduled for the 15th of next month. Phase 2 will follow ten days later, covering the central industrial belts, and Phase 3 will conclude the process in the northern hilly regions. The Model Code of Conduct (MCC) has come into effect immediately with this announcement. The ECI has also mandated the use of VVPAT units at every single polling station to maintain the highest levels of transparency.",
    source: "Press Trust of India",
    timeAgo: "2 hours ago",
    image: "/election_schedule_news_1777577319910.png",
    featured: true
  },
  {
    id: 2,
    headline: "Supreme Court Upholds VVPAT Cross-Verification Procedure",
    summary: "In a landmark ruling, the Supreme Court has affirmed the current VVPAT verification process while suggesting enhanced transparency measures.",
    content: "A two-judge bench of the Supreme Court has dismissed petitions seeking 100% cross-verification of VVPAT slips with EVM counts. The court noted that the current system of auditing a randomly selected sample of five polling stations per assembly constituency is statistically robust and ensures the integrity of the vote. However, the bench recommended that the Election Commission explore electronic 'reading' of VVPAT slips to speed up the counting process in the future.",
    source: "The Hindu",
    timeAgo: "5 hours ago",
    image: "/vvpat_court_news_1777577333060.png",
    category: "Justice"
  },
  {
    id: 3,
    headline: "ECI Launches Voter Awareness Campaign for First-Time Voters",
    summary: "A nationwide digital campaign targeting over 15 million newly eligible voters aims to increase participation in the 18-22 age group.",
    content: "Recognizing the growing demographic of young voters, the Election Commission has launched 'Mera Pehla Vote'—a massive digital outreach program. The campaign features interactive simulations, much like the Yukti platform, to help young citizens navigate the registration process. ECI officials emphasized that 'informed participation' is the cornerstone of a healthy democracy.",
    source: "Indian Express",
    timeAgo: "1 day ago",
    image: "/voter_awareness_news_1777577348742.png",
    category: "Outreach"
  },
  {
    id: 4,
    headline: "Model Code of Conduct: Key Guidelines Every Voter Should Know",
    summary: "With elections approaching, the ECI has issued a detailed explainer on the Model Code of Conduct and what it means for citizens.",
    content: "The Model Code of Conduct (MCC) is a set of guidelines issued by the Election Commission to regulate the conduct of political parties and candidates. Key restrictions include the ban on announcing new financial grants, laying foundation stones for projects after the poll dates are announced, and the use of official machinery for campaigning. Citizens are encouraged to use the cVIGIL app (or the Yukti reporting tool) to flag any violations.",
    source: "NDTV",
    timeAgo: "1 day ago",
    image: "/mcc_guidelines_news_1777577488820.png",
    category: "Policy"
  },
  {
    id: 5,
    headline: "Digital Voter ID Now Accepted at All Polling Stations Nationwide",
    summary: "The ECI has confirmed that the e-EPIC downloaded from the Voter Helpline app is now valid identification at every polling booth.",
    content: "In a move towards a 'Digital India,' the ECI has officially notified all State Election Officers to accept the e-EPIC as a valid document for voting. Voters can download their digital IDs via the National Voters Service Portal (NVSP). This initiative is expected to reduce the dependency on physical voter slips which often fail to reach voters in remote areas.",
    source: "Hindustan Times",
    timeAgo: "2 days ago",
    image: "/digital_voter_id_news_1777577505083.png",
    category: "Tech"
  },
  {
    id: 6,
    headline: "Flying Squads Seize Unaccounted Cash in Pre-election Drive",
    summary: "Over ₹50 Crore in unaccounted cash has been seized by ECI flying squads across multiple constituencies in a major crackdown on illegal inducements.",
    content: "ECI Flying Squads and Static Surveillance Teams have intensified their crackdown on the movement of unaccounted cash and liquor. Recent raids in sensitive districts have led to significant seizures. The Commission has reiterated its commitment to a 'money-free' and 'inducement-free' election, urging citizens to stay vigilant.",
    source: "News18",
    timeAgo: "3 days ago",
    image: "/flying_squad_seizure_news_1777577521199.png",
    category: "Enforcement"
  }
];

const NewsSkeleton = () => (
  <div className="space-y-12 animate-pulse">
    <div className="grid grid-cols-1 lg:grid-cols-2 bg-[var(--color-bg-card)] h-[500px] border border-[var(--color-text-primary)]/5">
      <div className="bg-gray-200/20 w-full h-full" />
      <div className="p-12 space-y-6 flex flex-col justify-center">
        <div className="h-4 bg-gray-200/20 w-1/4" />
        <div className="h-12 bg-gray-200/20 w-3/4" />
        <div className="h-24 bg-gray-200/20 w-full" />
        <div className="h-6 bg-gray-200/20 w-1/4" />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-[var(--color-bg-card)] border border-[var(--color-text-primary)]/5 h-[450px] flex flex-col">
          <div className="h-48 bg-gray-200/20 w-full" />
          <div className="p-8 space-y-4">
            <div className="flex justify-between">
              <div className="h-3 bg-gray-200/20 w-1/4" />
              <div className="h-3 bg-gray-200/20 w-1/4" />
            </div>
            <div className="h-8 bg-gray-200/20 w-full" />
            <div className="h-20 bg-gray-200/20 w-full" />
            <div className="h-4 bg-gray-200/20 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ArticleModal = ({ article, onClose, language }) => {
  if (!article) return null;
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 50, scale: 0.9 }} 
        animate={{ y: 0, scale: 1 }} 
        exit={{ y: 50, scale: 0.9 }}
        className="bg-[var(--color-bg)] w-full max-w-5xl max-h-full overflow-y-auto relative shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 w-12 h-12 bg-black text-white flex items-center justify-center z-10 hover:bg-[var(--color-accent-blue)] transition-colors">
          ✕
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="h-[300px] lg:h-screen sticky top-0">
            <img src={article.image} alt={article.headline} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 md:p-16 space-y-8">
             <div className="space-y-4">
                <div className="flex items-center gap-4 text-[var(--color-accent-blue)] text-xs font-bold uppercase tracking-widest">
                  <span>{article.source}</span>
                  <span className="w-1 h-1 bg-current rounded-full" />
                  <span>{article.timeAgo}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-sans font-bold text-[var(--color-text-primary)] leading-[1.1] tracking-tight">
                  {article.headline}
                </h2>
             </div>
             
             <div className="prose prose-lg">
                <p className="text-xl text-[var(--color-text-muted)] font-sans leading-relaxed italic border-l-4 border-[var(--color-accent-blue)] pl-6 py-2">
                  {article.summary}
                </p>
                <div className="text-[var(--color-text-primary)] font-sans leading-loose space-y-6 mt-12 whitespace-pre-line">
                  {article.content}
                </div>
             </div>

             <div className="pt-12 border-t border-[var(--color-text-primary)]/5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                  {language === 'hi' ? 'युक्ति समाचार नेटवर्क द्वारा सत्यापित' : 'Verified by Yukti News Network'}
                </p>
             </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function ElectionNews() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].news;

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 1500);
  };

  const featuredNews = MOCK_NEWS.find(n => n.featured);
  const otherNews = MOCK_NEWS.filter(n => !n.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        <AnimatePresence>
          {selectedArticle && (
            <ArticleModal 
              article={selectedArticle} 
              onClose={() => setSelectedArticle(null)} 
              language={language}
            />
          )}
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16"
        >
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-6xl font-sans font-bold text-[var(--color-text-primary)] tracking-tight mb-4">{t.title}</h1>
            <p className="text-base md:text-lg text-[var(--color-text-muted)] font-sans">{language === 'hi' ? 'चुनाव आयोग से नवीनतम अपडेट और रिपोर्ट।' : 'Latest updates and verified reports from the Election Commission.'}</p>
          </div>
          
          <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[var(--color-bg-card)] border border-[var(--color-text-primary)]/10 px-4 md:px-6 py-3 md:py-4 focus:outline-none focus:border-[var(--color-accent-blue)] font-sans text-sm w-full md:w-80 transition-all"
              placeholder={t.searchPlaceholder}
            />
            <button
              type="submit"
              className="px-4 md:px-6 bg-[var(--color-text-primary)] text-white font-sans uppercase tracking-widest text-[10px] font-bold hover:bg-[var(--color-accent-blue)] transition-all"
            >
              {t.search}
            </button>
          </form>
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading || isSearching ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <NewsSkeleton />
            </motion.div>
          ) : (
            <motion.div key="content" variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 md:space-y-12">
              {featuredNews && (
                <motion.article 
                  variants={itemVariants}
                  onClick={() => setSelectedArticle(featuredNews)}
                  className="group cursor-pointer grid grid-cols-1 lg:grid-cols-2 bg-[var(--color-bg-card)] overflow-hidden border border-[var(--color-text-primary)]/5 hover:border-[var(--color-accent-blue)]/20 transition-all shadow-2xl"
                >
                  <div className="relative h-[250px] md:h-[400px] lg:h-full overflow-hidden">
                    <img src={featuredNews.image} alt={featuredNews.headline} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-[var(--color-accent-blue)] text-white text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] px-3 md:px-4 py-1.5 md:py-2">
                      {language === 'hi' ? 'विशेष' : 'Featured Story'}
                    </div>
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center space-y-4 md:space-y-6">
                    <div className="flex items-center gap-4 text-[var(--color-accent-blue)] text-[10px] font-bold uppercase tracking-widest">
                      <span>{featuredNews.source}</span>
                      <span className="w-1 h-1 bg-current rounded-full" />
                      <span>{featuredNews.timeAgo}</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-sans font-bold text-[var(--color-text-primary)] leading-tight group-hover:text-[var(--color-accent-blue)] transition-colors">
                      {featuredNews.headline}
                    </h2>
                    <p className="text-base md:text-lg text-[var(--color-text-muted)] font-sans leading-relaxed line-clamp-3 md:line-clamp-none">
                      {featuredNews.summary}
                    </p>
                    <button className="self-start text-[10px] font-bold uppercase tracking-widest border-b-2 border-[var(--color-accent-blue)] pb-1 text-[var(--color-text-primary)] hover:translate-x-2 transition-transform">
                      {language === 'hi' ? 'पूरा लेख पढ़ें' : 'Read Full Article'} &rarr;
                    </button>
                  </div>
                </motion.article>
              )}

              <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherNews.map((item, idx) => (
                  <motion.article 
                    key={idx} 
                    variants={itemVariants}
                    whileHover={{ y: -10 }}
                    onClick={() => setSelectedArticle(item)}
                    className="group cursor-pointer bg-[var(--color-bg-card)] border border-[var(--color-text-primary)]/5 overflow-hidden flex flex-col hover:shadow-2xl transition-all hover:border-[var(--color-accent-blue)]/20"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img src={item.image} alt={item.headline} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      {item.category && (
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-[8px] font-bold uppercase tracking-widest text-black">
                          {item.category}
                        </div>
                      )}
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent-blue)]">{item.source}</span>
                        <span className="text-[10px] text-[var(--color-text-muted)]">{item.timeAgo}</span>
                      </div>
                      <h3 className="text-xl font-sans font-bold text-[var(--color-text-primary)] mb-4 leading-tight group-hover:text-[var(--color-accent-blue)] transition-colors">
                        {item.headline}
                      </h3>
                      <p className="text-sm text-[var(--color-text-muted)] font-sans leading-relaxed line-clamp-3 mb-6">
                        {item.summary}
                      </p>
                      <button className="mt-auto self-start text-[8px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-blue)] transition-colors">
                        {language === 'hi' ? 'विस्तार से' : 'Read More'} +
                      </button>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-20 p-8 border border-dashed border-[var(--color-caramel)]/30 bg-[var(--color-caramel)]/5 rounded-sm"
        >
          <div className="flex items-start gap-4">
            <span className="text-2xl">⚖️</span>
            <div>
              <p className="text-[var(--color-text-primary)] font-sans font-bold text-xs uppercase tracking-widest mb-2">Verified Content Only</p>
              <p className="text-[var(--color-text-muted)] font-sans text-xs leading-relaxed">{t.disclaimer}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}