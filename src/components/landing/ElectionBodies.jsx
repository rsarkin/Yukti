import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../constants/translations';
import { Landmark, UserCheck, ShieldCheck } from 'lucide-react';

const bodiesEn = [
  {
    title: "Election Commission of India",
    text: "The independent constitutional body that manages all aspects of elections, from scheduling to enforcement of the Model Code of Conduct.",
    icon: Landmark,
  },
  {
    title: "Returning Officer",
    text: "The administrative officer at the district level responsible for the entire election process in a specific constituency.",
    icon: UserCheck,
  },
  {
    title: "Election Observer",
    text: "Officials appointed by the ECI to oversee the polling process on the ground, ensuring it is free, fair, and transparent.",
    icon: ShieldCheck,
  },
];

const bodiesHi = [
  {
    title: "भारत निर्वाचन आयोग",
    text: "स्वतंत्र संवैधानिक निकाय जो चुनावों के सभी पहलुओं का प्रबंधन करता है, कार्यक्रम निर्धारण से लेकर आदर्श आचार संहिता के प्रवर्तन तक।",
    icon: Landmark,
  },
  {
    title: "रिटर्निंग ऑफिसर",
    text: "जिला स्तर पर प्रशासनिक अधिकारी जो एक विशिष्ट निर्वाचन क्षेत्र में पूरी चुनाव प्रक्रिया के लिए जिम्मेदार होता है।",
    icon: UserCheck,
  },
  {
    title: "चुनाव पर्यवेक्षक",
    text: "ECI द्वारा नियुक्त अधिकारी जो मतदान प्रक्रिया की निगरानी करते हैं, यह सुनिश्चित करते हुए कि यह स्वतंत्र, निष्पक्ष और पारदर्शी हो।",
    icon: ShieldCheck,
  },
];

const BodyCard = ({ title, text, icon: Icon }) => (
  <div className="p-10 bg-[var(--color-bg)] border border-[var(--color-bg-card)] hover:bg-[var(--color-bg-card)]/50 transition-colors duration-300 flex flex-col items-start group">
    <div className="mb-6 w-14 h-14 flex items-center justify-center rounded-2xl bg-[var(--color-bg-card)] text-[var(--color-accent-blue)] group-hover:bg-[var(--color-accent-blue)] group-hover:text-white transition-colors duration-300">
      {Icon && <Icon size={28} strokeWidth={1.5} />}
    </div>
    <div className="w-12 h-[1px] bg-[var(--color-accent-blue)] mb-6 opacity-30"></div>
    <h3 className="text-2xl font-sans font-semibold mb-4 text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-blue)] transition-colors">{title}</h3>
    <p className="text-[var(--color-text-muted)] font-sans leading-relaxed">{text}</p>
  </div>
);

export default function ElectionBodies() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].home;
  const bodies = language === 'hi' ? bodiesHi : bodiesEn;

  return (
    <section className="py-24 bg-[var(--color-bg)]" id="election-bodies-section">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-sans font-semibold text-center mb-20 text-[var(--color-text-primary)]">
          {t.bodiesTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bodies.map((body, idx) => (
            <BodyCard key={idx} {...body} />
          ))}
        </div>
      </div>
    </section>
  );
}