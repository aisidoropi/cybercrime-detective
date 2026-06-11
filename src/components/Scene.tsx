import { useState, useEffect } from 'react';
import type { Clue, Level } from '../types/game';
import KitchenScene from './KitchenScene';
import GamingRoomScene from './GamingRoomScene';

interface Props {
  level: Level;
  discoveredClues: string[];
  onClueDiscovered: (clue: Clue) => void;
  onOpenBoard: () => void;
  onOpenHandbook: () => void;
  onAccuse: () => void;
  onBack?: () => void;
  onCloseOverlay?: () => void;
  detectiveName?: string | null;
}

export default function Scene({ level, discoveredClues, onClueDiscovered, onOpenBoard, onOpenHandbook, onAccuse, onBack, onCloseOverlay, detectiveName }: Props) {
  const [activeClue, setActiveClue] = useState<Clue | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [newPin, setNewPin] = useState<string | null>(null);

  const allClues = [...level.clues, ...level.bonusClues];
  const found = discoveredClues.length;
  const required = level.clues.length;

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 3500);
    return () => clearTimeout(t);
  }, []);

  const handleClueClick = (clue: Clue) => {
    setActiveClue(clue);
    setZoomed(true);
    if (!discoveredClues.includes(clue.id)) {
      onClueDiscovered(clue);
      setNewPin(clue.id);
      setTimeout(() => setNewPin(null), 2000);
    }
  };

  const handleClose = () => {
    setActiveClue(null);
    setZoomed(false);
  };

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#0A0806' }}>

      {/* Scene background */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          transform: zoomed ? 'scale(1.06)' : 'scale(1)',
          filter: zoomed ? 'blur(2px) brightness(0.6)' : 'brightness(1)',
          transformOrigin: activeClue ? `${activeClue.x}% ${activeClue.y}%` : 'center center',
        }}
      >
        {level.id === 1 && <KitchenScene />}
        {level.id === 2 && <GamingRoomScene />}

        {/* Atmospheric particles */}
        <AtmosphericParticles />

        {/* Vignette */}
        <div className="vignette" />
        <div className="scanlines" />
        <div className="noise-overlay" />

        {/* Morning light overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 22% 45%, rgba(255,230,160,0.06) 0%, transparent 55%)',
          }}
        />

        {/* Interactive hotspots */}
        {allClues.map((clue) => (
          <Hotspot
            key={clue.id}
            clue={clue}
            discovered={discoveredClues.includes(clue.id)}
            onClick={handleClueClick}
          />
        ))}
      </div>

      {/* HUD overlay (stays sharp) */}
      <HUD
        level={level}
        found={found}
        required={required}
        onOpenBoard={onOpenBoard}
        onOpenHandbook={onOpenHandbook}
        onAccuse={onAccuse}
        onBack={onBack}
        onCloseOverlay={onCloseOverlay}
        showHint={showHint}
        newPin={newPin}
        detectiveName={detectiveName}
      />

      {/* Clue inspection card */}
      {activeClue && (
        <ClueCard clue={activeClue} onClose={handleClose} isNew={newPin === activeClue.id} />
      )}
    </div>
  );
}

function Hotspot({ clue, discovered, onClick }: { clue: Clue; discovered: boolean; onClick: (c: Clue) => void }) {
  const [hovered, setHovered] = useState(false);

  const w = clue.hitW ?? 6;
  const h = clue.hitH ?? 8;

  return (
    <button
      className="absolute hotspot group"
      style={{
        left: `${clue.x - w / 2}%`,
        top: `${clue.y - h / 2}%`,
        width: `${w}%`,
        height: `${h}%`,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
      }}
      onClick={() => onClick(clue)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Center dot — only visible on hover or when discovered */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 pointer-events-none"
        style={{
          width: hovered ? 14 : 6,
          height: hovered ? 14 : 6,
          opacity: hovered ? 1 : (discovered ? 0.45 : 0),
          background: discovered
            ? `rgba(122,191,106,0.9)`
            : `rgba(245,166,35,1)`,
          boxShadow: hovered
            ? discovered
              ? '0 0 16px rgba(122,191,106,0.8)'
              : '0 0 16px rgba(245,166,35,0.8)'
            : 'none',
        }}
      />

      {/* Tooltip label on hover */}
      {hovered && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 font-detective text-xs whitespace-nowrap px-3 py-1 rounded pointer-events-none z-30 fade-in"
          style={{
            background: 'rgba(10,8,6,0.92)',
            border: '1px solid rgba(245,166,35,0.4)',
            color: 'var(--accent)',
            letterSpacing: '0.1em',
            boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
          }}
        >
          {discovered && <span style={{ color: 'var(--success)' }}>✓ </span>}
          {clue.label}
        </div>
      )}
    </button>
  );
}

