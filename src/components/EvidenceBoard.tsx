import { useState, useEffect, useRef } from 'react';
import type { Clue } from '../types/game';

interface Props {
  clues: Clue[];
  discoveredIds: string[];
  totalClues?: number;
  onClose: () => void;
  onBack?: () => void;
  interviewComplete?: boolean;
}

// Fixed positions for pins on the board
const PIN_POSITIONS: Record<string, { x: number; y: number; rotation: number }> = {
  'phone-notification':   { x: 120, y: 80,  rotation: -3 },
  'sender-number':        { x: 340, y: 65,  rotation: 2  },
  'suspicious-website':   { x: 560, y: 95,  rotation: -2 },
  'fridge-note':          { x: 185, y: 280, rotation: 4  },
  'browser-indicator':    { x: 430, y: 295, rotation: -5 },
  'coffee-mug':           { x: 60,  y: 190, rotation: 6  },
  'newspaper':            { x: 640, y: 295, rotation: -4 },
};

// String connections between related clues
const CONNECTIONS = [
  ['phone-notification', 'sender-number'],
  ['phone-notification', 'suspicious-website'],
  ['suspicious-website', 'browser-indicator'],
  ['suspicious-website', 'fridge-note'],
  ['sender-number', 'fridge-note'],
];

const CARD_W = 140;
const CARD_H = 100;

export default function EvidenceBoard({ clues, discoveredIds, totalClues, onClose, onBack, interviewComplete }: Props) {
  const [open, setOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => { setTimeout(() => setOpen(true), 60); }, []);

  const discovered = clues.filter((c) => discoveredIds.includes(c.id));
  const total = totalClues ?? clues.length;

  const handleClose = () => {
    setOpen(false);
    setTimeout(onClose, 500);
  };

  const handleBack = () => {
    setOpen(false);
    setTimeout(() => {
      if (onBack) onBack();
      else onClose();
    }, 500);
  };

  // Compute string endpoints from card center+pin position
  const getCardCenter = (id: string) => {
    const pos = PIN_POSITIONS[id];
    if (!pos) return { x: 0, y: 0 };
    return { x: pos.x + CARD_W / 2, y: pos.y + CARD_H / 2 };
  };

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(4,3,2,0.88)' }}
    >
      {/* Board container */}
      <div
        className="relative transition-all duration-700"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? 'scale(1) translateY(0)' : 'scale(0.94) translateY(30px)',
          width: 'min(90vw, 900px)',
          height: 'min(85vh, 600px)',
        }}
      >
        {/* Corkboard surface */}
        <div
          className="relative w-full h-full overflow-hidden"
          style={{
            background: '#4A3520',
            border: '14px solid #2E1E0A',
            borderRadius: '4px',
            boxShadow: '0 30px 80px rgba(0,0,0,0.8), inset 0 0 40px rgba(0,0,0,0.4)',
          }}
        >
          {/* Cork texture overlay */}
          <CorkTexture />

          {/* Board header */}
          <div
            className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-3 z-20"
            style={{ background: 'rgba(30,14,4,0.7)', borderBottom: '1px solid rgba(255,200,100,0.15)' }}
          >
            <div className="flex items-center gap-4">
              {onBack && (
                <button
                  onClick={handleBack}
                  className="font-detective text-xs tracking-widest uppercase px-3 py-1 transition-all duration-200"
                  style={{
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'var(--text-muted)',
                    background: 'transparent',
                  }}
                >
                  ← Back
                </button>
              )}
              <div>
                <span className="font-detective text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--accent)', opacity: 0.8 }}>
                  Investigation Board
                </span>
                <span className="font-detective text-xs ml-4" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
                  Case 01 — The Morning Message
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-detective text-xs tracking-widest" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
                {discovered.length} of {total} EVIDENCE ITEMS
              </span>
              {interviewComplete && (
                <span
                  className="font-detective text-xs tracking-widest px-2 py-0.5"
                  style={{
                    color: 'var(--success)',
                    border: '1px solid rgba(122,191,106,0.3)',
                    background: 'rgba(122,191,106,0.08)',
                    fontSize: '0.6rem',
                  }}
                >
                  Thorough Briefing
                </span>
              )}
              <button
                onClick={handleClose}
                className="font-detective text-xs tracking-widest uppercase px-3 py-1 transition-all duration-200"
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

          {/* Empty state */}
          {discovered.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="font-detective text-2xl mb-3" style={{ color: 'rgba(245,166,35,0.2)' }}>📌</div>
                <div className="font-detective text-sm tracking-widest uppercase" style={{ color: 'rgba(245,166,35,0.3)' }}>
                  No evidence collected yet
                </div>
                <div className="font-serif italic text-xs mt-2" style={{ color: 'rgba(245,166,35,0.2)' }}>
                  Investigate the scene to pin clues here
                </div>
              </div>
            </div>
          )}

          {/* SVG layer for strings */}
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            style={{ top: 48 }}
          >
            {CONNECTIONS.map(([a, b]) => {
              const aDiscovered = discoveredIds.includes(a);
              const bDiscovered = discoveredIds.includes(b);
              if (!aDiscovered || !bDiscovered) return null;
              const aPos = getCardCenter(a);
              const bPos = getCardCenter(b);
              const isHighlighted = hoveredId === a || hoveredId === b;
              return (
                <line
                  key={`${a}-${b}`}
                  x1={aPos.x}
                  y1={aPos.y}
                  x2={bPos.x}
                  y2={bPos.y}
                  stroke={isHighlighted ? '#E05A47' : '#C0303080'}
                  strokeWidth={isHighlighted ? 1.5 : 1}
                  strokeDasharray={isHighlighted ? '' : ''}
                  className="draw-string transition-all duration-300"
                  style={{ filter: isHighlighted ? 'drop-shadow(0 0 4px rgba(224,90,71,0.6))' : 'none' }}
                />
              );
            })}
          </svg>

          {/* Evidence cards */}
          <div className="absolute inset-0" style={{ top: 48 }}>
            {discovered.map((clue, i) => {
              const pos = PIN_POSITIONS[clue.id] ?? { x: 50 + i * 150, y: 80, rotation: 0 };
              return (
                <EvidenceCard
                  key={clue.id}
                  clue={clue}
                  x={pos.x}
                  y={pos.y}
                  rotation={pos.rotation}
                  isHighlighted={hoveredId === clue.id}
                  animDelay={i * 0.12}
                  onHover={setHoveredId}
                />
              );
            })}
          </div>

          {/* Pin legend */}
          <div
            className="absolute bottom-3 right-4 flex items-center gap-4 z-20"
          >
            <LegendItem color="#F5A623" label="Field Note" />
            <LegendItem color="#4A90D9" label="Screenshot" />
            <LegendItem color="#7ABF6A" label="Photograph" />
            <LegendItem color="#B98FD4" label="Statement" />
          </div>
        </div>
      </div>
    </div>
  );
}

