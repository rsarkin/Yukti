import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../constants/translations';
import { MISCONDUCT_CATEGORIES } from '../../constants/electionData';
import { useGoogleServices } from '../../hooks/useGoogleServices';

const ADVICE = {
  en: {
    bribery: "DO NOT accept any cash or gifts. If safe, discreetly record video or take photos. Report to the Flying Squad via cVIGIL app immediately.",
    intimidation: "PRIORITIZE YOUR SAFETY. Move away from the area. Call 100 or 112. Inform the nearest Polling Officer or Police personnel.",
    fakenews: "Save copies of the content (screenshots/links). Do not circulate the content further as it may cause more tension.",
    evmtampering: "Notify the Presiding Officer immediately. If they are involved, contact the Sector Magistrate or use the National Voter Helpline (1950).",
    boothcapture: "Stay away from the booth. Do not enter. Call 112 immediately and notify the Returning Officer or Election Observers.",
    mcc: "Document the vehicle numbers or office details. Take photos of official machinery being used for campaigning.",
    other: "Document the incident with as much detail as possible. Contact the Election Commission helpline (1950) for specific guidance."
  },
  hi: {
    bribery: "कोई भी नकद या उपहार स्वीकार न करें। यदि सुरक्षित हो, तो विवेकपूर्ण तरीके से वीडियो रिकॉर्ड करें या फोटो लें। तुरंत cVIGIL ऐप के माध्यम से फ्लाइंग स्क्वाड को रिपोर्ट करें।",
    intimidation: "अपनी सुरक्षा को प्राथमिकता दें। क्षेत्र से दूर हटें। 100 या 112 पर कॉल करें। निकटतम मतदान अधिकारी या पुलिस कर्मियों को सूचित करें।",
    fakenews: "सामग्री की प्रतियां (स्क्रीनशॉट/लिंक) सहेजें। सामग्री को आगे प्रसारित न करें क्योंकि इससे तनाव बढ़ सकता है।",
    evmtampering: "पीठासीन अधिकारी को तुरंत सूचित करें। यदि वे शामिल हैं, तो सेक्टर मजिस्ट्रेट से संपर्क करें या राष्ट्रीय मतदाता हेल्पलाइन (1950) का उपयोग करें।",
    boothcapture: "बूथ से दूर रहें। अंदर न जाएं। तुरंत 112 पर कॉल करें और रिटर्निंग ऑफिसर या चुनाव पर्यवेक्षकों को सूचित करें।",
    mcc: "वाहन नंबर या कार्यालय विवरण नोट करें। चुनाव प्रचार के लिए उपयोग की जा रही आधिकारिक मशीनरी की तस्वीरें लें।",
    other: "जितना हो सके विवरण के साथ घटना का दस्तावेजीकरण करें। विशिष्ट मार्गदर्शन के लिए चुनाव आयोग की हेल्पलाइन (1950) से संपर्क करें।"
  }
};

const STEPS = { CATEGORY: 0, DETAILS: 1, PREVIEW: 2, OPTIONS: 3 };

