'use client';

import { useState } from 'react';
import NextPhaseArrow from './NextPhaseArrow';
import TurnInitView from './TurnInitView';
import AvatarsContainer from './avatars/AvatarsContainer';
import LifeBar from './ui/LifeBar';
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

  if (gameState.error) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-950 via-teal-950 to-cyan-950'>
        <div className='max-w-md rounded-2xl border border-red-500/50 bg-red-900/30 p-8 text-center'>
          <div className='mb-4 text-6xl'>❌</div>
          <h2 className='mb-2 font-bold text-2xl text-white'>Wystąpił błąd</h2>
          <p className='text-red-200'>{gameState.error}</p>
        </div>
      </div>
    );
  }

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
    <div className='relative flex min-h-screen overflow-hidden'>
      <AvatarsContainer />
      <SegmentLifeBar />
      <VerticalProgressBars />
      <div className='phase-content-container flex w-full items-center justify-center'>
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
  );
}
