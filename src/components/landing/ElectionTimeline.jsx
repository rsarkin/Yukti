import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../constants/translations';
import { TIMELINE_STEPS } from '../../constants/electionData';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const timelineStepsHi = [
  { id: 1, title: "चुनाव की घोषणा", info: "भारत निर्वाचन आयोग चुनाव कार्यक्रम की घोषणा करता है और आदर्श आचार संहिता तुरंत लागू हो जाती है।", image: "/timeline_1.png" },
  { id: 2, title: "नामांकन खुले", info: "उम्मीदवार अपने नामांकन पत्र दाखिल करते हैं। जांच और वापसी की अवधि होती है।", image: "/timeline_2.png" },
  { id: 3, title: "प्रचार अवधि", info: "राजनीतिक दल और उम्मीदवार मतदाताओं से जुड़ने के लिए प्रचार करते हैं। मतदान से 48 घंटे पहले प्रचार बंद हो जाता है।", image: "/timeline_3.png" },
  { id: 4, title: "मतदान दिवस", info: "पंजीकृत मतदाता अपने निर्धारित मतदान केंद्रों पर EVM के माध्यम से वोट डालते हैं।", image: "/timeline_4.png" },
  { id: 5, title: "गणना दिवस", info: "EVM में दर्ज वोटों की कड़ी सुरक्षा में गिनती होती है। परिणाम निर्वाचन क्षेत्रवार घोषित किए जाते हैं।", image: "/timeline_5.png" },
  { id: 6, title: "सरकार गठन", info: "बहुमत प्राप्त दल या गठबंधन को राष्ट्रपति द्वारा सरकार बनाने के लिए आमंत्रित किया जाता है।", image: "/timeline_6.png" },
];

export default function ElectionTimeline() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].home;
  const [activeStep, setActiveStep] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const steps = language === 'hi' ? timelineStepsHi : TIMELINE_STEPS;
  const active = steps.find(s => s.id === activeStep);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep(prev => (prev === steps.length ? 1 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, steps.length]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveStep(p => Math.min(p + 1, steps.length));
  };
  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveStep(p => Math.max(p - 1, 1));
  };
  const handleStepClick = (id) => {
    setIsAutoPlaying(false);
    setActiveStep(id);
  };

  return (
    <section className="py-24 bg-[var(--color-bg)] overflow-hidden" id="timeline-section">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-sans font-bold text-center mb-10 md:mb-16 text-[var(--color-text-primary)] tracking-tight">
          {t.timelineTitle}
        </h2>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Side: Images & Visuals */}
          <div className="w-full lg:w-1/2 flex justify-center relative">
            <div className="w-full max-w-[450px] aspect-square relative rounded-3xl overflow-hidden bg-[var(--color-bg-card)] border border-[var(--color-accent-soft)]/20 shadow-2xl flex items-center justify-center p-8">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeStep}
                  src={active.image}
                  alt={active.title}
                  initial={{ opacity: 0, scale: 0.9, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full h-full object-contain"
                />
              </AnimatePresence>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[var(--color-accent-blue)]/5 blur-3xl rounded-full"></div>
          </div>

          {/* Right Side: Interactive Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">

            {/* Timeline Progress Indicators */}
            <div className="flex items-center gap-3 mb-10">
              {steps.map((step) => (
                <div key={step.id} className="relative flex-1 group cursor-pointer" onClick={() => handleStepClick(step.id)}>
                  <div className="h-1.5 w-full bg-[var(--color-accent-soft)]/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={false}
                      animate={{ width: activeStep >= step.id ? '100%' : '0%' }}
                      transition={{ duration: 0.4 }}
                      className={`h-full ${activeStep === step.id ? 'bg-[var(--color-accent-blue)]' : 'bg-[var(--color-text-muted)]'}`}
                    />
                  </div>
                  <div className={`mt-2 text-xs font-bold transition-colors duration-300 ${activeStep === step.id ? 'text-[var(--color-accent-blue)]' : 'text-[var(--color-text-muted)]/50 group-hover:text-[var(--color-text-muted)]'}`}>
                    0{step.id}
                  </div>
                </div>
              ))}
            </div>

            {/* Content Display */}
            <div className="min-h-[150px] md:min-h-[180px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl md:text-4xl font-sans font-bold text-[var(--color-text-primary)] mb-3 md:mb-4">
                    {active.title}
                  </h3>
                  <p className="text-base md:text-xl text-[var(--color-text-muted)] font-sans leading-relaxed">
                    {active.info}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mt-8 pt-8 border-t border-[var(--color-accent-soft)]/20">
              <button
                onClick={handlePrev}
                disabled={activeStep === 1}
                className="w-12 h-12 rounded-full flex items-center justify-center bg-[var(--color-bg-card)] border border-[var(--color-accent-soft)]/30 text-[var(--color-text-primary)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--color-accent-soft)]/10 transition-colors"
                aria-label="Previous Step"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button
                onClick={handleNext}
                disabled={activeStep === steps.length}
                className="w-12 h-12 rounded-full flex items-center justify-center bg-[var(--color-bg-card)] border border-[var(--color-accent-soft)]/30 text-[var(--color-text-primary)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--color-accent-soft)]/10 transition-colors"
                aria-label="Next Step"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <Link to="/chat" className="ml-auto px-6 py-3 rounded-full bg-[var(--color-accent-blue)] text-white font-semibold text-sm md:text-base hover:shadow-[0_0_20px_rgba(91,141,184,0.4)] transition-all flex items-center gap-2">
                {language === 'hi' ? 'युक्ति से पूछें' : 'Ask Yukti'}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}