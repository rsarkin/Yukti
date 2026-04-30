import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useJourney } from '../../context/JourneyContext';
import { TRANSLATIONS } from '../../constants/translations';
import { useGemini } from '../../hooks/useGemini';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { MicIcon } from '../icons/LineIcons';

export default function ChatWindow() {
  const { language } = useLanguage();
  const { journeyState } = useJourney();
  const t = TRANSLATIONS[language].chat;
  const { sendMessage, isLoading } = useGemini();

  const [messages, setMessages] = useState([
    { id: '1', role: 'assistant', text: t.greeting }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    const newId = Date.now().toString();
    setMessages(prev => [...prev, { id: newId, role: 'user', text: userMsg }]);
    setInput('');

    // Show typing indicator
    const typingId = newId + '-typing';
    setMessages(prev => [...prev, { id: typingId, role: 'assistant', text: '...', isTyping: true }]);

    const response = await sendMessage(userMsg, language, messages);

    // Replace typing indicator with actual response
    setMessages(prev => {
      const filtered = prev.filter(m => m.id !== typingId);
      return [...filtered, { id: Date.now().toString(), role: 'assistant', text: response.text }];
    });
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => (prev ? prev + ' ' + transcript : transcript));
    };
    recognition.start();
  };

  const handleChipClick = (chip) => {
    setInput(chip);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-72px)] w-full max-w-4xl mx-auto" id="chat-window">
      
      {/* Header */}
      <div className="px-6 py-4 flex justify-between items-center border-b border-[var(--color-accent-soft)]/10 bg-[var(--color-bg)] sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--color-accent-blue)] flex items-center justify-center text-white shadow-md">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="font-sans font-bold text-lg text-[var(--color-text-primary)] leading-tight">Yukti AI</h1>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-sans text-[var(--color-text-muted)] opacity-80">{t.activeLabel}</span>
            </div>
          </div>
        </div>
        <div className="text-xs font-sans px-3 py-1.5 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-accent-soft)]/10 text-[var(--color-text-muted)]">
          {t.stageLabel}: <span className="font-semibold text-[var(--color-accent-blue)]">{journeyState.stage}</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto px-4 md:px-8 py-8 space-y-6 no-scrollbar relative">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`flex w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="flex-shrink-0 mt-auto hidden sm:block">
                  {m.role === 'user' ? (
                    <div className="w-8 h-8 rounded-full bg-[var(--color-bg-card)] flex items-center justify-center border border-[var(--color-accent-soft)]/20 shadow-sm text-[var(--color-text-primary)]">
                      <User size={16} />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[var(--color-text-primary)] flex items-center justify-center shadow-md text-white">
                      <Bot size={16} />
                    </div>
                  )}
                </div>

                <div className={`p-4 font-sans text-[15px] leading-relaxed shadow-sm ${
                  m.role === 'user'
                    ? 'bg-[var(--color-text-primary)] text-white rounded-3xl rounded-br-sm'
                    : 'bg-white/40 backdrop-blur-md border border-[var(--color-accent-soft)]/10 text-[var(--color-text-primary)] rounded-3xl rounded-bl-sm'
                }`}>
                  {m.isTyping ? (
                    <div className="flex gap-1.5 px-2 py-1 items-center h-5">
                      <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-[var(--color-accent-blue)] opacity-60 rounded-full" />
                      <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-[var(--color-accent-blue)] opacity-60 rounded-full" />
                      <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-[var(--color-accent-blue)] opacity-60 rounded-full" />
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap leading-relaxed space-y-3">
                      {m.text.split('\n').map((line, i) => (
                        <p key={i} className="mb-2 last:mb-0">
                          {line.split(/(\*\*.*?\*\*)/).map((part, j) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return <strong key={j} className="font-semibold text-[var(--color-accent-blue)]">{part.slice(2, -2)}</strong>;
                            }
                            return part;
                          })}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)] to-transparent pt-8">
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
          {t.chips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleChipClick(chip)}
              className="flex-shrink-0 px-4 py-2 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-accent-soft)]/10 text-xs font-sans text-[var(--color-text-primary)] hover:border-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)]/5 transition-all shadow-sm"
            >
              {chip}
            </button>
          ))}
        </div>

        <form onSubmit={handleSend} className="relative flex items-end gap-2 bg-white/40 backdrop-blur-xl border border-[var(--color-accent-soft)]/20 p-2 rounded-[2rem] shadow-lg transition-all focus-within:ring-2 focus-within:ring-[var(--color-accent-blue)]/20 focus-within:border-[var(--color-accent-blue)]/50">
          <button
            type="button"
            onClick={startListening}
            className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-sm mb-1 ml-1 ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-[var(--color-bg-card)] text-[var(--color-text-primary)] hover:bg-[var(--color-accent-blue)]/10'
            }`}
            aria-label="Voice input"
          >
            <MicIcon />
          </button>
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="flex-grow bg-transparent px-2 py-3 max-h-32 min-h-[44px] resize-none focus:outline-none font-sans text-[15px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]/60 leading-tight no-scrollbar rounded-3xl"
            placeholder={isListening ? (language === 'hi' ? 'सुन रहा हूँ...' : 'Listening...') : t.placeholder}
            disabled={isLoading}
            rows={1}
          />
          
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex-shrink-0 w-11 h-11 rounded-full bg-[var(--color-text-primary)] text-white flex items-center justify-center hover:bg-[var(--color-accent-blue)] transition-colors disabled:opacity-40 shadow-md mr-1 mb-1"
          >
            <Send size={18} className="ml-0.5" />
          </button>
        </form>
        <div className="text-center mt-3 text-[10px] text-[var(--color-text-muted)] font-sans opacity-70">
          AI can make mistakes. Verify important election information at eci.gov.in.
        </div>
      </div>

    </div>
  );
}