import { useState, useEffect } from 'react';
import type { HandbookTerm } from '../types/game';

interface Props {
  terms: HandbookTerm[];
  onClose: () => void;
  onBack?: () => void;
}

export default function Handbook({ terms, onClose, onBack }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState(0);
  const [pageFlipping, setPageFlipping] = useState(false);

  useEffect(() => { setTimeout(() => setOpen(true), 60); }, []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(onClose, 600);
  };

  const handleBack = () => {
    setOpen(false);
    setTimeout(() => {
      if (onBack) onBack();
      else onClose();
    }, 600);
  };

  const selectTerm = (i: number) => {
    if (i === selectedTerm) return;
    setPageFlipping(true);
    setTimeout(() => {
      setSelectedTerm(i);
      setPageFlipping(false);
    }, 200);
  };

  const term = terms[selectedTerm];

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(4,3,2,0.88)' }}
      onClick={handleClose}
    >
      <div
        className="relative transition-all duration-700"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) rotate(0deg)' : 'translateY(60px) rotate(-2deg)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Notebook outer cover */}
        <div
          style={{
            width: 'min(85vw, 780px)',
            height: 'min(85vh, 540px)',
            background: '#1A0E06',
            border: '3px solid #2A1A08',
            borderRadius: '4px 12px 12px 4px',
            boxShadow: '0 30px 80px rgba(0,0,0,0.9), -8px 0 20px rgba(0,0,0,0.5), inset -2px 0 10px rgba(0,0,0,0.3)',
            display: 'flex',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Spine */}
          <div
            style={{
              width: 24,
              background: 'linear-gradient(to right, #0A0604, #1A0E06)',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRight: '2px solid #2A1A08',
            }}
          >
            {/* Binding marks */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 16,
                  height: 2,
                  background: '#2A1A08',
                  borderRadius: 1,
                  margin: '6px 0',
                }}
              />
            ))}
          </div>

          {/* Left page - term list */}
          <div
            style={{
              width: '34%',
              background: 'linear-gradient(to right, #F5EDDA, #EDE4CC)',
              padding: '24px 16px',
              borderRight: '1px solid #C8B89A',
              position: 'relative',
              flexShrink: 0,
            }}
          >
            {/* Ruled lines */}
            <RuledLines />

            {/* Page header */}
            <div style={{ position: 'relative', zIndex: 2, marginBottom: 20 }}>
              <div
                className="font-detective text-xs tracking-widest uppercase mb-1"
                style={{ color: '#8B6914', opacity: 0.7 }}
              >
                Detective's Handbook
              </div>
              <div
                className="font-serif italic text-xs"
                style={{ color: '#6B4F10', opacity: 0.6 }}
              >
                — Cybercrime Glossary —
              </div>
            </div>

            {/* Term list */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              {terms.map((t, i) => (
                <button
                  key={t.term}
                  onClick={() => selectTerm(i)}
                  className="w-full text-left py-2 px-2 mb-1 transition-all duration-200 rounded"
                  style={{
                    background: i === selectedTerm ? 'rgba(139,105,20,0.15)' : 'transparent',
                    borderLeft: i === selectedTerm ? '3px solid #8B6914' : '3px solid transparent',
                  }}
                >
                  <div
                    className="font-detective text-xs"
                    style={{
                      color: i === selectedTerm ? '#5A3E08' : '#7A6040',
                      fontSize: '0.72rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {t.term}
                  </div>
                </button>
              ))}
            </div>

            {/* Page number */}
            <div
              className="absolute bottom-4 left-0 right-0 text-center font-detective text-xs"
              style={{ color: '#8B6914', opacity: 0.4 }}
            >
              — {selectedTerm + 1} —
            </div>

            {/* Coffee stain decoration */}
            <div
              className="absolute pointer-events-none"
              style={{
                bottom: 40,
                right: 20,
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: '2px solid rgba(139,105,20,0.15)',
                background: 'rgba(139,105,20,0.05)',
              }}
            />
          </div>

          {/* Right page - term detail */}
          <div
            style={{
              flex: 1,
              background: 'linear-gradient(to left, #F0E8D4, #EDE4CC)',
              padding: '28px 28px 28px 24px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <RuledLines />

            <div
              style={{
                position: 'relative',
                zIndex: 2,
                opacity: pageFlipping ? 0 : 1,
                transform: pageFlipping ? 'translateX(20px)' : 'translateX(0)',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
            >
              {/* Term header */}
              <div className="mb-6">
                <div
                  className="font-detective text-xs tracking-widest uppercase mb-2"
                  style={{ color: '#8B6914', opacity: 0.6 }}
                >
                  Cybersecurity Term
                </div>
                <h2
                  className="font-detective mb-3"
                  style={{
                    color: '#2A1A04',
                    fontSize: '1.6rem',
                    borderBottom: '2px solid rgba(139,105,20,0.3)',
                    paddingBottom: '8px',
                  }}
                >
                  {term.term}
                </h2>
                <p
                  className="font-serif text-base leading-relaxed"
                  style={{ color: '#3A2510', fontStyle: 'italic' }}
                >
                  {term.oneLiner}
                </p>
              </div>

              {/* Analogy */}
              <div className="mb-5">
                <div
                  className="font-detective text-xs tracking-widest uppercase mb-2"
                  style={{ color: '#8B6914', opacity: 0.5, fontSize: '0.6rem' }}
                >
                  Analogy
                </div>
                <div
                  className="font-sans text-sm leading-relaxed pl-3"
                  style={{
                    color: '#4A3418',
                    borderLeft: '2px solid rgba(139,105,20,0.3)',
                    lineHeight: 1.7,
                  }}
                >
                  {term.analogy}
                </div>
              </div>

              {/* In this case */}
              <div>
                <div
                  className="font-detective text-xs tracking-widest uppercase mb-2"
                  style={{ color: '#8B6914', opacity: 0.5, fontSize: '0.6rem' }}
                >
                  In This Case
                </div>
                <div
                  className="font-sans text-sm leading-relaxed"
                  style={{
                    color: '#3A2510',
                    lineHeight: 1.7,
                  }}
                >
                  {term.inThisCase}
                </div>
              </div>

              {/* Handwritten underline decoration */}
              <svg
                className="absolute"
                style={{ bottom: 30, right: 20, opacity: 0.15 }}
                width="80"
                height="40"
                viewBox="0 0 80 40"
              >
                <path
                  d="M 10 20 Q 30 10 50 22 Q 65 30 75 18"
                  fill="none"
                  stroke="#8B6914"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 20 30 Q 40 22 60 32"
                  fill="none"
                  stroke="#8B6914"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Page number */}
            <div
              className="absolute bottom-4 right-6 font-detective text-xs"
              style={{ color: '#8B6914', opacity: 0.4 }}
            >
              — {selectedTerm + 2} —
            </div>
          </div>
        </div>

        {/* Close button below notebook */}
        <div className="flex justify-center gap-4 mt-4">
          {onBack && (
            <button
              onClick={handleBack}
              className="font-detective text-xs tracking-widest uppercase px-6 py-2 transition-all duration-200"
              style={{
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'var(--text-muted)',
                background: 'transparent',
                letterSpacing: '0.2em',
              }}
            >
              ← Back
            </button>
          )}
          <button
            onClick={handleClose}
            className="font-detective text-xs tracking-widest uppercase px-6 py-2 transition-all duration-200"
            style={{
              border: '1px solid rgba(245,166,35,0.3)',
              color: 'var(--accent)',
              background: 'transparent',
              letterSpacing: '0.2em',
            }}
          >
            Close Handbook
          </button>
        </div>
      </div>
    </div>
  );
}

function RuledLines() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      {Array.from({ length: 22 }).map((_, i) => (
        <div
          key={i}
          className="absolute left-0 right-0"
          style={{
            top: 30 + i * 22,
            height: 1,
            background: 'rgba(139,105,20,0.12)',
          }}
        />
      ))}
      {/* Margin line */}
      <div
        className="absolute top-0 bottom-0"
        style={{ left: 36, width: 1, background: 'rgba(200,100,80,0.15)' }}
      />
    </div>
  );
}
