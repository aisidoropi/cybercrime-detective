import { useState, useEffect } from 'react';
import type { Level } from '../types/game';

interface Props {
  level: Level;
  onSubmit: (answerId: string) => void;
  onCancel: () => void;
  onBack?: () => void;
}

export default function AccusationScreen({ level, onSubmit, onCancel, onBack }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => { setTimeout(() => setOpen(true), 60); }, []);

  const handleSubmit = () => {
    if (!selected) return;
    setConfirming(true);
    setTimeout(() => onSubmit(selected), 800);
  };

  const handleCancel = () => {
    setOpen(false);
    setTimeout(onCancel, 500);
  };

  const handleBack = () => {
    setOpen(false);
    setTimeout(() => {
      if (onBack) onBack();
      else onCancel();
    }, 500);
  };

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(4,3,2,0.92)' }}
    >
      <div
        className="relative transition-all duration-600 w-full max-w-2xl mx-6"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(40px)',
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="font-detective text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--accent)', opacity: 0.7 }}>
            — Final Deduction —
          </div>
          <h2 className="font-detective text-4xl mb-3" style={{ color: 'var(--text-primary)' }}>
            Make Your Accusation
          </h2>
          <p className="font-serif italic text-sm" style={{ color: 'var(--text-muted)' }}>
            Review the evidence. Choose the attack vector that best explains what happened to {level.victim.name}.
          </p>
        </div>

        {/* Victim summary */}
        <div
          className="mb-6 px-5 py-4"
          style={{
            background: 'rgba(245,166,35,0.05)',
            border: '1px solid rgba(245,166,35,0.15)',
          }}
        >
          <div className="flex items-start gap-4">
            <div className="text-3xl">👵</div>
            <div>
              <div className="font-detective text-sm mb-1" style={{ color: 'var(--accent)' }}>
                {level.victim.name}, {level.victim.age}
              </div>
              <p className="font-sans text-sm" style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {level.victim.description}
              </p>
              <p className="font-serif italic text-xs mt-2" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
                {level.briefing}
              </p>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {level.accusationOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelected(option.id)}
              className="w-full text-left px-5 py-4 transition-all duration-300"
              style={{
                background: selected === option.id ? 'rgba(245,166,35,0.1)' : 'rgba(255,255,255,0.02)',
                border: selected === option.id
                  ? '1px solid rgba(245,166,35,0.7)'
                  : '1px solid rgba(255,255,255,0.08)',
                boxShadow: selected === option.id ? '0 0 20px rgba(245,166,35,0.15)' : 'none',
              }}
            >
              <div className="flex items-start gap-3">
                {/* Radio indicator */}
                <div
                  className="mt-0.5 flex-shrink-0 transition-all duration-300"
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    border: `2px solid ${selected === option.id ? 'rgba(245,166,35,0.8)' : 'rgba(255,255,255,0.2)'}`,
                    background: selected === option.id ? 'rgba(245,166,35,0.6)' : 'transparent',
                    boxShadow: selected === option.id ? '0 0 8px rgba(245,166,35,0.4)' : 'none',
                  }}
                />
                <div>
                  <div
                    className="font-detective text-sm mb-1"
                    style={{
                      color: selected === option.id ? 'var(--accent)' : 'var(--text-primary)',
                      fontSize: '0.8rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {option.label}
                  </div>
                  <p
                    className="font-sans text-xs"
                    style={{ color: 'var(--text-muted)', lineHeight: 1.6, opacity: 0.7 }}
                  >
                    {option.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-between items-center">
          <div className="flex gap-3">
            {onBack && (
              <button
                onClick={handleBack}
                className="font-detective text-xs tracking-widest uppercase px-4 py-3 transition-all duration-200"
                style={{
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'var(--text-muted)',
                  background: 'transparent',
                  letterSpacing: '0.15em',
                }}
              >
                ← Back
              </button>
            )}
            <button
              onClick={handleCancel}
              className="font-detective text-xs tracking-widest uppercase px-6 py-3 transition-all duration-200"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--text-muted)',
                background: 'transparent',
                letterSpacing: '0.15em',
              }}
            >
              Return to Scene
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selected || confirming}
            className="font-detective text-xs tracking-widest uppercase px-8 py-3 transition-all duration-300"
            style={{
              border: selected ? '1px solid rgba(245,166,35,0.8)' : '1px solid rgba(245,166,35,0.2)',
              color: selected ? 'var(--accent)' : 'rgba(245,166,35,0.3)',
              background: selected ? 'rgba(245,166,35,0.12)' : 'transparent',
              boxShadow: selected ? '0 0 20px rgba(245,166,35,0.15)' : 'none',
              letterSpacing: '0.2em',
              cursor: selected ? 'pointer' : 'not-allowed',
              opacity: confirming ? 0.6 : 1,
            }}
          >
            {confirming ? 'Filing Report...' : 'Submit Accusation'}
          </button>
        </div>
      </div>
    </div>
  );
}