function HUD({
  level, found, required, onOpenBoard, onOpenHandbook, onAccuse, onBack, onCloseOverlay, showHint, newPin, detectiveName,
}: {
  level: Level;
  found: number;
  required: number;
  onOpenBoard: () => void;
  onOpenHandbook: () => void;
  onAccuse: () => void;
  onBack?: () => void;
  onCloseOverlay?: () => void;
  showHint: boolean;
  newPin: string | null;
  detectiveName?: string | null;
}) {
  const canAccuse = found >= required;

  const handleBack = () => {
    if (onCloseOverlay) onCloseOverlay();
    if (onBack) onBack();
  };

  return (
    <>
      {/* Top bar - case info */}
      <div
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,8,6,0.9) 0%, transparent 100%)',
        }}
      >
        {/* Back button */}
        {onBack && (
          <button
            onClick={handleBack}
            className="font-detective text-xs tracking-widest uppercase px-3 py-1.5 transition-all duration-200 mr-4"
            style={{
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'var(--text-muted)',
              background: 'transparent',
              letterSpacing: '0.1em',
              fontSize: '0.6rem',
            }}
          >
            ← Back
          </button>
        )}

        {/* Case label */}
        <div>
          {detectiveName && (
            <div className="font-detective text-xs tracking-[0.25em] uppercase mb-0.5" style={{ color: 'var(--success)', opacity: 0.8 }}>
              Detective {detectiveName} is on the case
            </div>
          )}
          <div className="font-detective text-xs tracking-[0.25em] uppercase" style={{ color: 'var(--accent)', opacity: 0.7 }}>
            Case {String(level.id).padStart(2, '0')} — {level.title}
          </div>
          <div className="font-serif italic text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Victim: {level.victim.name}, {level.victim.age} — {level.victim.description}
          </div>
        </div>

        {/* Clue counter */}
        <div className="flex items-center gap-2">
          {Array.from({ length: required }).map((_, i) => (
            <div
              key={i}
              className="transition-all duration-500"
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: i < found ? 'var(--accent)' : 'rgba(245,166,35,0.2)',
                boxShadow: i < found ? '0 0 8px rgba(245,166,35,0.6)' : 'none',
              }}
            />
          ))}
          <span className="font-detective text-xs ml-2 tracking-widest" style={{ color: 'var(--text-muted)' }}>
            {found}/{required} CLUES
          </span>
        </div>
      </div>

      {/* Bottom action bar */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4"
        style={{
          background: 'linear-gradient(to top, rgba(10,8,6,0.95) 0%, transparent 100%)',
        }}
      >
        {/* Left: scene name */}
        <div className="font-detective text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
          {level.id === 1 ? 'Freiburg, Germany — Tuesday Morning' : level.id === 2 ? 'Berlin, Germany — Friday Evening' : ''}
        </div>

        {/* Right: action buttons */}
        <div className="flex items-center gap-3">
          <HudButton onClick={onOpenHandbook} label="Handbook" icon="📓" />
          <HudButton onClick={onOpenBoard} label="Evidence Board" icon="📌" highlight={!!newPin} />
          {canAccuse && (
            <HudButton
              onClick={onAccuse}
              label="Make Accusation"
              icon="⚖"
              danger
            />
          )}
        </div>
      </div>

      {/* Hint banner */}
      {showHint && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-center pointer-events-none fade-in"
          style={{ opacity: showHint ? 1 : 0, transition: 'opacity 1s ease' }}
        >
          <div
            className="font-detective text-sm tracking-widest uppercase px-8 py-4"
            style={{
              color: 'var(--text-muted)',
              background: 'rgba(10,8,6,0.7)',
              border: '1px solid rgba(245,166,35,0.15)',
              letterSpacing: '0.2em',
            }}
          >
            Click glowing objects to investigate
          </div>
        </div>
      )}

      {/* New clue pinned notification */}
      {newPin && (
        <div
          className="absolute top-20 right-6 z-40 pin-drop"
          style={{
            background: 'rgba(10,8,6,0.95)',
            border: '1px solid rgba(245,166,35,0.6)',
            padding: '10px 18px',
            boxShadow: '0 0 30px rgba(245,166,35,0.2)',
          }}
        >
          <span className="font-detective text-xs tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
            📌 Evidence Added to Board
          </span>
        </div>
      )}
    </>
  );
}

