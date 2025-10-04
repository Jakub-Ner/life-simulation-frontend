'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '~/store/gameStore';
import NextPhaseArrow from './NextPhaseArrow';
import TurnInitView from './TurnInitView';
import AvatarsContainer from './avatars/AvatarsContainer';
import LifeBar from './ui/LifeBar';
import VerticalProgressBars from './ui/progress/progress-bars';
import './GameplayView.css';

export function GameplayView() {
  const gameState = useGameStore();
  const [stagePhase, setStagePhase] = useState<
    | 'turn-init'
    | 'big-action-decision'
    | 'small-actions-decision'
    | 'random-event'
  >('turn-init');

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

  // main layout
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
      </div>
    </div>
  );
}
