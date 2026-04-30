import { useEffect, useState, useRef } from 'react';
import { useCounterAnimation } from '../../hooks/useCounterAnimation';
import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../constants/translations';

const statLabelsHi = ["करोड़ मतदाता", "लोक सभा सीटें", "राज्य + केंद्र शासित", "लाख मतदान केंद्र"];

const StatCard = ({ end, label, suffix = "", labelHi }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();
  const count = useCounterAnimation(isVisible ? end : 0);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setIsVisible(true);
    });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={domRef} className="p-8 text-center bg-[var(--color-bg-card)] border border-[var(--color-accent-soft)]/20 rounded-sm">
      <div className="text-4xl md:text-5xl font-sans font-bold text-[var(--color-accent-blue)] mb-2">
        {count}{suffix}
      </div>
      <div className="text-[var(--color-text-muted)] font-sans uppercase tracking-widest text-sm">
        {labelHi || label}
      </div>
    </div>
  );
};

export default function StatsSection() {
  const { language } = useLanguage();

  const stats = [
    { end: 969, label: "Million Voters", suffix: "M", labelHi: language === 'hi' ? statLabelsHi[0] : null },
    { end: 543, label: "Lok Sabha Seats", labelHi: language === 'hi' ? statLabelsHi[1] : null },
    { end: 36, label: "States + UTs", labelHi: language === 'hi' ? statLabelsHi[2] : null },
    { end: 17, label: "Lakh Polling Booths", suffix: "L", labelHi: language === 'hi' ? statLabelsHi[3] : null },
  ];

  return (
    <section className="py-20 bg-[var(--color-bg)]" id="stats-section">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}