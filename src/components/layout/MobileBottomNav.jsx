import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../constants/translations';
import { HomeIcon, ConstitutionIcon, VotingIcon, MegaphoneIcon, GlobeIcon } from '../icons/LineIcons';

export default function MobileBottomNav() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].nav;

  const navItems = [
    { path: '/', icon: <HomeIcon />, label: language === 'hi' ? 'होम' : 'Home' },
    { path: '/journey', icon: <ConstitutionIcon />, label: t.journey },
    { path: '/preparation', icon: <VotingIcon />, label: t.prep },
    { path: '/news', icon: <MegaphoneIcon />, label: t.news },
    { path: '/volunteer', icon: <GlobeIcon />, label: t.volunteer },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-bg-card)] border-t border-[var(--color-text-primary)]/5 px-2 py-3 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex flex-col items-center gap-1 transition-all duration-300 ${
                isActive 
                  ? 'text-[var(--color-accent-blue)] scale-110' 
                  : 'text-[var(--color-text-muted)] opacity-60'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="scale-90">{item.icon}</div>
                <span className="text-[9px] font-sans font-bold uppercase tracking-widest whitespace-nowrap">
                  {item.label}
                </span>
                {/* Active Indicator Dot */}
                <div
                  className={`w-1 h-1 rounded-full bg-[var(--color-accent-blue)] transition-all duration-300 transform ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}
                />
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
