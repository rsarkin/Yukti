import { useLocation, useNavigate } from 'react-router-dom';
import { BotIcon } from '../icons/LineIcons';

const FloatingChatButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/' || location.pathname === '/chat') {
    return null;
  }

  return (
    <button
      onClick={() => navigate('/chat')}
      className="fixed bottom-24 md:bottom-8 right-6 flex flex-col items-center gap-1.5 z-50 group transition-all hover:scale-105 active:scale-95"
      aria-label="Open AI Assistant"
    >
      <div 
        className="p-4 rounded-full bg-[var(--color-accent-blue)] text-[var(--color-bg)] shadow-xl group-hover:shadow-2xl border-2 border-[var(--color-accent-blue)] flex items-center justify-center"
      >
        <BotIcon />
      </div>
      <span className="text-[11px] font-bold text-[var(--color-accent-blue)] tracking-wider uppercase bg-[var(--color-bg)]/90 px-2.5 py-0.5 rounded-full backdrop-blur-md shadow-sm border border-[var(--color-accent-blue)]/10">
        Yukti
      </span>
    </button>
  );
};

export default FloatingChatButton;
