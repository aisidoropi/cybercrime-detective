import { useState, useEffect } from 'react';
import type { Level, InterviewQuestion } from '../types/game';

interface Props {
  level: Level;
  askedQuestions: string[];
  onQuestionAsked: (questionId: string) => void;
  onBeginInvestigation: () => void;
  onSkip: () => void;
  onBack?: () => void;
}

export default function VictimInterview({
  level,
  askedQuestions,
  onQuestionAsked,
  onBeginInvestigation,
  onSkip,
  onBack,
}: Props) {
  const [phase, setPhase] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState<InterviewQuestion | null>(null);
  const [showingAnswer, setShowingAnswer] = useState(false);
  const [answerVisible, setAnswerVisible] = useState(false);

  const questions = level.interviewQuestions || [];
  const allAsked = questions.length > 0 && questions.every(q => askedQuestions.includes(q.id));

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100);
    const t2 = setTimeout(() => setPhase(2), 400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleQuestionClick = (question: InterviewQuestion) => {
    if (askedQuestions.includes(question.id)) {
      setActiveQuestion(question);
      setShowingAnswer(true);
      setTimeout(() => setAnswerVisible(true), 50);
    } else {
      setActiveQuestion(question);
      setShowingAnswer(true);
      setTimeout(() => setAnswerVisible(true), 50);
      onQuestionAsked(question.id);
    }
  };

  const handleCloseAnswer = () => {
    setAnswerVisible(false);
    setTimeout(() => {
      setShowingAnswer(false);
      setActiveQuestion(null);
    }, 300);
  };

  const handleBegin = () => {
    onBeginInvestigation();
  };

  return (
    <div
      className="relative w-full h-full flex overflow-hidden"
      style={{ background: '#08090E' }}
    >
      {/* Background */}
      <InterviewBackground />

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

      {/* Main content */}
      <div className="relative z-20 flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-5xl grid grid-cols-[320px_1fr] gap-12">

          {/* Left: Victim panel */}
          <div
            className="transition-all duration-700"
            style={{
              opacity: phase >= 2 ? 1 : 0,
              transform: phase >= 2 ? 'translateX(0)' : 'translateX(-40px)',
            }}
          >
            <VictimPanel victim={level.victim} />
          </div>

          {/* Right: Questions panel */}
          <div
            className="transition-all duration-700"
            style={{
              opacity: phase >= 2 ? 1 : 0,
              transform: phase >= 2 ? 'translateX(0)' : 'translateX(40px)',
              transitionDelay: '0.15s',
            }}
          >
            {/* Header */}
            <div className="mb-6">
              <div className="font-detective text-xs tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--accent)', opacity: 0.7 }}>
                — Pre-Case Briefing —
              </div>
              <h2 className="font-detective text-2xl mb-2" style={{ color: 'var(--text-primary)' }}>
                Get to Know the Victim
              </h2>
              <p className="font-serif italic text-sm" style={{ color: 'var(--text-muted)' }}>
                Ask questions to understand {level.victim.name}'s situation. This may reveal useful context.
              </p>
            </div>

            {/* Question cards */}
            <div className="space-y-3 mb-8">
              {questions.map((q) => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  isAsked={askedQuestions.includes(q.id)}
                  onClick={() => handleQuestionClick(q)}
                />
              ))}
            </div>

            {/* Progress */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1.5">
                {questions.map((q) => (
                  <div
                    key={q.id}
                    className="transition-all duration-300"
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: askedQuestions.includes(q.id) ? 'var(--accent)' : 'rgba(245,166,35,0.2)',
                      boxShadow: askedQuestions.includes(q.id) ? '0 0 6px rgba(245,166,35,0.5)' : 'none',
                    }}
                  />
                ))}
              </div>
              <span className="font-detective text-xs tracking-widest" style={{ color: 'var(--text-muted)' }}>
                {askedQuestions.length}/{questions.length} questions asked
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleBegin}
                className={`font-detective text-xs tracking-widest uppercase px-8 py-3 transition-all duration-300 ${allAsked ? 'glow-pulse' : ''}`}
                style={{
                  border: allAsked
                    ? '1px solid rgba(122,191,106,0.8)'
                    : '1px solid rgba(245,166,35,0.5)',
                  color: allAsked ? 'var(--success)' : 'var(--accent)',
                  background: allAsked
                    ? 'rgba(122,191,106,0.1)'
                    : 'rgba(245,166,35,0.05)',
                  letterSpacing: '0.2em',
                  boxShadow: allAsked ? '0 0 20px rgba(122,191,106,0.2)' : 'none',
                }}
              >
                {allAsked ? 'Begin Investigation' : 'Skip Questions & Begin'}
              </button>

              <button
                onClick={onSkip}
                className="font-sans text-xs transition-all duration-200 hover:underline"
                style={{
                  color: 'var(--text-muted)',
                  opacity: 0.6,
                  textDecoration: 'none',
                }}
              >
                Skip to Investigation →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Answer dialogue overlay */}
      {showingAnswer && activeQuestion && (
        <div
          className="absolute inset-0 z-40 flex items-center justify-center"
          style={{ background: 'rgba(4,3,2,0.85)' }}
          onClick={handleCloseAnswer}
        >
          <div
            className="relative max-w-lg w-full mx-6 transition-all duration-300"
            style={{
              opacity: answerVisible ? 1 : 0,
              transform: answerVisible ? 'translateY(0)' : 'translateY(20px)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Speech bubble */}
            <div
              className="relative p-6"
              style={{
                background: 'linear-gradient(135deg, #14100A 0%, #0E0C08 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12,
                boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
              }}
            >
              {/* Victim portrait */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="flex-shrink-0"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(245,166,35,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <div className="font-detective text-sm" style={{ color: 'var(--text-primary)' }}>
                    {level.victim.name}
                  </div>
                  <div className="font-sans text-xs" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
                    Age {level.victim.age}
                  </div>
                </div>
              </div>

              {/* Question asked */}
              <div
                className="font-serif italic text-sm mb-4 px-3 py-2"
                style={{
                  color: 'var(--accent)',
                  background: 'rgba(245,166,35,0.05)',
                  borderLeft: '2px solid rgba(245,166,35,0.3)',
                }}
              >
                "{activeQuestion.question}"
              </div>

              {/* Answer */}
              <div
                className="font-sans text-base leading-relaxed"
                style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}
              >
                {activeQuestion.answer}
              </div>

              {/* Close button */}
              <button
                onClick={handleCloseAnswer}
                className="absolute top-4 right-4 font-detective text-xs tracking-widest uppercase px-3 py-1 transition-all duration-200"
                style={{
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--text-muted)',
                  background: 'transparent',
                }}
              >
                Close
              </button>
            </div>

            {/* Speech bubble tail */}
            <div
              className="absolute -bottom-2 left-8 w-4 h-4 rotate-45"
              style={{
                background: '#0E0C08',
                borderRight: '1px solid rgba(255,255,255,0.1)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function VictimPanel({ victim }: { victim: Level['victim'] }) {
  return (
    <div
      className="p-6"
      style={{
        background: 'linear-gradient(180deg, rgba(245,166,35,0.03) 0%, transparent 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Avatar placeholder */}
      <div
        className="mb-4 mx-auto"
        style={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(245,166,35,0.1) 0%, rgba(245,166,35,0.02) 100%)',
          border: '2px solid rgba(245,166,35,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span className="text-5xl" style={{ opacity: 0.8 }}>👤</span>
      </div>

      {/* Name and age */}
      <div className="text-center mb-4">
        <div className="font-detective text-xl mb-1" style={{ color: 'var(--text-primary)' }}>
          {victim.name}
        </div>
        <div className="font-sans text-sm" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
          Age {victim.age}
        </div>
      </div>

      {/* Description */}
      <div
        className="text-center font-serif italic text-sm leading-relaxed"
        style={{ color: 'var(--text-muted)', opacity: 0.7 }}
      >
        {victim.description}
      </div>

      {/* Divider */}
      <div className="my-4" style={{ height: 1, background: 'rgba(255,255,255,0.1)' }} />

      {/* Case note */}
      <div
        className="text-center font-sans text-xs"
        style={{ color: 'var(--text-muted)', opacity: 0.5 }}
      >
        The victim is here to answer your questions before the investigation begins.
      </div>
    </div>
  );
}

function QuestionCard({
  question,
  isAsked,
  onClick,
}: {
  question: InterviewQuestion;
  isAsked: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full text-left px-4 py-3 transition-all duration-300 flex items-center gap-3"
      style={{
        background: isAsked
          ? 'rgba(122,191,106,0.08)'
          : hovered
            ? 'rgba(255,255,255,0.03)'
            : 'rgba(255,255,255,0.01)',
        border: isAsked
          ? '1px solid rgba(122,191,106,0.3)'
          : `1px solid ${hovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)'}`,
      }}
    >
      {/* Question icon */}
      <div
        className="flex-shrink-0 w-8 h-8 flex items-center justify-center transition-all duration-200"
        style={{
          borderRadius: '50%',
          background: isAsked ? 'rgba(122,191,106,0.15)' : 'rgba(255,255,255,0.05)',
          color: isAsked ? 'var(--success)' : 'var(--text-muted)',
        }}
      >
        {isAsked ? '✓' : '?'}
      </div>

      {/* Question text */}
      <div className="flex-1">
        <div
          className="font-sans text-sm transition-colors duration-200"
          style={{
            color: isAsked ? 'var(--success)' : hovered ? 'var(--text-primary)' : 'var(--text-muted)',
            lineHeight: 1.4,
          }}
        >
          {question.question}
        </div>
      </div>

      {/* Arrow */}
      <div
        className="flex-shrink-0 transition-all duration-200"
        style={{
          color: isAsked ? 'var(--success)' : 'var(--accent)',
          opacity: hovered ? 1 : 0.4,
        }}
      >
        →
      </div>
    </button>
  );
}

function InterviewBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 30% 50%, rgba(245,166,35,0.04) 0%, transparent 50%)',
        }}
      />
      {/* Vertical accent lines */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0"
          style={{
            left: `${25 + i * 25}%`,
            width: 1,
            background: 'linear-gradient(to bottom, transparent 0%, rgba(245,166,35,0.08) 30%, rgba(245,166,35,0.08) 70%, transparent 100%)',
          }}
        />
      ))}
    </div>
  );
}
