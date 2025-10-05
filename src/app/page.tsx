'use client';

import { useEffect } from 'react';
import { GameplayView } from '~/components/GameplayView';
import { LandingPage } from '~/components/LandingPage';
import { OnboardingView } from '~/components/OnboardingView';
import { useGameStore } from '~/store/gameStore';

export default function HomePage() {
  const gameState = useGameStore();

  const handleStartGame = () => {
    gameState.setGamePhase('onboarding');
  };

  const handleOnboardingComplete = () => {
    gameState.setGamePhase('gameplay');
  };

  return (
    <div className='select-none'>
      {gameState.gamePhase === 'landing' && (
        <LandingPage onStart={handleStartGame} />
      )}
      {gameState.gamePhase === 'onboarding' && (
        <OnboardingView onComplete={handleOnboardingComplete} />
      )}
      {gameState.gamePhase === 'gameplay' && <GameplayView />}
      {gameState.gamePhase === 'gameover' && <div>Game Over</div>}
    </div>
  );
}
