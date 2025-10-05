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
  description: string;
  image_url: string;
  parameter_change: ParameterChange;
  result: string;
  id: string;
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
    random_event_reaction: RandomEventReaction | null;
  };
  gamePhase: 'landing' | 'onboarding' | 'gameplay' | 'gameover';
  availableTime: number;
  remainingTime: number;
  committedUsedTime: number;
}

interface GameStore extends GameState {
  createNewGame: (gender: string, goal: string, name: string) => Promise<void>;
  nextTurn: (reaction_id: string) => Promise<void>;
  resetGame: () => void;
  updateTurnChoices: (choices: typeof initialState.turnChoices) => void;
  addBigAction: (action: GameAction) => void;
  addSmallAction: (action: GameAction) => void;
  setRandomEventReaction: (reaction: RandomEventReaction) => void;
  tempSetParameterModifications: (deltas: GameParameters) => void;
  applyChangesToParams: () => void;
  resetParameterModificationsToCurrent: () => void;
  setGamePhase: (phase: GameState['gamePhase']) => void;
  setTurnTime: (availableTime: number) => void;
  updateRemainingTime: (usedTime: number) => void;
  updateCommittedUsedTime: (delta: number) => void;
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
    random_event_reaction: null,
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
  availableTime: 10,
  remainingTime: 10,
  committedUsedTime: 0,
};

export const useGameStore = create<GameStore>((set, get) => ({
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
        committedUsedTime: 0,
      });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  },

  nextTurn: async (reaction_id: string) => {
    set({ isLoading: true, error: null });

    try {
      const currentState = get();
      const response = await fetch('/api/next-turn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chosen_action_references: [
            ...currentState.turnChoices.big_actions.map((a) => a.name),
            ...currentState.turnChoices.small_actions.map((a) => a.name),
            reaction_id,
          ],
          state_id: currentState.id,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to proceed to next turn: ${response.statusText}`,
        );
      }

      const data = await response.json();

      set({
        ...data,
        parameterModifications: data.parameters,
        isLoading: false,
        error: null,
        remainingTime: 10,
        availableTime: 10,
        committedUsedTime: 0,
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

  addBigAction: (action) =>
    set((state) => ({
      turnChoices: {
        ...state.turnChoices,
        big_actions: [...state.turnChoices.big_actions, action],
      },
    })),

  addSmallAction: (action) =>
    set((state) => ({
      turnChoices: {
        ...state.turnChoices,
        small_actions: [...state.turnChoices.small_actions, action],
      },
    })),

  setRandomEventReaction: (reaction) =>
    set((state) => ({
      turnChoices: {
        ...state.turnChoices,
        random_event_reaction: reaction,
      },
    })),

  tempSetParameterModifications: (deltas) =>
    set((state) => ({
      parameterModifications: {
        career: Math.min(
          100,
          Math.max(0, state.parameters.career + deltas.career),
        ),
        relations: Math.min(
          100,
          Math.max(0, state.parameters.relations + deltas.relations),
        ),
        health: Math.min(
          100,
          Math.max(0, state.parameters.health + deltas.health),
        ),
        money: Math.min(
          100,
          Math.max(0, state.parameters.money + deltas.money),
        ),
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

  setTurnTime: (availableTime) =>
    set({ availableTime, remainingTime: availableTime }),

  updateRemainingTime: (usedTime) =>
    set((state) => ({
      remainingTime: state.availableTime - state.committedUsedTime - usedTime,
    })),

  updateCommittedUsedTime: (delta) =>
    set((state) => ({ committedUsedTime: state.committedUsedTime + delta })),
}));
