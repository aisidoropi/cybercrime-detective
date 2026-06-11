import { useState } from 'react';
import { LEVELS } from '../data/levels';
import type { LevelProgress } from '../types/game';

interface Props {
  onSelect: (levelId: number) => void;
  onResume: (levelId: number, progress: LevelProgress) => void;
  onBack?: () => void;
  savedProgress: Record<number, LevelProgress>;
}

export default function CaseSelect({ onSelect, onResume, onBack, savedProgress }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  const futureCases = [
    { id: 3, title: 'The Phantom Payment', subtitle: 'Six figures vanished from a hospital account overnight.', locked: true },
    { id: 4, title: 'Operation Dormant', subtitle: 'A backdoor planted years ago. Now it\'s awake.', locked: true },
  ];

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#0A0C12' }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(245,166,35,0.04) 0%, transparent 65%)',
        }}
      />
      <div className="vignette" />
      <div className="noise-overlay" />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="font-detective text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--accent)', opacity: 0.6 }}>
            Cybercrime Detective Division
          </div>
          <h1 className="font-detective text-4xl mb-3" style={{ color: 'var(--text-primary)' }}>
            Case Selection
          </h1>
          <p className="font-serif italic text-sm" style={{ color: 'var(--text-muted)' }}>
            Choose an open investigation. Each case is a new cybercrime to solve.
          </p>
        </div>

        {/* Back button */}
        {onBack && (
          <div className="mb-6">
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

        {/* Cases grid */}
        <div className="space-y-4 mb-8">
          {/* Available cases */}
          {LEVELS.map((level) => {
            const progress = savedProgress[level.id];
            const hasProgress = progress && progress.discoveredClues.length > 0;
            const totalClues = level.clues.length + level.bonusClues.length;

            return (
              <div
                key={level.id}
                className="relative w-full text-left px-6 py-5 transition-all duration-300"
                style={{
                  background: hovered === level.id ? 'rgba(245,166,35,0.08)' : 'rgba(255,255,255,0.02)',
                  border: hovered === level.id ? '1px solid rgba(245,166,35,0.6)' : '1px solid rgba(245,166,35,0.15)',
                  boxShadow: hovered === level.id ? '0 0 30px rgba(245,166,35,0.1)' : 'none',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="font-detective text-xs tracking-widest uppercase px-2 py-0.5"
                        style={{ background: 'rgba(122,191,106,0.15)', color: 'var(--success)', border: '1px solid rgba(122,191,106,0.3)', fontSize: '0.6rem' }}
                      >
                        Open
                      </span>
                      <span className="font-detective text-xs" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
                        Case {String(level.id).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="font-detective text-xl mb-1" style={{ color: 'var(--text-primary)' }}>
                      {level.title}
                    </h3>
                    <p className="font-serif italic text-sm" style={{ color: 'var(--text-muted)', opacity: 0.7 }}>
                      {level.subtitle}
                    </p>
                    <div className="mt-3 font-detective text-xs" style={{ color: 'var(--text-muted)', opacity: 0.4 }}>
                      Victim: {level.victim.name}, {level.victim.age} — {totalClues} evidence items
                    </div>

                    {/* Progress indicator */}
                    {hasProgress && (
                      <div className="mt-2 font-detective text-xs flex items-center gap-2" style={{ color: 'var(--accent)' }}>
                        <span style={{ color: 'var(--success)' }}>●</span>
                        <span>In Progress: {progress.discoveredClues.length}/{totalClues} evidence items found</span>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-3">
                    {hasProgress ? (
                      <>
                        <button
                          onClick={() => onResume(level.id, progress)}
                          onMouseEnter={() => setHovered(level.id)}
                          onMouseLeave={() => setHovered(null)}
                          className="font-detective text-xs tracking-widest uppercase px-4 py-2 transition-all duration-200"
                          style={{
                            border: '1px solid rgba(122,191,106,0.5)',
                            color: 'var(--success)',
                            background: 'rgba(122,191,106,0.1)',
                            letterSpacing: '0.1em',
                          }}
                        >
                          Resume
                        </button>
                        <button
                          onClick={() => onSelect(level.id)}
                          onMouseEnter={() => setHovered(level.id)}
                          onMouseLeave={() => setHovered(null)}
                          className="font-detective text-xs tracking-widest uppercase px-4 py-2 transition-all duration-200"
                          style={{
                            border: '1px solid rgba(245,166,35,0.3)',
                            color: 'var(--text-muted)',
                            background: 'transparent',
                            letterSpacing: '0.1em',
                          }}
                        >
                          New Game
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => onSelect(level.id)}
                        onMouseEnter={() => setHovered(level.id)}
                        onMouseLeave={() => setHovered(null)}
                        className="text-2xl transition-transform duration-300"
                        style={{ transform: hovered === level.id ? 'translateX(6px)' : 'translateX(0)', color: 'var(--accent)', opacity: 0.6 }}
                      >
                        →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Future / locked cases */}
          {futureCases.map((c) => (
            <div
              key={c.id}
              className="w-full px-6 py-5"
              style={{
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,255,255,0.05)',
                opacity: 0.4,
                cursor: 'not-allowed',
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="font-detective text-xs tracking-widest uppercase px-2 py-0.5"
                      style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.6rem' }}
                    >
                      Locked
                    </span>
                    <span className="font-detective text-xs" style={{ color: 'var(--text-muted)', opacity: 0.4 }}>
                      Case {String(c.id).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-detective text-xl mb-1" style={{ color: 'var(--text-primary)' }}>
                    {c.title}
                  </h3>
                  <p className="font-serif italic text-sm" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
                    {c.subtitle}
                  </p>
                </div>
                <div style={{ color: 'var(--text-muted)', opacity: 0.4, fontSize: '1.2rem' }}>🔒</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom back button */}
        {onBack && (
          <div className="text-center">
            <button
              onClick={onBack}
              className="font-detective text-xs tracking-widest uppercase px-6 py-2 transition-all duration-200"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--text-muted)',
                background: 'transparent',
                letterSpacing: '0.15em',
              }}
            >
              ← Back to Main Menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
