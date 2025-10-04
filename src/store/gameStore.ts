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
}

interface GameStore extends GameState {
  createNewGame: (gender: string, goal: string, name: string) => Promise<void>;
  resetGame: () => void;
}

const initialState: GameState = {
  id: null,
  parameters: {
    career: 0,
    relations: 0,
    health: 0,
    money: 0,
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
}));
