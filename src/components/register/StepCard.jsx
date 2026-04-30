export default function StepCard({ step, title, description, tips, tipsLabel, children }) {
  return (
    <div className="p-10 bg-[var(--color-bg-card)] border border-[var(--color-accent-soft)]/20 rounded-sm fade-in">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-10 h-10 flex items-center justify-center border border-[var(--color-accent-blue)]/30 text-[var(--color-accent-blue)] font-sans font-semibold text-lg flex-shrink-0">
          {step}
        </div>
        <h3 className="text-2xl font-sans font-semibold text-[var(--color-text-primary)]">{title}</h3>
      </div>

      <p className="text-[var(--color-text-muted)] font-sans leading-relaxed mb-6">
        {description}
      </p>

      {tips && (
        <div className="bg-[var(--color-caramel)]/5 border-l-2 border-[var(--color-caramel)] p-4 mb-6">
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-caramel)] font-sans mb-2">{tipsLabel || 'Common Mistake'}</p>
          <p className="text-[var(--color-text-muted)] font-sans text-sm">{tips}</p>
        </div>
      )}

      {children}
    </div>
  );
}
