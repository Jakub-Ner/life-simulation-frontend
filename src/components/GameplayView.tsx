'use client';

import { useState } from 'react';
import TurnInitView from './TurnInitView';
import AvatarsContainer from './avatars/AvatarsContainer';
import VerticalProgressBars from './ui/progress/progress-bars';
import './GameplayView.css';
import { useGameStore } from '~/store/gameStore';
import { ActionDecisionView, type GameAction } from './ActionDecisionView';
import { ActionMultipleDecisionView } from './ActionMultipleDecisionView';
import { type RandomEventReaction, RandomEventView } from './RandomEventView';
import SegmentLifeBar from './ui/SegmentLifeBar';

export function GameplayView() {
  const gameState = useGameStore();
  const [stagePhase, setStagePhase] = useState<
    | 'turn-init'
    | 'big-action-decision'
    | 'small-actions-decision'
    | 'random-event'
  >('turn-init');

  // --- Aesthetic Components ---
  const BackgroundAesthetics = (
    // Set to -z-10 to be behind everything else
    <div className='-z-10 absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-950 to-cyan-950'>
      {/* Animated background particles from OnboardingView */}
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className='absolute h-2 w-2 animate-pulse rounded-full bg-teal-500/30'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );

  // --- Error View (Aesthetic Maintained) ---
  if (gameState.error) {
    return (
      <div className='relative flex min-h-screen items-center justify-center'>
        {BackgroundAesthetics}
        <div className='relative z-10 max-w-md rounded-2xl border-2 border-red-500/50 bg-red-900/40 p-10 text-center shadow-[0_0_30px_rgba(220,38,38,0.4)]'>
          <div className='mb-6 animate-pulse text-7xl'>🚨</div>
          <h2 className='mb-3 font-bold text-3xl text-red-200'>
            Wystąpił krytyczny błąd
          </h2>
          <p className='font-mono text-red-300 text-sm leading-relaxed'>
            {gameState.error}
          </p>
          <p className='mt-4 text-red-400 text-sm'>
            Spróbuj odświeżyć stronę lub skontaktować się z pomocą.
          </p>
        </div>
      </div>
    );
  }
  // --- End Error View ---

  const handleNextPhase = () => {
    if (stagePhase === 'turn-init') {
      setStagePhase('big-action-decision');
    } else if (stagePhase === 'big-action-decision') {
      setStagePhase('small-actions-decision');
    } else if (stagePhase === 'small-actions-decision') {
      setStagePhase('random-event');
    }
  };

  const handleBigActionSelected = (action: GameAction | null) => {
    if (action) {
      gameState.addBigAction(action);
      gameState.applyChangesToParams();
    }
    setTimeout(() => {
      setStagePhase('small-actions-decision');
    }, 100);
  };

  const handleSmallActionsConfirmed = (actions: GameAction[]) => {
    for (const action of actions) {
      gameState.addSmallAction(action);
    }
    gameState.applyChangesToParams();

    // Wait for shatter animation to complete before transitioning
    setTimeout(() => {
      setStagePhase('random-event');
    }, 1100); // Wait for shatter animation (1000ms) + buffer
  };

  const handleRandomEventReactionSelected = async (
    reaction: RandomEventReaction,
  ) => {
    // TODO: Send reaction to backend and proceed to next turn
    console.log('Selected reaction:', reaction);
    gameState.setRandomEventReaction(reaction);
    gameState.applyChangesToParams();
    gameState.nextTurn(reaction.id);

    setTimeout(() => {
      setStagePhase('turn-init');
    }, 1100);
  };

  return (
    // Removed 'flex' from outer container for cleaner layering of absolute elements
    <div className='relative min-h-screen overflow-hidden'>
      {/* 1. Background Layer: Behind everything (-z-10) */}
      {BackgroundAesthetics}

      {/* 2. HUD Layer: On top of everything (z-30) */}
      <div className='pointer-events-none absolute inset-0 z-30'>
        {/* Components must use 'pointer-events-auto' internally if they need interaction */}
        <AvatarsContainer />
        <SegmentLifeBar />
        <VerticalProgressBars />
      </div>

      {/* 3. Main Phase Content Layer: Intermediate layer (z-20) */}
      <div
        className='relative z-20 flex w-full items-center justify-center p-4'
        style={{ marginTop: '10vh' }}
      >
        <div key={stagePhase}>
          {stagePhase === 'turn-init' && (
            <TurnInitView
              description={gameState.turn_description}
              age={gameState.age}
              stage={gameState.current_stage}
              onNextAction={handleNextPhase}
            />
          )}
          {stagePhase === 'big-action-decision' && (
            <ActionDecisionView
              actions={gameState.big_actions}
              title='Wybierz swoją wielką decyzję'
              onActionSelected={handleBigActionSelected}
              allowSkip={false}
            />
          )}
          {stagePhase === 'small-actions-decision' && (
            <ActionMultipleDecisionView
              actions={gameState.small_actions}
              title='Wybierz małe akcje'
              onActionsConfirmed={handleSmallActionsConfirmed}
              allowSkip={false}
            />
          )}
          {stagePhase === 'random-event' && gameState.random_event && (
            <RandomEventView
              event={gameState.random_event}
              onReactionSelected={handleRandomEventReactionSelected}
            />
          )}
        </div>
      </div>
    </div>
  );
}
