import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../constants/translations';

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[var(--color-accent-soft)]/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-[var(--color-accent-blue)] transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-xl font-sans font-semibold text-[var(--color-text-primary)]">{title}</span>
        <span className={`text-2xl transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[300px] pb-8' : 'max-h-0'}`}>
        <div className="text-[var(--color-text-muted)] font-sans leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

const faqEn = [
  { title: "What is an EVM?", body: "An Electronic Voting Machine (EVM) is an electronic device used for recording votes in elections. It consists of two units: a Control Unit used by the polling officer and a Ballot Unit used by the voter." },
  { title: "What is VVPAT?", body: "Voter Verifiable Paper Audit Trail (VVPAT) is an independent system attached to the EVM that allows voters to verify that their votes are cast as intended. It prints a slip with the candidate's name, serial number, and symbol." },
  { title: "Can an EVM be tampered with?", body: "The ECI maintains that EVMs are stand-alone machines without any wireless communication capabilities, making them immune to external hacking or remote tampering." },
  { title: "What is NOTA?", body: "'None of the Above' (NOTA) is a ballot option that allows voters to officially register their disapproval of all candidates participating in an election." },
];

const faqHi = [
  { title: "EVM क्या है?", body: "इलेक्ट्रॉनिक वोटिंग मशीन (EVM) एक इलेक्ट्रॉनिक उपकरण है जिसका उपयोग चुनावों में वोट दर्ज करने के लिए किया जाता है। इसमें दो इकाइयां होती हैं: मतदान अधिकारी द्वारा उपयोग की जाने वाली कंट्रोल यूनिट और मतदाता द्वारा उपयोग की जाने वाली बैलट यूनिट।" },
  { title: "VVPAT क्या है?", body: "वोटर वेरिफिएबल पेपर ऑडिट ट्रेल (VVPAT) EVM से जुड़ी एक स्वतंत्र प्रणाली है जो मतदाताओं को यह सत्यापित करने की अनुमति देती है कि उनका वोट सही तरीके से डाला गया है। यह उम्मीदवार का नाम, क्रम संख्या और प्रतीक वाली पर्ची प्रिंट करती है।" },
  { title: "क्या EVM में छेड़छाड़ हो सकती है?", body: "ECI का कहना है कि EVM स्वतंत्र मशीनें हैं जिनमें कोई वायरलेस संचार क्षमता नहीं है, जिससे वे बाहरी हैकिंग या रिमोट छेड़छाड़ से सुरक्षित हैं।" },
  { title: "NOTA क्या है?", body: "'उपरोक्त में से कोई नहीं' (NOTA) एक मतपत्र विकल्प है जो मतदाताओं को चुनाव में भाग लेने वाले सभी उम्मीदवारों के प्रति अपनी अस्वीकृति को आधिकारिक रूप से दर्ज करने की अनुमति देता है।" },
];

export default function EVMInfoAccordion() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].evm;
  const faq = language === 'hi' ? faqHi : faqEn;

  return (
    <div className="bg-[var(--color-bg-card)] p-12 rounded-sm border border-[var(--color-accent-soft)]/10">
      <h2 className="text-3xl font-sans font-semibold mb-8 text-[var(--color-text-primary)]">{t.faqTitle}</h2>
      <div className="space-y-2">
        {faq.map((item, idx) => (
          <AccordionItem key={idx} title={item.title}>
            {item.body}
          </AccordionItem>
        ))}
      </div>
    </div>
  );
}
