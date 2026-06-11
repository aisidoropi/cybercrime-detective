import { useState, useEffect, useRef } from 'react';
import type { Level } from '../types/game';

interface Props {
  level: Level;
  onSubmit: (answerIds: string[]) => void;
  onCancel: () => void;
  onBack?: () => void;
}

export default function AccusationScreen({ level, onSubmit, onCancel, onBack }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [confirming, setConfirming] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => setOpen(true), 60);
  }, []);

  // Check if scrolling is possible and handle scroll indicator
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkScroll = () => {
      const isScrollable = el.scrollHeight > el.clientHeight;
      const isAtBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 20;
      setShowScrollIndicator(isScrollable && !isAtBottom);
    };

    checkScroll();
    el.addEventListener('scroll', checkScroll);
    return () => el.removeEventListener('scroll', checkScroll);
  }, [open]);

  const toggleOption = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSubmit = () => {
    if (selected.size === 0) return;
    setConfirming(true);
    setTimeout(() => onSubmit(Array.from(selected)), 800);
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
        className="relative transition-all duration-600 w-full max-w-3xl mx-6"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(40px)',
        }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="font-detective text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--accent)', opacity: 0.7 }}>
            — Final Deduction —
          </div>
          <h2 className="font-detective text-3xl mb-3" style={{ color: 'var(--text-primary)' }}>
            Identify the Attack Vector{level.correctAnswers.length > 1 ? 's' : ''}
          </h2>
          <p className="font-serif italic text-sm" style={{ color: 'var(--text-muted)' }}>
            Select the attack type{level.correctAnswers.length > 1 ? 's' : ''} that best explain{level.correctAnswers.length > 1 ? '' : 's'} what happened to {level.victim.name}.
          </p>
          <p className="font-sans text-xs mt-2" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
            {level.correctAnswers.length > 1 ? 'Multiple vulnerabilities may be involved. Select all that apply.' : 'Choose one option below.'}
          </p>
        </div>

        {/* Victim summary */}
        <div
          className="mb-5 px-5 py-3"
          style={{
            background: 'rgba(245,166,35,0.05)',
            border: '1px solid rgba(245,166,35,0.15)',
          }}
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">👤</div>
            <div>
              <div className="font-detective text-sm mb-0.5" style={{ color: 'var(--accent)' }}>
                {level.victim.name}, {level.victim.age}
              </div>
              <p className="font-sans text-xs" style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {level.victim.description}
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable options grid */}
        <div className="relative mb-5">
          <div
            ref={scrollRef}
            className="overflow-y-auto pr-2"
            style={{
              maxHeight: 340,
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(245,166,35,0.3) transparent',
            }}
          >
            <div className="grid grid-cols-2 gap-3">
              {level.accusationOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => toggleOption(option.id)}
                  className="text-left px-4 py-3 transition-all duration-300"
                  style={{
                    background: selected.has(option.id) ? 'rgba(245,166,35,0.1)' : 'rgba(255,255,255,0.02)',
                    border: selected.has(option.id)
                      ? '1px solid rgba(245,166,35,0.7)'
                      : '1px solid rgba(255,255,255,0.08)',
                    boxShadow: selected.has(option.id) ? '0 0 20px rgba(245,166,35,0.15)' : 'none',
                  }}
                >
                  <div className="flex items-start gap-3">
                    {/* Checkbox indicator */}
                    <div
                      className="mt-0.5 flex-shrink-0 transition-all duration-300 flex items-center justify-center"
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 4,
                        border: selected.has(option.id)
                          ? '1px solid rgba(245,166,35,0.8)'
                          : '1px solid rgba(255,255,255,0.2)',
                        background: selected.has(option.id) ? 'rgba(245,166,35,0.6)' : 'transparent',
                        boxShadow: selected.has(option.id) ? '0 0 8px rgba(245,166,35,0.4)' : 'none',
                      }}
                    >
                      {selected.has(option.id) && (
                        <span style={{ color: '#0A0806', fontSize: 12 }}>✓</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {option.icon && <span style={{ fontSize: 14 }}>{option.icon}</span>}
                        <div
                          className="font-detective text-sm"
                          style={{
                            color: selected.has(option.id) ? 'var(--accent)' : 'var(--text-primary)',
                            fontSize: '0.75rem',
                            letterSpacing: '0.03em',
                          }}
                        >
                          {option.label}
                        </div>
                      </div>
                      <p
                        className="font-sans text-xs"
                        style={{ color: 'var(--text-muted)', lineHeight: 1.5, opacity: 0.7 }}
                      >
                        {option.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Scroll indicator - fade at bottom */}
          {showScrollIndicator && (
            <div
              className="absolute bottom-0 left-0 right-0 pointer-events-none"
              style={{
                height: 60,
                background: 'linear-gradient(to top, rgba(4,3,2,0.95) 0%, transparent 100%)',
              }}
            />
          )}
        </div>

        {/* Scroll hint */}
        {showScrollIndicator && (
          <div className="text-center mb-3">
            <span
              className="font-sans text-xs flex items-center justify-center gap-2"
              style={{ color: 'var(--text-muted)', opacity: 0.5 }}
            >
              scroll for more <span style={{ fontSize: 10 }}>↓</span>
            </span>
          </div>
        )}

        {/* Selection count */}
        <div className="text-center mb-4">
          <span
            className="font-detective text-xs tracking-widest"
            style={{
              color: selected.size > 0 ? 'var(--accent)' : 'var(--text-muted)',
              opacity: selected.size > 0 ? 1 : 0.5,
            }}
          >
            {selected.size === 0
              ? 'No attack vectors selected'
              : `${selected.size} attack vector${selected.size > 1 ? 's' : ''} selected`}
          </span>
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
            disabled={selected.size === 0 || confirming}
            className="font-detective text-xs tracking-widest uppercase px-8 py-3 transition-all duration-300"
            style={{
              border: selected.size > 0
                ? '1px solid rgba(245,166,35,0.8)'
                : '1px solid rgba(245,166,35,0.2)',
              color: selected.size > 0 ? 'var(--accent)' : 'rgba(245,166,35,0.3)',
              background: selected.size > 0 ? 'rgba(245,166,35,0.12)' : 'transparent',
              boxShadow: selected.size > 0 ? '0 0 20px rgba(245,166,35,0.15)' : 'none',
              letterSpacing: '0.2em',
              cursor: selected.size > 0 ? 'pointer' : 'not-allowed',
              opacity: confirming ? 0.6 : 1,
            }}
          >
            {confirming ? 'Filing Report...' : 'Submit My Answer'}
          </button>
        </div>
      </div>
    </div>
  );
}
