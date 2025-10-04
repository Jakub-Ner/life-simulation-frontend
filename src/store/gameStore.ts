import { create } from 'zustand';

interface GameParameters {
  career: number;
  relations: number;
  health: number;
  money: number;
}

interface GameState {
  id: string | null;
  parameters: GameParameters;
  history: unknown[];
  turn_description: string;
  current_stage: number;
  game_turn: number;
  gender: string;
  name: string;
  goal: string;
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
  history: [],
  turn_description: '',
  current_stage: 0,
  game_turn: 0,
  gender: '',
  name: '',
  goal: '',
  age: 0,
  isLoading: false,
  error: null,
};

export const useGameStore = create<GameStore>((set) => ({
  ...initialState,

  createNewGame: async (gender: string, goal: string, name: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch('http://your-backend-url/create-new-game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_X_API_KEY}`,
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
        history: data.history,
        turn_description: data.turn_description,
        current_stage: data.current_stage,
        game_turn: data.game_turn,
        gender: data.gender,
        name: data.name,
        goal: data.goal,
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
