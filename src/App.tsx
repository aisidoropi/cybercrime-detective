import { useState, useCallback } from 'react';
import type { GameScreen, GameState, Clue } from './types/game';
import { LEVELS, getLevelById } from './data/levels';
import TitleScreen from './components/TitleScreen';
import Scene from './components/Scene';
import EvidenceBoard from './components/EvidenceBoard';
import Handbook from './components/Handbook';
import AccusationScreen from './components/AccusationScreen';
import OutcomeScreen from './components/OutcomeScreen';
import CaseSelect from './components/CaseSelect';

const initialState = (): GameState => ({
  screen: 'title',
  currentLevel: 1,
  discoveredClues: [],
  selectedClue: null,
  accusationMade: false,
  accusationCorrect: null,
  handbookUnlocked: [],
});

export default function App() {
  const [state, setState] = useState<GameState>(initialState);
  const [overlay, setOverlay] = useState<'board' | 'handbook' | null>(null);

  const setScreen = (screen: GameScreen) =>
    setState((s) => ({ ...s, screen }));

  const startLevel = useCallback((levelId: number) => {
    setState((s) => ({
      ...s,
      screen: 'scene',
      currentLevel: levelId,
      discoveredClues: [],
      selectedClue: null,
      accusationMade: false,
      accusationCorrect: null,
    }));
    setOverlay(null);
  }, []);

  const handleClueDiscovered = useCallback((clue: Clue) => {
    setState((s) => {
      if (s.discoveredClues.includes(clue.id)) return s;
      return { ...s, discoveredClues: [...s.discoveredClues, clue.id] };
    });
  }, []);

  const handleAccusation = useCallback((answerId: string) => {
    const level = getLevelById(state.currentLevel);
    if (!level) return;
    const correct = answerId === level.correctAnswer;
    setState((s) => ({
      ...s,
      screen: 'outcome',
      accusationMade: true,
      accusationCorrect: correct,
    }));
    setOverlay(null);
  }, [state.currentLevel]);

  const level = getLevelById(state.currentLevel) ?? LEVELS[0];

  return (
    <div className="relative overflow-hidden font-sans" style={{ width: '100vw', height: '100vh' }}>
      {/* Screen transitions */}
      <ScreenLayer active={state.screen === 'title'}>
        <TitleScreen
          onNewGame={() => setScreen('case-select')}
          onCaseSelect={() => setScreen('case-select')}
          onHandbook={() => {
            setState((s) => ({ ...s, screen: 'scene', currentLevel: 1 }));
            setOverlay('handbook');
          }}
        />
      </ScreenLayer>

      <ScreenLayer active={state.screen === 'case-select'}>
        <CaseSelect
          onSelect={(id) => startLevel(id)}
          onBack={() => setScreen('title')}
        />
      </ScreenLayer>

      <ScreenLayer active={state.screen === 'scene'}>
        <Scene
          level={level}
          discoveredClues={state.discoveredClues}
          onClueDiscovered={handleClueDiscovered}
          onOpenBoard={() => setOverlay('board')}
          onOpenHandbook={() => setOverlay('handbook')}
          onAccuse={() => setScreen('accusation')}
          onBack={() => setScreen('case-select')}
        />
        {overlay === 'board' && (
          <EvidenceBoard
            clues={[...level.clues, ...level.bonusClues]}
            discoveredIds={state.discoveredClues}
            onClose={() => setOverlay(null)}
          />
        )}
        {overlay === 'handbook' && (
          <Handbook
            terms={level.handbookTerms}
            onClose={() => setOverlay(null)}
          />
        )}
      </ScreenLayer>

      <ScreenLayer active={state.screen === 'accusation'}>
        <Scene
          level={level}
          discoveredClues={state.discoveredClues}
          onClueDiscovered={handleClueDiscovered}
          onOpenBoard={() => setOverlay('board')}
          onOpenHandbook={() => setOverlay('handbook')}
          onAccuse={() => {}}
          onBack={() => setScreen('scene')}
        />
        <AccusationScreen
          level={level}
          onSubmit={handleAccusation}
          onCancel={() => setScreen('scene')}
        />
      </ScreenLayer>

      <ScreenLayer active={state.screen === 'outcome'}>
        <OutcomeScreen
          level={level}
          correct={state.accusationCorrect ?? false}
          discoveredCount={state.discoveredClues.length}
          onReplay={() => startLevel(state.currentLevel)}
          onTitle={() => setScreen('title')}
          onNewCase={() => setScreen('case-select')}
        />
      </ScreenLayer>
    </div>
  );
}

function ScreenLayer({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div
      className="absolute inset-0 transition-opacity duration-500"
      style={{
        opacity: active ? 1 : 0,
        pointerEvents: active ? 'auto' : 'none',
        zIndex: active ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
}