function HudButton({
  onClick, label, icon, highlight = false, danger = false,
}: {
  onClick: () => void;
  label: string;
  icon: string;
  highlight?: boolean;
  danger?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`font-detective text-xs tracking-widest uppercase px-4 py-2 transition-all duration-300 flex items-center gap-2 ${highlight ? 'glow-pulse' : ''}`}
      style={{
        border: `1px solid ${danger
          ? hovered ? 'rgba(224,90,71,0.9)' : 'rgba(224,90,71,0.5)'
          : hovered ? 'rgba(245,166,35,0.8)' : 'rgba(245,166,35,0.3)'}`,
        background: danger
          ? hovered ? 'rgba(224,90,71,0.2)' : 'rgba(224,90,71,0.05)'
          : hovered ? 'rgba(245,166,35,0.1)' : 'rgba(10,8,6,0.6)',
        color: danger ? 'var(--danger)' : 'var(--accent)',
        letterSpacing: '0.15em',
        fontSize: '0.65rem',
      }}
    >
      <span>{icon}</span>
      {label}
    </button>
  );
}

function ClueCard({ clue, onClose, isNew }: { clue: Clue; onClose: () => void; isNew: boolean }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  const typeColor = {
    photo: '#7ABF6A',
    note: '#F5A623',
    screenshot: '#4A90D9',
    witness: '#B98FD4',
  }[clue.type];

  const typeLabel = {
    photo: 'Photograph',
    note: 'Field Note',
    screenshot: 'Digital Screenshot',
    witness: 'Witness Statement',
  }[clue.type];

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ background: 'rgba(5,4,3,0.6)', opacity: visible ? 1 : 0 }}
      />

      {/* Card */}
      <div
        className="relative max-w-lg w-full mx-6 transition-all duration-500"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.96)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Card body */}
        <div
          style={{
            background: 'linear-gradient(135deg, #14100A 0%, #0E0C08 100%)',
            border: `1px solid ${typeColor}40`,
            boxShadow: `0 20px 60px rgba(0,0,0,0.8), 0 0 40px ${typeColor}15`,
          }}
        >
          {/* Card header */}
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{ borderBottom: `1px solid ${typeColor}25`, background: `${typeColor}08` }}
          >
            <div>
              <div className="font-detective text-xs tracking-widest uppercase mb-1" style={{ color: typeColor, opacity: 0.7 }}>
                {typeLabel}
              </div>
              <h3 className="font-detective text-lg" style={{ color: 'var(--text-primary)' }}>
                {clue.label}
              </h3>
            </div>
            <div className="text-3xl">{clue.icon}</div>
          </div>

          {/* Short desc */}
          <div
            className="px-6 py-3 font-serif italic text-sm"
            style={{ color: 'var(--text-muted)', borderBottom: `1px solid rgba(255,255,255,0.05)` }}
          >
            "{clue.shortDesc}"
          </div>

          {/* Detail */}
          <div className="px-6 py-5">
            <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--text-primary)', lineHeight: 1.8 }}>
              {clue.detail}
            </p>
          </div>

          {/* Footer */}
          <div
            className="px-6 py-3 flex items-center justify-between"
            style={{ borderTop: `1px solid rgba(255,255,255,0.05)` }}
          >
            {isNew ? (
              <span className="font-detective text-xs tracking-widest uppercase" style={{ color: 'var(--success)' }}>
                ✓ Pinned to Evidence Board
              </span>
            ) : (
              <span className="font-detective text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)', opacity: 0.4 }}>
                Previously Examined
              </span>
            )}
            <button
              onClick={onClose}
              className="font-detective text-xs tracking-widest uppercase px-4 py-1.5 transition-all duration-200"
              style={{
                border: '1px solid rgba(245,166,35,0.3)',
                color: 'var(--accent)',
                background: 'transparent',
              }}
            >
              Close
            </button>
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-4 h-4 pointer-events-none" style={{ borderTop: `2px solid ${typeColor}60`, borderLeft: `2px solid ${typeColor}60` }} />
        <div className="absolute top-0 right-0 w-4 h-4 pointer-events-none" style={{ borderTop: `2px solid ${typeColor}60`, borderRight: `2px solid ${typeColor}60` }} />
        <div className="absolute bottom-0 left-0 w-4 h-4 pointer-events-none" style={{ borderBottom: `2px solid ${typeColor}60`, borderLeft: `2px solid ${typeColor}60` }} />
        <div className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none" style={{ borderBottom: `2px solid ${typeColor}60`, borderRight: `2px solid ${typeColor}60` }} />
      </div>
    </div>
  );
}

function AtmosphericParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none z-5">
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute particle"
          style={{
            left: `${(i * 17 + 10) % 90}%`,
            bottom: `${(i * 23 + 5) % 40}%`,
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            borderRadius: '50%',
            background: i % 4 === 0 ? 'rgba(255,230,180,0.25)' : 'rgba(255,255,255,0.1)',
            animationDuration: `${8 + (i % 5) * 2}s`,
            animationDelay: `${(i * 0.7) % 6}s`,
          }}
        />
      ))}
    </div>
  );
}
