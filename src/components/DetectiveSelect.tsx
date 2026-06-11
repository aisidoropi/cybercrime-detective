import { useState, useEffect } from 'react';
import { DETECTIVES, GUEST_DETECTIVE, type Detective } from '../data/detectives';

interface Props {
  onSelect: (detective: { id: string; name: string; accentColor: string }) => void;
  onBack?: () => void;
}

export default function DetectiveSelect({ onSelect, onBack }: Props) {
  const [phase, setPhase] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [randomizing, setRandomizing] = useState(false);
  const [randomHighlight, setRandomHighlight] = useState<string | null>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100);
    const t2 = setTimeout(() => setPhase(2), 400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleSelect = (detective: Detective) => {
    onSelect({
      id: detective.id,
      name: detective.name,
      accentColor: detective.accentColor,
    });
  };

  const handlePickRandom = () => {
    if (randomizing) return;
    setRandomizing(true);
    setRandomHighlight(null);

    // Animate through cards
    let iterations = 0;
    const totalIterations = 12;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * DETECTIVES.length);
      setRandomHighlight(DETECTIVES[randomIndex].id);
      iterations++;

      if (iterations >= totalIterations) {
        clearInterval(interval);
        // Final selection
        const finalDetective = DETECTIVES[Math.floor(Math.random() * DETECTIVES.length)];
        setRandomHighlight(finalDetective.id);

        setTimeout(() => {
          handleSelect(finalDetective);
        }, 400);
      }
    }, 100 + (iterations * 15));
  };

  const handleSkip = () => {
    onSelect({
      id: GUEST_DETECTIVE.id,
      name: GUEST_DETECTIVE.name,
      accentColor: GUEST_DETECTIVE.accentColor,
    });
  };

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#08090E' }}
    >
      {/* Background */}
      <DetectiveBackground />

      {/* Vignette */}
      <div className="vignette" />
      <div className="noise-overlay" />

      {/* Back button */}
      {onBack && (
        <div
          className="absolute top-6 left-6 z-30 transition-all duration-500"
          style={{ opacity: phase >= 1 ? 1 : 0 }}
        >
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

      {/* Header */}
      <div
        className="relative z-20 text-center mb-8 transition-all duration-700"
        style={{
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? 'translateY(0)' : 'translateY(-20px)',
        }}
      >
        <div className="font-detective text-xs tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--accent)', opacity: 0.7 }}>
          — Select Your Character —
        </div>
        <h1 className="font-detective text-4xl mb-3" style={{ color: 'var(--text-primary)' }}>
          Choose Your Detective
        </h1>
        <p className="font-serif italic text-sm" style={{ color: 'var(--text-muted)', maxWidth: 400, margin: '0 auto' }}>
          Each investigator brings their own approach to solving cybercrime cases.
        </p>
      </div>

      {/* Detective cards */}
      <div
        className="relative z-20 flex flex-wrap justify-center gap-4 max-w-4xl px-6 transition-all duration-700"
        style={{
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? 'translateY(0)' : 'translateY(30px)',
        }}
      >
        {DETECTIVES.map((det) => (
          <DetectiveCard
            key={det.id}
            detective={det}
            isHovered={hoveredId === det.id}
            isHighlighted={randomHighlight === det.id}
            onHover={() => setHoveredId(det.id)}
            onLeave={() => setHoveredId(null)}
            onClick={() => handleSelect(det)}
          />
        ))}
      </div>

      {/* Actions */}
      <div
        className="relative z-20 flex flex-col items-center gap-6 mt-10 transition-all duration-700"
        style={{
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? 'translateY(0)' : 'translateY(20px)',
        }}
      >
        <button
          onClick={handlePickRandom}
          disabled={randomizing}
          className="font-detective text-xs tracking-widest uppercase px-8 py-3 transition-all duration-300"
          style={{
            border: randomizing ? '1px solid rgba(245,166,35,0.4)' : '1px solid rgba(245,166,35,0.6)',
            color: randomizing ? 'rgba(245,166,35,0.5)' : 'var(--accent)',
            background: randomizing ? 'rgba(245,166,35,0.08)' : 'rgba(245,166,35,0.05)',
            letterSpacing: '0.2em',
            cursor: randomizing ? 'not-allowed' : 'pointer',
          }}
        >
          {randomizing ? 'Selecting...' : 'Pick Random'}
        </button>

        <button
          onClick={handleSkip}
          className="font-sans text-xs transition-all duration-200 hover:underline"
          style={{
            color: 'var(--text-muted)',
            opacity: 0.6,
            textDecoration: 'none',
          }}
        >
          Skip / Play as Guest Detective
        </button>
      </div>
    </div>
  );
}

function DetectiveCard({
  detective,
  isHovered,
  isHighlighted,
  onHover,
  onLeave,
  onClick,
}: {
  detective: Detective;
  isHovered: boolean;
  isHighlighted: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const accentColor = detective.accentColor;

  return (
    <button
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative text-left transition-all duration-300"
      style={{
        width: 160,
        padding: '16px',
        background: isHighlighted
          ? `linear-gradient(135deg, ${accentColor}20, ${accentColor}08)`
          : isHovered
            ? 'rgba(255,255,255,0.04)'
            : 'rgba(255,255,255,0.01)',
        border: isHighlighted
          ? `1px solid ${accentColor}`
          : `1px solid ${isHovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: isHighlighted
          ? `0 0 30px ${accentColor}30`
          : isHovered
            ? '0 4px 20px rgba(0,0,0,0.3)'
            : 'none',
        transform: isHovered || isHighlighted ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Avatar */}
      <div
        className="mb-3 overflow-hidden"
        style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          border: `2px solid ${isHovered || isHighlighted ? accentColor : 'rgba(255,255,255,0.1)'}`,
          background: detective.avatar ? 'transparent' : `${accentColor}20`,
        }}
      >
        {detective.avatar ? (
          <img
            src={detective.avatar}
            alt={detective.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center font-detective text-xl"
            style={{ color: accentColor }}
          >
            {detective.name[0]}
          </div>
        )}
      </div>

      {/* Name and age */}
      <div
        className="font-detective text-sm mb-1 transition-colors duration-200"
        style={{
          color: isHovered || isHighlighted ? accentColor : 'var(--text-primary)',
          letterSpacing: '0.05em',
        }}
      >
        {detective.name}
      </div>
      <div className="font-sans text-xs mb-2" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
        Age {detective.age}
      </div>

      {/* Quote */}
      <div
        className="font-serif italic text-xs leading-relaxed"
        style={{
          color: 'var(--text-muted)',
          opacity: isHovered || isHighlighted ? 0.8 : 0.5,
          lineHeight: 1.4,
        }}
      >
        "{detective.quote}"
      </div>

      {/* Accent bar */}
      <div
        className="absolute bottom-0 left-0 right-0 transition-all duration-300"
        style={{
          height: 2,
          background: accentColor,
          opacity: isHovered || isHighlighted ? 1 : 0,
        }}
      />
    </button>
  );
}

function DetectiveBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(245,166,35,0.05) 0%, transparent 60%)',
        }}
      />
      {/* Horizontal accent lines */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="absolute left-0 right-0"
          style={{
            top: `${25 + i * 18}%`,
            height: 1,
            background: 'linear-gradient(to right, transparent 0%, rgba(245,166,35,0.08) 30%, rgba(245,166,35,0.08) 70%, transparent 100%)',
          }}
        />
      ))}
    </div>
  );
}
