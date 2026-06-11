import { useState, useCallback } from 'react';
import type { GameScreen, GameState, Clue, LevelProgress } from './types/game';
import { LEVELS, getLevelById } from './data/levels';
import TitleScreen from './components/TitleScreen';
import DetectiveSelect from './components/DetectiveSelect';
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
  navigationStack: [],
  savedProgress: {},
  selectedDetective: null,
});

export default function App() {
  const [state, setState] = useState<GameState>(initialState);
  const [overlay, setOverlay] = useState<'board' | 'handbook' | null>(null);

  // Navigate to a new screen, pushing current screen to stack
  const navigateTo = useCallback((screen: GameScreen, levelId?: number) => {
    setState((s) => {
      // Save current progress before navigating away from scene
      let newSavedProgress = s.savedProgress;
      if (s.screen === 'scene' && s.discoveredClues.length > 0) {
        newSavedProgress = {
          ...s.savedProgress,
          [s.currentLevel]: {
            levelId: s.currentLevel,
            discoveredClues: [...s.discoveredClues],
            accusationMade: s.accusationMade,
            accusationCorrect: s.accusationCorrect,
          },
        };
      }

      const newState: GameState = {
        ...s,
        screen,
        navigationStack: [
          ...s.navigationStack,
          { screen: s.screen, levelId: s.currentLevel },
        ],
        savedProgress: newSavedProgress,
      };

      if (levelId !== undefined) {
        newState.currentLevel = levelId;
      }

      return newState;
    });
    setOverlay(null);
  }, []);

  // Go back to previous screen, restoring progress if needed
  const goBack = useCallback(() => {
    setState((s) => {
      if (s.navigationStack.length === 0) {
        return s;
      }

      const lastNav = s.navigationStack[s.navigationStack.length - 1];
      const newStack = s.navigationStack.slice(0, -1);

      // Save current progress before going back
      let newSavedProgress = s.savedProgress;
      if (s.screen === 'scene' && s.discoveredClues.length > 0) {
        newSavedProgress = {
          ...s.savedProgress,
          [s.currentLevel]: {
            levelId: s.currentLevel,
            discoveredClues: [...s.discoveredClues],
            accusationMade: s.accusationMade,
            accusationCorrect: s.accusationCorrect,
          },
        };
      }

      // Restore progress if going back to a scene
      if (lastNav.screen === 'scene' && lastNav.levelId !== undefined) {
        const saved = newSavedProgress[lastNav.levelId];
        return {
          ...s,
          screen: lastNav.screen,
          currentLevel: lastNav.levelId,
          discoveredClues: saved?.discoveredClues || [],
          accusationMade: saved?.accusationMade || false,
          accusationCorrect: saved?.accusationCorrect || null,
          navigationStack: newStack,
          savedProgress: newSavedProgress,
        };
      }

      return {
        ...s,
        screen: lastNav.screen,
        currentLevel: lastNav.levelId ?? s.currentLevel,
        navigationStack: newStack,
        savedProgress: newSavedProgress,
      };
    });
    setOverlay(null);
  }, []);

  // Start a new level, clearing progress
  const startLevel = useCallback((levelId: number, resumeProgress?: LevelProgress) => {
    setState((s) => {
      // If resuming, use saved progress
      if (resumeProgress) {
        return {
          ...s,
          screen: 'scene',
          currentLevel: levelId,
          discoveredClues: resumeProgress.discoveredClues,
          selectedClue: null,
          accusationMade: resumeProgress.accusationMade,
          accusationCorrect: resumeProgress.accusationCorrect,
          navigationStack: [
            ...s.navigationStack,
            { screen: s.screen, levelId: s.currentLevel },
          ],
        };
      }

      // New game - clear progress for this level
      const newSavedProgress = { ...s.savedProgress };
      delete newSavedProgress[levelId];

      return {
        ...s,
        screen: 'scene',
        currentLevel: levelId,
        discoveredClues: [],
        selectedClue: null,
        accusationMade: false,
        accusationCorrect: null,
        navigationStack: [
          ...s.navigationStack,
          { screen: s.screen, levelId: s.currentLevel },
        ],
        savedProgress: newSavedProgress,
      };
    });
    setOverlay(null);
  }, []);

  // Clear saved progress for a level
  const clearProgress = useCallback((levelId: number) => {
    setState((s) => {
      const newSavedProgress = { ...s.savedProgress };
      delete newSavedProgress[levelId];
      return { ...s, savedProgress: newSavedProgress };
    });
  }, []);

  // Select a detective
  const selectDetective = useCallback((detective: { id: string; name: string; accentColor: string }) => {
    setState((s) => ({
      ...s,
      selectedDetective: detective,
      screen: 'case-select',
      navigationStack: [
        ...s.navigationStack,
        { screen: s.screen },
      ],
    }));
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

    setState((s) => {
      // Clear saved progress after accusation
      const newSavedProgress = { ...s.savedProgress };
      delete newSavedProgress[s.currentLevel];

      return {
        ...s,
        screen: 'outcome',
        accusationMade: true,
        accusationCorrect: correct,
        savedProgress: newSavedProgress,
      };
    });
    setOverlay(null);
  }, [state.currentLevel]);

  const level = getLevelById(state.currentLevel) ?? LEVELS[0];

  // Check if we can go back
  const canGoBack = state.navigationStack.length > 0;

  return (
    <div className="relative overflow-hidden font-sans" style={{ width: '100vw', height: '100vh' }}>
      {/* Screen transitions */}
      <ScreenLayer active={state.screen === 'title'}>
        <TitleScreen
          onNewGame={() => navigateTo('detective-select')}
          onCaseSelect={() => navigateTo('case-select')}
          onHandbook={() => {
            setState((s) => ({ ...s, currentLevel: 1 }));
            setOverlay('handbook');
          }}
          onBack={canGoBack ? goBack : undefined}
        />
      </ScreenLayer>

      <ScreenLayer active={state.screen === 'detective-select'}>
        <DetectiveSelect
          onSelect={selectDetective}
          onBack={canGoBack ? goBack : undefined}
        />
      </ScreenLayer>

      <ScreenLayer active={state.screen === 'case-select'}>
        <CaseSelect
          onSelect={(id) => startLevel(id)}
          onResume={(id, progress) => startLevel(id, progress)}
          onBack={canGoBack ? goBack : undefined}
          savedProgress={state.savedProgress}
        />
      </ScreenLayer>

      <ScreenLayer active={state.screen === 'scene'}>
        <Scene
          level={level}
          discoveredClues={state.discoveredClues}
          onClueDiscovered={handleClueDiscovered}
          onOpenBoard={() => setOverlay('board')}
          onOpenHandbook={() => setOverlay('handbook')}
          onAccuse={() => navigateTo('accusation')}
          onBack={canGoBack ? goBack : undefined}
          onCloseOverlay={() => setOverlay(null)}
          detectiveName={state.selectedDetective?.name}
        />
        {overlay === 'board' && (
          <EvidenceBoard
            clues={[...level.clues, ...level.bonusClues]}
            discoveredIds={state.discoveredClues}
            totalClues={level.clues.length + level.bonusClues.length}
            onClose={() => setOverlay(null)}
            onBack={canGoBack ? goBack : undefined}
          />
        )}
        {overlay === 'handbook' && (
          <Handbook
            terms={level.handbookTerms}
            onClose={() => setOverlay(null)}
            onBack={canGoBack ? goBack : undefined}
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
          onBack={canGoBack ? goBack : undefined}
          onCloseOverlay={() => setOverlay(null)}
          detectiveName={state.selectedDetective?.name}
        />
        {overlay === 'board' && (
          <EvidenceBoard
            clues={[...level.clues, ...level.bonusClues]}
            discoveredIds={state.discoveredClues}
            totalClues={level.clues.length + level.bonusClues.length}
            onClose={() => setOverlay(null)}
            onBack={canGoBack ? goBack : undefined}
          />
        )}
        {overlay === 'handbook' && (
          <Handbook
            terms={level.handbookTerms}
            onClose={() => setOverlay(null)}
            onBack={canGoBack ? goBack : undefined}
          />
        )}
        <AccusationScreen
          level={level}
          onSubmit={handleAccusation}
          onCancel={() => goBack()}
          onBack={canGoBack ? goBack : undefined}
        />
      </ScreenLayer>

      <ScreenLayer active={state.screen === 'outcome'}>
        <OutcomeScreen
          level={level}
          correct={state.accusationCorrect ?? false}
          discoveredCount={state.discoveredClues.length}
          onReplay={() => {
            // Clear progress and restart
            clearProgress(state.currentLevel);
            startLevel(state.currentLevel);
          }}
          onTitle={() => {
            setState((s) => ({
              ...s,
              screen: 'title',
              navigationStack: [],
            }));
            setOverlay(null);
          }}
          onNewCase={() => navigateTo('case-select')}
          onBack={canGoBack ? goBack : undefined}
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