function EvidenceCard({
  clue, x, y, rotation, isHighlighted, animDelay, onHover,
}: {
  clue: Clue;
  x: number;
  y: number;
  rotation: number;
  isHighlighted: boolean;
  animDelay: number;
  onHover: (id: string | null) => void;
}) {
  const typeColor = {
    photo: '#7ABF6A',
    note: '#F5A623',
    screenshot: '#4A90D9',
    witness: '#B98FD4',
  }[clue.type];

  const bgColor = {
    photo: '#0F1A0D',
    note: '#1A1408',
    screenshot: '#0D1520',
    witness: '#160D1C',
  }[clue.type];

  return (
    <div
      className="absolute pin-drop"
      style={{
        left: x,
        top: y,
        width: CARD_W,
        transform: `rotate(${rotation}deg) ${isHighlighted ? 'scale(1.06)' : 'scale(1)'}`,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        animationDelay: `${animDelay}s`,
        cursor: 'default',
        zIndex: isHighlighted ? 20 : 10,
      }}
      onMouseEnter={() => onHover(clue.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Thumbtack */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 z-20"
        style={{
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: `radial-gradient(circle at 35% 35%, ${typeColor}CC, ${typeColor}66)`,
          boxShadow: `0 2px 6px rgba(0,0,0,0.6), 0 0 8px ${typeColor}40`,
        }}
      />
      <div
        className="absolute -top-1 left-1/2 -translate-x-1/2 z-19"
        style={{
          width: 2,
          height: 6,
          background: 'rgba(0,0,0,0.4)',
          borderRadius: '0 0 1px 1px',
        }}
      />

      {/* Card body */}
      <div
        style={{
          background: bgColor,
          border: `1px solid ${typeColor}30`,
          boxShadow: isHighlighted
            ? `0 8px 24px rgba(0,0,0,0.7), 0 0 20px ${typeColor}20`
            : '0 4px 12px rgba(0,0,0,0.5)',
          padding: '10px',
          minHeight: CARD_H,
        }}
      >
        {/* Type badge */}
        <div
          className="font-detective text-xs mb-2 pb-1"
          style={{
            color: typeColor,
            opacity: 0.7,
            borderBottom: `1px solid ${typeColor}20`,
            letterSpacing: '0.1em',
            fontSize: '0.6rem',
          }}
        >
          {clue.icon} {clue.type.toUpperCase()}
        </div>

        {/* Label */}
        <div
          className="font-detective text-xs leading-tight mb-2"
          style={{ color: 'var(--text-primary)', fontSize: '0.7rem' }}
        >
          {clue.label}
        </div>

        {/* Short desc */}
        <div
          className="font-serif italic"
          style={{ color: 'var(--text-muted)', fontSize: '0.62rem', lineHeight: 1.5, opacity: 0.7 }}
        >
          {clue.shortDesc}
        </div>
      </div>
    </div>
  );
}

function CorkTexture() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base cork color already on parent */}
      {/* Subtle grain marks */}
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${(i * 17.3 + 3) % 100}%`,
            top: `${(i * 13.7 + 8) % 100}%`,
            width: `${1 + (i % 3)}px`,
            height: `${6 + (i % 8) * 3}px`,
            background: i % 3 === 0 ? 'rgba(0,0,0,0.08)' : 'rgba(255,200,100,0.04)',
            borderRadius: '2px',
            transform: `rotate(${(i * 37) % 180}deg)`,
          }}
        />
      ))}
      {/* Darker edge shadow */}
      <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 80px rgba(0,0,0,0.5)' }} />
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, opacity: 0.7 }} />
      <span className="font-detective" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.55rem', letterSpacing: '0.1em' }}>
        {label}
      </span>
    </div>
  );
}
