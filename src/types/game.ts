export type GameScreen =
  | 'title'
  | 'detective-select'
  | 'case-select'
  | 'victim-interview'
  | 'scene'
  | 'accusation'
  | 'outcome';

export interface Clue {
  id: string;
  label: string;
  shortDesc: string;
  detail: string;
  type: 'photo' | 'note' | 'screenshot' | 'witness';
  icon: string;
  x: number; // % from left in scene
  y: number; // % from top in scene
  hitW?: number; // hit box width %
  hitH?: number; // hit box height %
  discovered: boolean;
  boardX?: number; // position on evidence board
  boardY?: number;
}

export interface HandbookTerm {
  term: string;
  oneLiner: string;
  analogy: string;
  inThisCase: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  answer: string;
}

export interface Level {
  id: number;
  title: string;
  subtitle: string;
  victim: { name: string; age: number; description: string };
  briefing: string;
  interviewQuestions?: InterviewQuestion[];
  clues: Clue[];
  bonusClues: Clue[];
  accusationOptions: { id: string; label: string; description: string; icon?: string }[];
  correctAnswers: string[];
  handbookTerms: HandbookTerm[];
  successOutcome: string;
  failureOutcome: string;
}

export interface NavigationState {
  screen: GameScreen;
  levelId?: number;
}

export interface LevelProgress {
  levelId: number;
  discoveredClues: string[];
  accusationMade: boolean;
  accusationCorrect: boolean | null;
  interviewComplete?: boolean;
  askedQuestions?: string[];
}

export interface GameState {
  screen: GameScreen;
  currentLevel: number;
  discoveredClues: string[];
  selectedClue: Clue | null;
  accusationMade: boolean;
  accusationCorrect: boolean | null;
  handbookUnlocked: string[];
  navigationStack: NavigationState[];
  savedProgress: Record<number, LevelProgress>;
  selectedDetective: { id: string; name: string; accentColor: string } | null;
  interviewAskedQuestions: string[];
  interviewComplete: boolean;
  selectedAccusations: string[];
}
