import { useEffect, useState } from 'react';

interface Props {
  onNewGame: () => void;
  onCaseSelect: () => void;
  onHandbook: () => void;
  onBack?: () => void;
}

export default function TitleScreen({ onNewGame, onCaseSelect, onHandbook, onBack }: Props) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#0A0C12' }}>
      {/* Detective office background */}
      <OfficeBackground />

      {/* Rain on window */}
      <RainEffect />

      {/* Volumetric light from desk lamp */}
      <LampLight />

      {/* Atmospheric fog */}
      <FogLayer />

      {/* Vignette */}
      <div className="vignette" />
      <div className="scanlines" />
      <div className="noise-overlay" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full">

        {/* Back button */}
        {onBack && (
          <div
            className="absolute top-6 left-6 transition-all duration-700"
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

        {/* Case badge */}
        <div
          className="mb-3 transition-all duration-700"
          style={{ opacity: phase >= 1 ? 1 : 0, transform: phase >= 1 ? 'translateY(0)' : 'translateY(-20px)' }}
        >
          <span className="font-detective text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--accent)', opacity: 0.8 }}>
            Cybercrime Detective Division
          </span>
        </div>

        {/* Title */}
        <div
          className="transition-all duration-1000"
          style={{ opacity: phase >= 1 ? 1 : 0, transform: phase >= 1 ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <h1
            className="font-detective text-center leading-none"
            style={{
              fontSize: 'clamp(4rem, 12vw, 9rem)',
              color: 'var(--text-primary)',
              textShadow: '0 0 60px rgba(245,166,35,0.2), 0 4px 20px rgba(0,0,0,0.8)',
              letterSpacing: '-0.01em',
            }}
          >
            CASE FILES
          </h1>
        </div>

        {/* Subtitle */}
        <div
          className="mt-3 mb-12 transition-all duration-700"
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'translateY(0)' : 'translateY(10px)',
            transitionDelay: '0.2s',
          }}
        >
          <div className="flex items-center gap-4">
            <div style={{ height: 1, width: 60, background: 'rgba(245,166,35,0.4)' }} />
            <span className="font-serif italic text-lg" style={{ color: 'var(--text-muted)' }}>
              Cybercrime Detective
            </span>
            <div style={{ height: 1, width: 60, background: 'rgba(245,166,35,0.4)' }} />
          </div>
        </div>

        {/* Navigation buttons */}
        <div
          className="flex flex-col gap-3 items-center w-full max-w-xs transition-all duration-700"
          style={{ opacity: phase >= 3 ? 1 : 0, transform: phase >= 3 ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <TitleButton onClick={onNewGame} primary label="New Investigation" icon="◈" />
          <TitleButton onClick={onCaseSelect} label="Case Selection" icon="⊡" />
          <TitleButton onClick={onHandbook} label="Detective Handbook" icon="⊞" />
        </div>

        {/* Bottom credit */}
        <div
          className="absolute bottom-6 font-sans text-xs transition-opacity duration-700"
          style={{ color: 'var(--text-muted)', opacity: phase >= 3 ? 0.4 : 0, letterSpacing: '0.15em' }}
        >
          CYBERCRIME DIVISION — UNIT 7 — CLASSIFIED
        </div>
      </div>
    </div>
  );
}

function TitleButton({
  onClick,
  label,
  icon,
  primary = false,
}: {
  onClick: () => void;
  label: string;
  icon: string;
  primary?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="font-detective w-full px-8 py-3 text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3"
      style={{
        border: `1px solid ${primary
          ? hovered ? 'rgba(245,166,35,1)' : 'rgba(245,166,35,0.6)'
          : hovered ? 'rgba(245,166,35,0.6)' : 'rgba(245,166,35,0.2)'}`,
        background: primary
          ? hovered ? 'rgba(245,166,35,0.2)' : 'rgba(245,166,35,0.08)'
          : hovered ? 'rgba(245,166,35,0.08)' : 'transparent',
        color: primary ? 'var(--accent)' : hovered ? 'var(--accent)' : 'var(--text-muted)',
        boxShadow: hovered ? '0 0 30px rgba(245,166,35,0.15), inset 0 0 20px rgba(245,166,35,0.05)' : 'none',
        transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
        letterSpacing: '0.2em',
        fontSize: '0.7rem',
      }}
    >
      <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{icon}</span>
      {label}
    </button>
  );
}

function OfficeBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dark office walls */}
      <rect width="1440" height="900" fill="#080A0F" />

      {/* Floor */}
      <rect y="680" width="1440" height="220" fill="#0D0F14" />
      <rect y="680" width="1440" height="2" fill="#1A1D25" />

      {/* Back wall texture */}
      <rect width="1440" height="680" fill="url(#wallGrad)" />
      <defs>
        <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A0C15" />
          <stop offset="100%" stopColor="#0E1018" />
        </linearGradient>
      </defs>

      {/* Window frame - left */}
      <rect x="80" y="120" width="220" height="320" rx="4" fill="none" stroke="#1A1E2A" strokeWidth="12" />
      <rect x="86" y="126" width="208" height="308" fill="#050810" />
      {/* Window cross */}
      <rect x="186" y="126" width="4" height="308" fill="#1A1E2A" />
      <rect x="86" y="282" width="208" height="4" fill="#1A1E2A" />
      {/* Night city glow through window */}
      <rect x="86" y="126" width="208" height="308" fill="url(#windowGlow)" opacity="0.6" />
      <defs>
        <linearGradient id="windowGlow" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#0A1525" />
          <stop offset="60%" stopColor="#0D1A30" />
          <stop offset="100%" stopColor="#151F3A" />
        </linearGradient>
      </defs>

      {/* City lights through window */}
      {[100, 120, 145, 170, 200, 225, 250, 270].map((x, i) => (
        <rect
          key={i}
          x={x}
          y={180 + (i % 3) * 30}
          width={3 + (i % 2) * 2}
          height={6 + (i % 3) * 4}
          fill={i % 3 === 0 ? '#FFD07040' : '#4080FF30'}
          rx="1"
        />
      ))}

      {/* Desk */}
      <rect x="200" y="680" width="1040" height="80" rx="4" fill="#1A1208" />
      <rect x="200" y="680" width="1040" height="6" fill="#241908" />
      {/* Desk edge highlight */}
      <rect x="200" y="680" width="1040" height="2" fill="#2A200E" />

      {/* Desk lamp */}
      <rect x="980" y="560" width="8" height="120" fill="#1A1610" />
      <rect x="968" y="678" width="32" height="6" rx="2" fill="#1A1610" />
      {/* Lamp arm */}
      <line x1="984" y1="560" x2="920" y2="510" stroke="#1A1610" strokeWidth="8" strokeLinecap="round" />
      {/* Lamp head */}
      <ellipse cx="920" cy="510" rx="40" ry="18" fill="#1A1610" />
      <ellipse cx="920" cy="510" rx="35" ry="14" fill="#2A2418" />

      {/* Lamp glow on desk */}
      <ellipse cx="880" cy="682" rx="160" ry="30" fill="url(#lampGlow)" />
      <defs>
        <radialGradient id="lampGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#F5A62318" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Case files on desk */}
      {/* Manila folder 1 */}
      <rect x="320" y="655" width="180" height="28" rx="2" fill="#8B6914" transform="rotate(-3, 320, 655)" />
      <rect x="320" y="655" width="180" height="5" rx="2" fill="#9B7A1A" transform="rotate(-3, 320, 655)" />
      <rect x="330" y="668" width="80" height="3" rx="1" fill="#6B500F" transform="rotate(-3, 330, 668)" />

      {/* Manila folder 2 */}
      <rect x="500" y="648" width="200" height="32" rx="2" fill="#7A5C10" transform="rotate(2, 500, 648)" />
      <rect x="500" y="648" width="200" height="5" rx="2" fill="#8B6914" transform="rotate(2, 500, 648)" />

      {/* Scattered papers */}
      <rect x="650" y="660" width="120" height="22" rx="1" fill="#1E1C16" transform="rotate(-1, 650, 660)" />
      <rect x="654" y="665" width="60" height="2" rx="1" fill="#2E2C1F" transform="rotate(-1, 654, 665)" />
      <rect x="654" y="670" width="80" height="2" rx="1" fill="#2E2C1F" transform="rotate(-1, 654, 670)" />

      {/* Coffee mug */}
      <rect x="1100" y="645" width="40" height="38" rx="4" fill="#120E08" />
      <rect x="1100" y="645" width="40" height="5" rx="4" fill="#1A1410" />
      <rect x="1138" y="658" width="12" height="18" rx="6" fill="none" stroke="#120E08" strokeWidth="3" />
      {/* Steam */}
      <path d="M 1112 640 Q 1115 630 1112 620" stroke="#FFFFFF10" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 1122 638 Q 1125 625 1122 615" stroke="#FFFFFF10" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Magnifying glass */}
      <circle cx="760" cy="668" r="22" fill="none" stroke="#2A2010" strokeWidth="5" />
      <circle cx="760" cy="668" r="16" fill="#0A1015" opacity="0.6" />
      <line x1="776" y1="682" x2="790" y2="698" stroke="#2A2010" strokeWidth="5" strokeLinecap="round" />

      {/* Bookshelf on right wall */}
      <rect x="1280" y="200" width="160" height="480" fill="#0C0A08" />
      <rect x="1280" y="200" width="160" height="6" fill="#181410" />
      {[280, 360, 440, 520, 600].map((y, i) => (
        <rect key={i} x="1280" y={y} width="160" height="4" fill="#181410" />
      ))}
      {/* Books */}
      {[
        { x: 1285, y: 215, w: 18, h: 62, c: '#3D1A1A' },
        { x: 1305, y: 220, w: 14, h: 57, c: '#1A2D3D' },
        { x: 1321, y: 218, w: 20, h: 59, c: '#2D3D1A' },
        { x: 1343, y: 215, w: 16, h: 62, c: '#3D2D1A' },
        { x: 1361, y: 222, w: 12, h: 55, c: '#1A1A3D' },
        { x: 1375, y: 219, w: 22, h: 58, c: '#3D1A2D' },
        { x: 1399, y: 217, w: 18, h: 60, c: '#1A3D1A' },
        { x: 1285, y: 295, w: 16, h: 62, c: '#2A1A0A' },
        { x: 1303, y: 298, w: 20, h: 59, c: '#0A2A2A' },
        { x: 1325, y: 296, w: 14, h: 61, c: '#2A0A0A' },
      ].map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="1" fill={b.c} />
      ))}
    </svg>
  );
}

