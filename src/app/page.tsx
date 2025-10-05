'use client';

import { useEffect } from 'react';
import { GameplayView } from '~/components/GameplayView';
import { LandingPage } from '~/components/LandingPage';
import { OnboardingView } from '~/components/OnboardingView';
import GameOverView from '~/components/GameOverView';
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
      {gameState.gamePhase === 'gameover' && (
        <GameOverView
          stats={gameState.parameters}
          summary={gameState.stage_summary || 'Twoja historia dobiegła końca. Dziękujemy za grę!'}
          onPlayAgain={gameState.resetGame}
        />
      )}
    </div>
  );
}
