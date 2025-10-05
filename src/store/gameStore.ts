import { create } from 'zustand';

interface GameParameters {
  career: number;
  relations: number;
  health: number;
  money: number;
}

interface ParameterChange {
  career: number;
  relations: number;
  health: number;
  money: number;
}

interface GameAction {
  name: string;
  description: string;
  image_url: string;
  parameter_change: ParameterChange;
  time_cost: number;
}

interface RandomEventReaction {
  name: string;
  description: string;
  parameter_change: ParameterChange;
}

interface RandomEvent {
  name: string;
  description: string;
  reactions: RandomEventReaction[];
}

interface GameState {
  id: string | null;
  parameters: GameParameters;
  parameterModifications: GameParameters;
  turn_description: string;
  current_stage: number;
  gender: string;
  name: string;
  goal: string;
  big_actions: GameAction[];
  small_actions: GameAction[];
  random_event: RandomEvent | null;
  age: number;
  isLoading: boolean;
  error: string | null;
  turnChoices: {
    small_actions: GameAction[];
    big_actions: GameAction[];
  };
  gamePhase: 'landing' | 'onboarding' | 'gameplay' | 'gameover';
}

interface GameStore extends GameState {
  createNewGame: (gender: string, goal: string, name: string) => Promise<void>;
  resetGame: () => void;
  updateTurnChoices: (choices: typeof initialState.turnChoices) => void;
  tempSetParameterModifications: (deltas: GameParameters) => void;
  applyChangesToParams: () => void;
  resetParameterModificationsToCurrent: () => void;
  setGamePhase: (phase: GameState['gamePhase']) => void;
}

const initialState: GameState = {
  id: null,
  parameters: {
    career: 0,
    relations: 0,
    health: 0,
    money: 0,
  },
  parameterModifications: {
    career: 0,
    relations: 0,
    health: 0,
    money: 0,
  },
  turnChoices: {
    small_actions: [],
    big_actions: [],
  },
  turn_description: '',
  current_stage: 0,
  gender: '',
  name: '',
  goal: '',
  big_actions: [],
  small_actions: [],
  random_event: null,
  age: 0,
  isLoading: false,
  error: null,
  gamePhase: 'landing',
};

export const useGameStore = create<GameStore>((set) => ({
  ...initialState,

  createNewGame: async (gender: string, goal: string, name: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch('/api/create-new-game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gender, goal, name }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create game: ${response.statusText}`);
      }

      const data = await response.json();

      set({
        id: data.id,
        parameters: data.parameters,
        parameterModifications: data.parameters,
        turn_description: data.turn_description,
        current_stage: data.current_stage,
        gender: data.gender,
        name: data.name,
        goal: data.goal,
        big_actions: data.big_actions || [],
        small_actions: data.small_actions || [],
        random_event: data.random_event || null,
        age: data.age,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  },

  resetGame: () => {
    set(initialState);
  },

  updateTurnChoices: (choices) => set({ turnChoices: choices }),

  tempSetParameterModifications: (deltas) =>
    set((state) => ({
      parameterModifications: {
        career: Math.max(0, state.parameters.career + deltas.career),
        relations: Math.max(0, state.parameters.relations + deltas.relations),
        health: Math.max(0, state.parameters.health + deltas.health),
        money: Math.max(0, state.parameters.money + deltas.money),
      },
    })),

  applyChangesToParams: () =>
    set((state) => {
      const newParams = { ...state.parameterModifications };
      const isGameOver = Object.values(newParams).some((value) => value <= 0);

      return {
        parameters: newParams,
        gamePhase: isGameOver ? 'gameover' : state.gamePhase,
      };
    }),

  resetParameterModificationsToCurrent: () =>
    set((state) => ({
      parameterModifications: { ...state.parameters },
    })),

  setGamePhase: (phase) => set({ gamePhase: phase }),
}));