function LampLight() {
  return (
    <div
      className="absolute pointer-events-none light-beam"
      style={{
        right: '28%',
        top: '0',
        width: '400px',
        height: '100%',
        background:
          'conic-gradient(from 100deg at 65% 57%, rgba(245,166,35,0.12) 0deg, rgba(245,166,35,0.06) 20deg, transparent 35deg)',
        transformOrigin: '65% 57%',
      }}
    />
  );
}

function RainEffect() {
  const drops = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: 5.5 + (i % 20) * 1.2,
    duration: 0.8 + (i % 5) * 0.15,
    delay: (i * 0.13) % 2,
    opacity: 0.1 + (i % 4) * 0.05,
    height: 12 + (i % 6) * 4,
  }));

  return (
    <div
      className="absolute pointer-events-none overflow-hidden"
      style={{ left: 80, top: 126, width: 208, height: 308, zIndex: 5 }}
    >
      {drops.map((d) => (
        <div
          key={d.id}
          className="absolute rain-drop"
          style={{
            left: `${d.left}%`,
            top: '-20px',
            width: '1px',
            height: d.height,
            background: `linear-gradient(to bottom, transparent, rgba(150,180,255,${d.opacity}))`,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function FogLayer() {
  return (
    <>
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(to top, rgba(8,10,15,0.6) 0%, transparent 100%)',
          zIndex: 6,
        }}
      />
      {/* Floating dust motes */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute particle pointer-events-none"
          style={{
            left: `${15 + (i * 7) % 70}%`,
            bottom: `${10 + (i * 13) % 30}%`,
            width: 2,
            height: 2,
            borderRadius: '50%',
            background: 'rgba(245,166,35,0.3)',
            animationDuration: `${6 + (i % 4) * 2}s`,
            animationDelay: `${(i * 0.8) % 5}s`,
          }}
        />
      ))}
    </>
  );
}
