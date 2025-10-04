'use client';

import { useEffect, useState } from 'react';
import NextPhaseArrow from './NextPhaseArrow';
import TurnInitView from './TurnInitView';
import AvatarsContainer from './avatars/AvatarsContainer';
import LifeBar from './ui/LifeBar';
import VerticalProgressBars from './ui/progress/progress-bars';
import { ActionDecisionView } from './ActionDecisionView';
import './GameplayView.css';
import { useGameStore } from '~/store/gameStore';
import type { GameAction } from './ActionDecisionView';

export function GameplayView() {
  const gameState = useGameStore();
  const [stagePhase, setStagePhase] = useState<
    | 'turn-init'
    | 'big-action-decision'
    | 'small-actions-decision'
    | 'random-event'
  >('turn-init');
  const [availableTime, setAvailableTime] = useState(10);
  const [viewKey, setViewKey] = useState(0); // Add key to force remount

  if (gameState.isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950'>
        <div className='text-center'>
          <div className='mb-4 animate-pulse text-6xl'>⏳</div>
          <p className='font-semibold text-2xl text-white'>Ładowanie gry...</p>
        </div>
      </div>
    );
  }

  if (gameState.error) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950'>
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
      setAvailableTime((prev) => prev - action.time_cost);
      gameState.updateTurnChoices({
        big_actions: [...gameState.turnChoices.big_actions, action],
        small_actions: gameState.turnChoices.small_actions
      });
    }
    setTimeout(() => {
      setStagePhase('small-actions-decision');
    }, 100);
  };

  const handleSmallActionSelected = (action: GameAction | null) => {
    let newAvailableTime = availableTime;

    if (action) {
      newAvailableTime = availableTime - action.time_cost;
      setAvailableTime(newAvailableTime);
      gameState.updateTurnChoices({
        big_actions: gameState.turnChoices.big_actions,
        small_actions: [...gameState.turnChoices.small_actions, action]
      });
    }

    // Wait for shatter animation to complete before transitioning
    setTimeout(() => {
      if (newAvailableTime > 0 && action !== null) {
        // User selected an action and has time left
        // Increment viewKey to force complete remount
        setViewKey((prev) => prev + 1);
      } else {
        // User skipped or no time left - move to next phase
        setStagePhase('random-event');
      }
    }, 1100); // Wait for shatter animation (1000ms) + buffer
  };

  return (
    <div className='relative flex min-h-screen overflow-hidden'>
      <AvatarsContainer />
      <LifeBar />
      <VerticalProgressBars />
      <NextPhaseArrow onClick={handleNextPhase} />
      <div className='phase-content-container flex w-full items-center justify-center'>
        {stagePhase === 'turn-init' && (
          <TurnInitView
            description={gameState.turn_description}
            age={gameState.age}
            stage={gameState.current_stage}
          />
        )}
        {stagePhase === 'big-action-decision' && (
          <ActionDecisionView
            actions={gameState.big_actions}
            availableTime={availableTime}
            title='Wybierz swoją wielką decyzję'
            onActionSelected={handleBigActionSelected}
            allowSkip={false}
          />
        )}
        {stagePhase === 'small-actions-decision' && (
          <ActionDecisionView
            key={viewKey} // Force remount with new key
            actions={gameState.small_actions}
            availableTime={availableTime}
            title='Wybierz małe akcje'
            onActionSelected={handleSmallActionSelected}
            allowSkip={false}
          />
        )}
      </div>
    </div>
  );
}