export default function ReportWizard() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].report;
  const navigate = useNavigate();
  const { emailComplaint, saveComplaintToDrive } = useGoogleServices();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [complaint, setComplaint] = useState('');
  const [status, setStatus] = useState(null);

  const handleCategorySelect = (id) => {
    setCategory(id);
    setStep(STEPS.DETAILS);
  };

  const handleEmail = async () => {
    const res = await emailComplaint(complaint);
    if (res.success) setStatus(language === 'hi' ? 'ईमेल भेज दिया गया!' : 'Email sent successfully!');
  };

  const handleSave = async () => {
    const res = await saveComplaintToDrive(complaint, category);
    if (res.success) setStatus(language === 'hi' ? 'ड्राइव में सहेजा गया!' : 'Saved to Google Drive!');
  };

  const generateComplaint = () => {
    const catLabel = MISCONDUCT_CATEGORIES.find(c => c.id === category)?.label || category;
    const dateStr = new Date().toLocaleDateString('en-IN');

    const generated = `To,\nThe Returning Officer,\n${location || 'Constituency Area'}\n\nSubject: Formal Complaint Regarding ${catLabel}\n\nDate: ${dateStr}\n\nRespected Sir/Madam,\n\nI wish to report an incident of ${catLabel} witnessed at ${location || 'the specified location'}.\n\nDetails:\n${description}\n\nI urge an immediate investigation into this matter.\n\nSincerely,\n[Your Name/Signature]\n\n(Drafted with the assistance of Yukti AI — Your Election Literacy Assistant)`;
    setComplaint(generated);
    setStep(STEPS.PREVIEW);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-12 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-sans font-bold text-[var(--color-text-primary)] mb-4">{t.title}</h1>
          <p className="text-lg md:text-xl text-[var(--color-text-muted)] font-sans">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Form Flow */}
          <div className="lg:col-span-2 space-y-8">
            {step === STEPS.CATEGORY && (
              <div className="grid grid-cols-1 gap-4 fade-in">
                {MISCONDUCT_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="group flex items-center justify-between p-6 md:p-8 bg-[var(--color-bg-card)] border border-[var(--color-text-primary)]/5 hover:border-[var(--color-accent-blue)] transition-all text-left"
                  >
                    <div>
                      <div className="text-xl font-sans font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-blue)] transition-colors">
                        {language === 'hi' ? cat.labelHi : cat.label}
                      </div>
                      <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest mt-1">
                        {language === 'hi' ? 'चुनने के लिए क्लिक करें' : 'Click to select'}
                      </div>
                    </div>
                    <span className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </button>
                ))}
              </div>
            )}

            {step === STEPS.DETAILS && (
              <div className="space-y-8 fade-in p-6 md:p-8 bg-[var(--color-bg-card)] border border-[var(--color-text-primary)]/5">
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-[var(--color-text-primary)]">{t.locationLabel}</label>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="e.g. Ward 4, Mumbai North"
                    className="w-full bg-[var(--color-bg)] border border-[var(--color-text-primary)]/10 p-4 font-sans text-lg focus:border-[var(--color-accent-blue)] outline-none"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-[var(--color-text-primary)]">{t.describeTitle}</label>
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full bg-[var(--color-bg)] border border-[var(--color-text-primary)]/10 p-4 h-48 font-sans text-sm focus:border-[var(--color-accent-blue)] outline-none resize-none"
                    placeholder={t.describePlaceholder}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button onClick={() => setStep(STEPS.CATEGORY)} className="flex-1 py-4 border border-[var(--color-text-primary)]/20 text-[var(--color-text-primary)] font-sans text-xs uppercase tracking-widest">Back</button>
                  <button
                    onClick={generateComplaint}
                    disabled={!description || !location}
                    className="flex-[2] py-4 bg-[var(--color-text-primary)] text-white font-sans text-xs uppercase tracking-widest hover:bg-[var(--color-accent-blue)] transition-all disabled:opacity-30"
                  >
                    {t.generateComplaint}
                  </button>
                </div>
              </div>
            )}

            {step === STEPS.PREVIEW && (
              <div className="space-y-8 fade-in">
                <div className="p-8 bg-white text-black font-serif text-sm leading-relaxed shadow-2xl border-t-8 border-[var(--color-accent-blue)] whitespace-pre-wrap">
                  {complaint}
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(STEPS.DETAILS)} className="flex-1 py-4 border border-[var(--color-text-primary)]/20 text-[var(--color-text-primary)] font-sans text-xs uppercase tracking-widest">Edit</button>
                  <button onClick={() => setStep(STEPS.OPTIONS)} className="flex-[2] py-4 bg-[var(--color-text-primary)] text-white font-sans text-xs uppercase tracking-widest hover:bg-[var(--color-accent-blue)] transition-all">Next &rarr;</button>
                </div>
              </div>
            )}

            {step === STEPS.OPTIONS && (
              <div className="space-y-6 fade-in">
                <div className="p-8 bg-[var(--color-bg-card)] border border-[var(--color-text-primary)]/5 rounded-sm shadow-warm">
                  <h2 className="text-2xl font-sans font-bold text-[var(--color-text-primary)] mb-2">
                    {language === 'hi' ? 'वितरण विकल्प' : 'Delivery Options'}
                  </h2>
                  <p className="text-sm text-[var(--color-text-muted)] mb-8">
                    {language === 'hi' ? 'अपनी शिकायत भेजने या सहेजने का तरीका चुनें।' : 'Choose how you would like to send or save your complaint.'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button 
                      onClick={handleEmail}
                      className="p-6 bg-[var(--color-bg)] border border-[var(--color-text-primary)]/10 hover:border-[var(--color-accent-blue)] transition-all text-left group"
                    >
                      <div className="text-lg font-bold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-accent-blue)] transition-colors">Email via Gmail</div>
                      <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest">Gmail MCP Integration</div>
                    </button>
                    <button 
                      onClick={handleSave}
                      className="p-6 bg-[var(--color-bg)] border border-[var(--color-text-primary)]/10 hover:border-[var(--color-accent-blue)] transition-all text-left group"
                    >
                      <div className="text-lg font-bold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-accent-blue)] transition-colors">Save to Drive</div>
                      <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest">Drive MCP Integration</div>
                    </button>
                  </div>

                  {status && (
                    <div className="mt-6 p-4 bg-[var(--color-accent-blue)]/5 border border-[var(--color-accent-blue)]/10 text-[var(--color-accent-blue)] text-xs font-bold text-center">
                      {status}
                    </div>
                  )}

                  <div className="mt-8 pt-8 border-t border-[var(--color-text-primary)]/5">
                    <div className="text-xs text-[var(--color-text-muted)] mb-4 italic">
                      {language === 'hi' ? 'वैकल्पिक: आधिकारिक पोर्टल (MVP के लिए वैकल्पिक)' : 'Optional: Official Portal (Optional for MVP)'}
                    </div>
                    <div className="p-4 bg-[var(--color-bg)] border border-dashed border-[var(--color-text-primary)]/20 rounded text-center">
                       <a 
                        href="https://vIGIL.eci.gov.in" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold text-[var(--color-accent-blue)] uppercase tracking-widest hover:underline"
                      >
                        Submit on cVIGIL Portal &rarr;
                      </a>
                    </div>
                  </div>
                </div>

                {/* Encouragement Card */}
                <div className="mt-6 p-8 bg-[var(--color-accent-blue)] text-white rounded-sm shadow-xl space-y-6">
                  <div>
                    <h3 className="text-xl font-sans font-bold mb-2">
                      {language === 'hi' ? 'आपकी जागरूकता के लिए धन्यवाद' : 'Thank You for Your Awareness'}
                    </h3>
                    <p className="text-sm opacity-90 font-sans leading-relaxed">
                      {language === 'hi' 
                        ? 'लोकतंत्र को सुरक्षित रखने में आपकी भूमिका महत्वपूर्ण है। कृपया सुरक्षित रहें और स्थिति पर नज़र रखें।' 
                        : 'Your role in keeping democracy safe is vital. Please prioritize your safety and stay vigilant.'}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-white/20">
                    <button 
                      onClick={() => navigate('/news')}
                      className="px-6 py-3 bg-white text-[var(--color-accent-blue)] text-[10px] font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all"
                    >
                      {language === 'hi' ? 'ताज़ा समाचार देखें' : 'Watch Latest News'} &rarr;
                    </button>
                    <button 
                      onClick={() => navigate('/journey')}
                      className="px-6 py-3 border border-white text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                      {language === 'hi' ? 'अपनी यात्रा जारी रखें' : 'Continue Your Journey'}
                    </button>
                  </div>
                </div>

                <button onClick={() => setStep(STEPS.PREVIEW)} className="w-full py-4 border border-[var(--color-text-primary)]/20 text-[var(--color-text-primary)] font-sans text-xs uppercase tracking-widest">Back to Preview</button>
              </div>
            )}
          </div>

          {/* Sidebar Advice */}
          <div className="space-y-6">
            <div className="p-8 bg-[var(--color-bg-card)] border-l-4 border-[var(--color-accent-blue)]">
              <h3 className="text-xs font-sans font-bold text-[var(--color-accent-blue)] uppercase tracking-[0.3em] mb-4">
                {language === 'hi' ? 'महत्वपूर्ण सलाह' : 'Critical Advice'}
              </h3>
              <p className="text-[var(--color-text-muted)] font-sans text-sm leading-relaxed italic">
                {category ? ADVICE[language][category] : (language === 'hi' ? 'एक श्रेणी चुनें और युक्ति आपको बताएगी कि तुरंत क्या करना है।' : 'Select a category and Yukti will tell you exactly what to do immediately.')}
              </p>
            </div>

            <div className="p-8 border border-[var(--color-text-primary)]/10 space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-text-primary)]">
                {language === 'hi' ? 'सहायता केंद्र' : 'Support Center'}
              </h4>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[var(--color-accent-blue)]/10 flex items-center justify-center text-xs">📞</span>
                <span className="font-mono text-lg text-[var(--color-text-primary)]">1950</span>
              </div>
              <p className="text-[10px] text-[var(--color-text-muted)] leading-relaxed">
                {language === 'hi' ? 'अंतिम समाधान के लिए चुनाव आयोग की हेल्पलाइन का उपयोग करें।' : 'Use the ECI helpline for ultimate resolution.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}