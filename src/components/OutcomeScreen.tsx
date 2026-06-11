import { useState, useEffect } from 'react';
import type { Level } from '../types/game';

interface Props {
  level: Level;
  correct: boolean;
  discoveredCount: number;
  onReplay: () => void;
  onTitle: () => void;
  onNewCase: () => void;
  onBack?: () => void;
}

export default function OutcomeScreen({ level, correct, discoveredCount, onReplay, onTitle, onNewCase, onBack }: Props) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setPhase(3), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#08090E' }}
    >
      {/* Background atmospheric lines */}
      <OutcomeBackground correct={correct} />

      {/* Vignette */}
      <div className="vignette" />
      <div className="noise-overlay" />

      <div className="relative z-20 text-center max-w-2xl mx-auto px-6">

        {/* Back button */}
        {onBack && (
          <div className="absolute top-6 left-6">
            <button
              onClick={onBack}
              className="font-detective text-xs tracking-widest uppercase px-4 py-2 transition-all duration-200"
              style={{
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'var(--text-muted)',
                background: 'transparent',
                letterSpacing: '0.15em',
              }}
            >
              ← Back
            </button>
          </div>
        )}

        {/* Status stamp */}
        <div
          className="mb-6 transition-all duration-700"
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'scale(1) rotate(-2deg)' : 'scale(1.4) rotate(0deg)',
          }}
        >
          <div
            className="inline-block font-detective text-lg tracking-[0.3em] uppercase px-8 py-3"
            style={{
              border: `3px solid ${correct ? 'rgba(122,191,106,0.8)' : 'rgba(224,90,71,0.8)'}`,
              color: correct ? 'var(--success)' : 'var(--danger)',
              boxShadow: correct
                ? '0 0 40px rgba(122,191,106,0.2), inset 0 0 20px rgba(122,191,106,0.05)'
                : '0 0 40px rgba(224,90,71,0.2), inset 0 0 20px rgba(224,90,71,0.05)',
            }}
          >
            {correct ? '✓ Case Closed' : '✗ Incorrect Deduction'}
          </div>
        </div>

        {/* Main outcome text */}
        <div
          className="mb-8 transition-all duration-700"
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <h2
            className="font-detective text-3xl mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            {correct ? level.title : 'Review Your Evidence'}
          </h2>
          <div
            className="font-serif text-base leading-relaxed"
            style={{ color: 'var(--text-muted)', lineHeight: 1.9, maxWidth: 560, margin: '0 auto' }}
          >
            {correct ? level.successOutcome : level.failureOutcome}
          </div>
        </div>

        {/* Stats row */}
        {correct && (
          <div
            className="flex justify-center gap-12 mb-10 transition-all duration-700"
            style={{
              opacity: phase >= 2 ? 1 : 0,
              transform: phase >= 2 ? 'translateY(0)' : 'translateY(10px)',
            }}
          >
            <Stat value={`${discoveredCount}`} label="Clues Found" />
            <Stat value={level.clues.length === discoveredCount ? 'Perfect' : 'Good'} label="Investigation" />
            <Stat value="01" label="Case Solved" />
          </div>
        )}

        {/* Action buttons */}
        <div
          className="flex gap-4 justify-center transition-all duration-700"
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          {!correct && (
            <OutcomeButton onClick={onReplay} label="← Return to Scene" />
          )}
          {correct
            ? <OutcomeButton onClick={onNewCase} label="New Case" primary />
            : <OutcomeButton onClick={onReplay} label="Replay Case" />
          }
          <OutcomeButton onClick={onTitle} label="Main Menu" />
        </div>

        {/* Correct answer reveal */}
        {!correct && (
          <div
            className="mt-8 transition-all duration-700"
            style={{
              opacity: phase >= 3 ? 1 : 0,
            }}
          >
            <div
              className="font-detective text-xs tracking-widest uppercase px-6 py-3 inline-block"
              style={{
                color: 'var(--success)',
                border: '1px solid rgba(122,191,106,0.3)',
                background: 'rgba(122,191,106,0.05)',
              }}
            >
              Correct Answer: {level.accusationOptions.find(o => o.id === level.correctAnswer)?.label}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-detective text-2xl mb-1" style={{ color: 'var(--accent)' }}>{value}</div>
      <div className="font-detective text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
        {label}
      </div>
    </div>
  );
}

function OutcomeButton({ onClick, label, primary = false }: { onClick: () => void; label: string; primary?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="font-detective text-xs tracking-widest uppercase px-8 py-3 transition-all duration-300"
      style={{
        border: primary
          ? `1px solid ${hovered ? 'rgba(245,166,35,1)' : 'rgba(245,166,35,0.6)'}`
          : `1px solid ${hovered ? 'rgba(245,166,35,0.5)' : 'rgba(255,255,255,0.1)'}`,
        color: primary ? 'var(--accent)' : hovered ? 'var(--accent)' : 'var(--text-muted)',
        background: primary ? (hovered ? 'rgba(245,166,35,0.15)' : 'rgba(245,166,35,0.05)') : 'transparent',
        letterSpacing: '0.2em',
        transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
      }}
    >
      {label}
    </button>
  );
}

function OutcomeBackground({ correct }: { correct: boolean }) {
  const color = correct ? '#7ABF6A' : '#E05A47';

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at center, ${color}08 0%, transparent 65%)`,
        }}
      />
      {/* Horizontal scan lines accent */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute left-0 right-0"
          style={{
            top: `${15 + i * 14}%`,
            height: 1,
            background: `linear-gradient(to right, transparent 0%, ${color}15 30%, ${color}15 70%, transparent 100%)`,
          }}
        />
      ))}
    </div>
  );
}
