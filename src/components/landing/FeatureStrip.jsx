import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../constants/translations';
import { Smartphone, MapPin, Search, FileText, AlertTriangle, MessageSquare, Newspaper, Route } from 'lucide-react';

const featuresEn = [
  { name: "EVM Simulator", desc: "Experience voting before election day", path: "/evm", icon: Smartphone },
  { name: "Booth Locator", desc: "Find your polling booth in seconds", path: "/booth", icon: MapPin },
  { name: "Constituency Finder", desc: "Enter your pincode, know your seat", path: "/constituency", icon: Search },
  { name: "Form 6 Guide", desc: "Register to vote, step by step", path: "/register", icon: FileText },
  { name: "Report Misconduct", desc: "Report issues with one tap", path: "/report", icon: AlertTriangle },
  { name: "Chat with Yukti", desc: "Ask anything about elections", path: "/chat", icon: MessageSquare },
  { name: "Election News", desc: "Live election updates", path: "/news", icon: Newspaper },
  { name: "Voter Journey", desc: "Your personal voter roadmap", path: "/journey", icon: Route },
];

const featuresHi = [
  { name: "ईवीएम सिम्युलेटर", desc: "चुनाव दिन से पहले मतदान का अनुभव करें", path: "/evm", icon: Smartphone },
  { name: "बूथ खोजक", desc: "सेकंडों में अपना मतदान केंद्र खोजें", path: "/booth", icon: MapPin },
  { name: "निर्वाचन क्षेत्र खोजक", desc: "पिनकोड दर्ज करें, अपनी सीट जानें", path: "/constituency", icon: Search },
  { name: "फॉर्म 6 गाइड", desc: "मतदाता पंजीकरण, कदम दर कदम", path: "/register", icon: FileText },
  { name: "कदाचार रिपोर्ट", desc: "एक टैप में समस्या रिपोर्ट करें", path: "/report", icon: AlertTriangle },
  { name: "युक्ति से चैट", desc: "चुनाव के बारे में कुछ भी पूछें", path: "/chat", icon: MessageSquare },
  { name: "चुनाव समाचार", desc: "लाइव चुनाव अपडेट", path: "/news", icon: Newspaper },
  { name: "मतदाता यात्रा", desc: "आपका व्यक्तिगत मतदाता रोडमैप", path: "/journey", icon: Route },
];

export default function FeatureStrip() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].home;
  const features = language === 'hi' ? featuresHi : featuresEn;
  const duplicatedFeatures = [...features, ...features];

  return (
    <section className="py-24 bg-[var(--color-bg-card)] overflow-hidden relative" id="features-section">
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-3xl font-sans font-semibold text-[var(--color-text-primary)] uppercase tracking-widest opacity-60">
            {t.featureStripTitle}
          </h2>
        </div>
      </div>

      <div className="w-full relative group">
        <div 
          className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused] px-4"
        >
          {duplicatedFeatures.map((feature, idx) => (
            <Link
              key={idx}
              to={feature.path}
              className="flex-shrink-0 w-[320px] p-8 bg-[var(--color-bg)] border border-[var(--color-accent-soft)]/10 hover:border-[var(--color-accent-blue)] transition-colors group/card shadow-warm block relative rounded-xl"
            >
              <div className="mb-6 w-12 h-12 flex items-center justify-center rounded-2xl bg-[var(--color-bg-card)] text-[var(--color-text-primary)] group-hover/card:bg-[var(--color-accent-blue)] group-hover/card:text-white transition-all duration-300 shadow-sm">
                {feature.icon && <feature.icon size={24} strokeWidth={1.5} />}
              </div>
              <h3 className="text-xl font-sans font-semibold mb-4 text-[var(--color-text-primary)] group-hover/card:text-[var(--color-accent-blue)] transition-colors">
                {feature.name}
              </h3>
              <p className="text-[var(--color-text-muted)] font-sans text-sm">
                {feature.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-20 text-center relative z-10">
        <Link
          to="/journey"
          className="inline-block px-12 py-5 bg-[var(--color-text-primary)] text-[var(--color-white)] font-sans uppercase tracking-[0.2em] text-sm hover:bg-[var(--color-accent-blue)] transition-colors shadow-warm-lg rounded-full"
          id="feature-strip-cta"
        >
          {t.footerCtaJourney} &rarr;
        </Link>
      </div>
    </section>
  );
}