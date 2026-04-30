import { EVM_CANDIDATES } from '../../constants/electionData';

/* SVG party symbols — simple line art shapes (no emoji, per PRD) */
const PartySymbol = ({ party }) => {
  const symbols = {
    'Sun Party': (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-[var(--color-caramel)]">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    'River Party': (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-[var(--color-accent-blue)]">
        <path d="M2 6c3 0 4 2 7 2s4-2 7-2 4 2 7 2M2 12c3 0 4 2 7 2s4-2 7-2 4 2 7 2M2 18c3 0 4 2 7 2s4-2 7-2 4 2 7 2" />
      </svg>
    ),
    'Mountain Party': (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-[var(--color-text-muted)]">
        <path d="M2 20L8 8l4 6 4-10 6 16H2z" />
      </svg>
    ),
    'Star Party': (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-[var(--color-caramel)]">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
      </svg>
    ),
    'Leaf Party': (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-[var(--color-accent-blue)]">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34M17 8A5 5 0 0121 3c-1 4-1 8-5 13M17 8c-4 4-8.5 4.5-9 4.5" />
      </svg>
    ),
    'NOTA': (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-[var(--color-text-muted)]">
        <circle cx="12" cy="12" r="10" />
        <path d="M4.93 4.93l14.14 14.14" />
      </svg>
    ),
  };
  return symbols[party] || null;
};

export default function BallotUnit({ onVote }) {
  return (
    <div className="bg-slate-200 p-2 rounded-sm shadow-2xl border-4 border-slate-300">
      <div className="bg-white p-6 rounded-sm border border-slate-400">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200">
          <div className="text-[var(--color-accent-blue)] font-sans font-bold text-xl uppercase tracking-widest">Ballot Unit</div>
          <div className="w-4 h-4 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
        </div>

        <div className="space-y-1">
          {EVM_CANDIDATES.map((c) => (
            <div key={c.id} className="flex items-center gap-4 p-4 border border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="w-8 text-slate-400 font-sans text-sm">{c.id}</div>
              <div className="flex-grow">
                <div className="font-sans font-semibold text-lg text-slate-800 leading-none">{c.name}</div>
                <div className="font-sans text-xs text-slate-500 uppercase tracking-tighter mt-1">{c.party}</div>
              </div>
              <div className="px-4 border-l border-r border-slate-100 min-w-[80px] flex justify-center" aria-hidden="true">
                <PartySymbol party={c.party} />
              </div>
              <button
                onClick={() => onVote(c)}
                aria-label={`Vote for ${c.name} of ${c.party}`}
                className="w-10 h-10 rounded-full bg-blue-600 border-4 border-blue-800 shadow-md active:bg-blue-900 active:scale-95 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
