import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../constants/translations';
import pincodeData from '../../data/pincodes.json';

export default function ConstituencyFinder() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].constituency;
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const found = pincodeData.find(item => item.pincode === pincode);
    if (found) {
      setResult(found);
      setError('');
    } else {
      setResult(null);
      setError(t.errorNotFound);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-20 px-4" id="constituency-finder">
      <div className="max-w-2xl mx-auto">
        <div className="p-12 bg-[var(--color-bg-card)] border border-[var(--color-accent-soft)]/20 rounded-sm fade-in">
          <h2 className="text-3xl font-sans font-semibold mb-4 text-[var(--color-text-primary)]">{t.title}</h2>
          <p className="text-[var(--color-text-muted)] font-sans mb-10 text-sm">{t.subtitle}</p>

          <form onSubmit={handleSearch} className="space-y-8">
            <div>
              <label htmlFor="pincode-input" className="sr-only">{t.title}</label>
              <input
                id="pincode-input"
                type="text"
                maxLength="6"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-[var(--color-bg)] border-b border-[var(--color-text-primary)]/20 py-4 text-3xl font-sans font-semibold focus:outline-none focus:border-[var(--color-accent-blue)] transition-colors text-center tracking-[0.3em]"
                placeholder="411001"
                required
                aria-label="6-digit pincode"
              />
            </div>
            <button
              type="submit"
              className="w-full py-5 bg-[var(--color-text-primary)] text-white font-sans uppercase tracking-[0.2em] text-sm hover:bg-[var(--color-accent-blue)] transition-colors"
            >
              {t.search} &rarr;
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 border-l-2 border-[var(--color-caramel)] bg-[var(--color-caramel)]/5">
              <p className="text-[var(--color-text-muted)] font-sans text-sm">{error}</p>
            </div>
          )}

          {result && (
            <div className="mt-12 p-8 border border-[var(--color-accent-blue)]/20 bg-[var(--color-bg)] fade-in">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-1">{t.stateLabel}</label>
                  <div className="text-lg font-sans font-semibold">{result.state}</div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-1">{t.districtLabel}</label>
                  <div className="text-lg font-sans font-semibold">{result.district}</div>
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-1">{t.lokSabhaLabel}</label>
                  <div className="text-xl font-sans font-semibold text-[var(--color-accent-blue)]">{result.lokSabha}</div>
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-1">{t.vidhanSabhaLabel}</label>
                  <div className="text-xl font-sans font-semibold text-[var(--color-caramel)]">{result.vidhanSabha}</div>
                </div>
              </div>

              {/* Action links */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/booth"
                  className="flex-1 text-center py-3 border border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] font-sans text-xs uppercase tracking-widest hover:bg-[var(--color-accent-blue)] hover:text-white transition-all"
                >
                  {language === 'hi' ? 'बूथ खोजें' : 'Find My Booth'} &rarr;
                </Link>
                <button
                  className="flex-1 py-3 border border-[var(--color-caramel)]/30 text-[var(--color-caramel)] font-sans text-xs uppercase tracking-widest hover:bg-[var(--color-caramel)]/5 transition-all"
                >
                  {language === 'hi' ? 'कैलेंडर में जोड़ें' : 'Add Election Dates'} &rarr;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}