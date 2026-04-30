import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../constants/translations';

const WhyVoteCard = ({ icon: Icon, title, text, delay }) => (
  <div
    className="flex flex-col items-start p-8 bg-[var(--color-bg)] border border-[var(--color-bg-card)] hover:border-[var(--color-accent-blue)]/30 transition-all duration-500"
    style={{ transitionDelay: delay }}
  >
    <div className="mb-6">
      <Icon />
    </div>
    <h3 className="text-2xl font-sans font-semibold mb-4 text-[var(--color-text-primary)]">{title}</h3>
    <p className="text-[var(--color-text-muted)] font-sans leading-relaxed">{text}</p>
  </div>
);

/* SVG Line Art Icons (no fill, stroke only, per PRD) */
const ScrollIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-[var(--color-accent-blue)]" aria-hidden="true">
    <path d="M4 19.5V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v15.5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5z" />
    <path d="M19 15.5H7.5a1.5 1.5 0 0 0-1.5 1.5v1.5a1.5 1.5 0 0 0 1.5 1.5H19" />
  </svg>
);

const ScaleIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-[var(--color-caramel)]" aria-hidden="true">
    <path d="M12 3v18M3 7h18M6 7l-3 5h6l-3-5zm12 0l-3 5h6l-3-5zM9 12a3 3 0 0 1-6 0m18 0a3 3 0 0 1-6 0" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-[var(--color-accent-blue)]" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default function WhyVote() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].home;

  const cards = [
    {
      icon: ScrollIcon,
      title: language === 'hi' ? 'आपका संवैधानिक अधिकार' : 'Your Constitutional Right',
      text: language === 'hi'
        ? 'संविधान का अनुच्छेद 326 आपके मतदान के अधिकार को हमारे गणराज्य के मूलभूत स्तंभ के रूप में गारंटी देता है।'
        : 'Article 326 of the Constitution guarantees your right to vote as a fundamental pillar of our republic.',
      delay: '0s',
    },
    {
      icon: ScaleIcon,
      title: language === 'hi' ? 'एक वोट = असली शक्ति' : 'One Vote = Real Power',
      text: language === 'hi'
        ? '1968 में, राजस्थान की एक विधानसभा सीट ठीक 1 वोट से जीती गई थी। हर एक मत मायने रखता है।'
        : 'In 1968, a Rajasthan assembly seat was decided by exactly 1 vote. Every single ballot counts.',
      delay: '0.3s',
    },
    {
      icon: GlobeIcon,
      title: language === 'hi' ? "विश्व का सबसे बड़ा लोकतंत्र" : "World's Largest Democracy",
      text: language === 'hi'
        ? 'भारत पृथ्वी पर सबसे बड़ा लोकतांत्रिक अभ्यास आयोजित करता है। इस ऐतिहासिक प्रक्रिया का हिस्सा बनें।'
        : 'India conducts the largest democratic exercise on Earth. Be part of this historical process.',
      delay: '0.6s',
    },
  ];

  return (
    <section className="py-24 bg-[var(--color-bg-card)]" id="why-vote-section">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {cards.map((card, idx) => (
            <WhyVoteCard key={idx} {...card} />
          ))}
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <p className="text-3xl md:text-4xl font-sans font-bold text-[var(--color-text-primary)] leading-snug">
            &ldquo;{t.whyVoteQuote}&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}