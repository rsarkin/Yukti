import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../constants/translations';
import { useGoogleServices } from '../../hooks/useGoogleServices';
import { GlobeIcon, MegaphoneIcon, ConstitutionIcon } from '../icons/LineIcons';

export default function VolunteerHub() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].volunteer;
  const { saveVolunteerProfileToDrive } = useGoogleServices();
  
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    state: '', 
    role: 'Campus Champion', 
    agree: false 
  });
  const [status, setStatus] = useState(null);

  const roles = [
    { 
      id: 'Campus Champion', 
      title: t.role1Title, 
      icon: <ConstitutionIcon />, 
      contribution: language === 'hi' ? 'कैंपस में जागरूकता फैलाएं और नए मतदाताओं को पंजीकृत करने में मदद करें।' : 'Lead campus awareness and help new voters register.' 
    },
    { 
      id: 'Locality Guide', 
      title: t.role2Title, 
      icon: <GlobeIcon />, 
      contribution: language === 'hi' ? 'अपने पड़ोस में मतदान केंद्रों और मतदाता सूची की जानकारी प्रदान करें।' : 'Provide info on booths and voter lists in your neighborhood.' 
    },
    { 
      id: 'Social Media Amplifier', 
      title: t.role3Title, 
      icon: <MegaphoneIcon />, 
      contribution: language === 'hi' ? 'डिजिटल सामग्री साझा करें और ऑनलाइन चुनाव साक्षरता बढ़ाएं।' : 'Share digital content and boost online election literacy.' 
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agree || !form.name || !form.phone) return;
    
    setStatus('loading');
    const res = await saveVolunteerProfileToDrive(form);
    if (res.success) {
      setStatus('success');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-20 space-y-4">
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-[var(--color-text-primary)] tracking-tight">
            {language === 'hi' ? 'युक्ति साथी बनें' : 'Become a Yukti Saathi'}
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto font-sans leading-relaxed px-4">
            {language === 'hi' 
              ? 'हमारे लोकतंत्र के साथी बनें। आपकी जागरूकता और योगदान भारत के भविष्य को आकार दे सकता है।' 
              : 'Become a companion to our democracy. As a Yukti Saathi, your awareness and contribution can shape the future of India.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-16">
          
          {/* Left Column: What you will do */}
          <div className="lg:col-span-3 space-y-12">
            <section className="space-y-8">
              <h2 className="text-xs font-sans font-bold text-[var(--color-accent-blue)] uppercase tracking-[0.3em]">
                {language === 'hi' ? 'आपकी भूमिका और योगदान' : 'Your Role & Contribution'}
              </h2>
              
              <div className="grid grid-cols-1 gap-6">
                {roles.map(r => (
                  <div 
                    key={r.id} 
                    className={`p-8 bg-[var(--color-bg-card)] border-l-4 transition-all ${form.role === r.id ? 'border-[var(--color-accent-blue)] shadow-xl' : 'border-transparent opacity-60'}`}
                    onClick={() => setForm({ ...form, role: r.id })}
                    role="button"
                  >
                    <div className="flex items-start gap-6">
                      <div className={`w-12 h-12 flex items-center justify-center rounded-full ${form.role === r.id ? 'bg-[var(--color-accent-blue)] text-white' : 'bg-[var(--color-text-primary)]/5 text-[var(--color-text-primary)]'}`}>
                        {r.icon}
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-sans font-bold text-[var(--color-text-primary)]">{r.title}</h3>
                        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{r.contribution}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="p-10 bg-[var(--color-accent-blue)] text-white rounded-sm shadow-2xl relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-sans font-bold">
                  {language === 'hi' ? 'हम आपकी सराहना करते हैं' : 'We Appreciate You'}
                </h3>
                <p className="text-sm opacity-90 leading-relaxed font-sans">
                  {language === 'hi' 
                    ? 'स्वयंसेवक युक्ति की रीढ़ हैं। प्रत्येक साझा की गई जानकारी और प्रत्येक सहायता प्राप्त पंजीकरण हमारे लोकतंत्र को अधिक समावेशी और शक्तिशाली बनाता है।' 
                    : 'Volunteers are the backbone of Yukti. Every shared insight and every assisted registration makes our democracy more inclusive and powerful.'}
                </p>
              </div>
              <div className="absolute top-0 right-0 p-8 text-8xl opacity-10 font-bold">❤</div>
            </section>
          </div>

          {/* Right Column: Simplified Form */}
          <div className="lg:col-span-2">
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-text-primary)]/5 p-6 md:p-10 shadow-warm sticky top-32">
              {status === 'success' ? (
                <div className="text-center py-20 space-y-6 fade-in">
                  <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto text-4xl">✓</div>
                  <h2 className="text-3xl font-sans font-bold text-[var(--color-text-primary)]">
                    {language === 'hi' ? 'धन्यवाद, ' : 'Thank You, '} {form.name.split(' ')[0]}!
                  </h2>
                  <p className="text-[var(--color-text-muted)] text-sm">
                    {language === 'hi' 
                      ? 'आपका आवेदन प्राप्त हो गया है। हम जल्द ही आपसे संपर्क करेंगे।' 
                      : 'Your application has been received. We will reach out to you shortly via email.'}
                  </p>
                  <button 
                    onClick={() => setStatus(null)} 
                    className="w-full py-4 border border-[var(--color-text-primary)]/10 text-[var(--color-text-primary)] text-[10px] font-bold uppercase tracking-widest hover:bg-[var(--color-text-primary)]/5"
                  >
                    Register Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 fade-in">
                  <h2 className="text-2xl font-sans font-bold text-[var(--color-text-primary)] mb-4">
                    {language === 'hi' ? 'जल्दी शामिल हों' : 'Quick Join'}
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-primary)]">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={form.name}
                        onChange={e => setForm({...form, name: e.target.value})}
                        className="w-full bg-[var(--color-bg)] border border-[var(--color-text-primary)]/10 p-4 font-sans text-sm focus:border-[var(--color-accent-blue)] outline-none"
                        placeholder="e.g. Rahul Sharma"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-primary)]">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={form.email}
                        onChange={e => setForm({...form, email: e.target.value})}
                        className="w-full bg-[var(--color-bg)] border border-[var(--color-text-primary)]/10 p-4 font-sans text-sm focus:border-[var(--color-accent-blue)] outline-none"
                        placeholder="rahul@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-primary)]">Mobile Number</label>
                      <input 
                        type="tel" 
                        required
                        value={form.phone}
                        onChange={e => setForm({...form, phone: e.target.value})}
                        className="w-full bg-[var(--color-bg)] border border-[var(--color-text-primary)]/10 p-4 font-sans text-sm focus:border-[var(--color-accent-blue)] outline-none"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-primary)]">Selected Role</label>
                      <div className="p-4 bg-[var(--color-bg)] border border-[var(--color-accent-blue)]/20 text-[var(--color-accent-blue)] text-xs font-bold uppercase tracking-widest rounded-sm">
                        {form.role}
                      </div>
                    </div>
                  </div>

                  <label className="flex items-center gap-3 text-xs text-[var(--color-text-muted)] cursor-pointer group">
                    <input 
                      type="checkbox" 
                      required
                      checked={form.agree}
                      onChange={e => setForm({...form, agree: e.target.checked})}
                      className="w-4 h-4 rounded-none accent-[var(--color-accent-blue)]"
                    />
                    <span className="group-hover:text-[var(--color-text-primary)] transition-colors">
                      {language === 'hi' ? 'मैं युक्ति के दिशा-निर्देशों का पालन करने के लिए सहमत हूं।' : 'I agree to follow Yukti volunteer guidelines and ethics.'}
                    </span>
                  </label>

                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full py-5 bg-[var(--color-text-primary)] text-white font-sans font-bold text-xs uppercase tracking-[0.3em] hover:bg-[var(--color-accent-blue)] transition-all shadow-xl disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Processing...' : (language === 'hi' ? 'अभी शामिल हों' : 'Join Now')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
