'use client';

import { useEffect, useState } from 'react';
import { GameplayView } from '~/components/GameplayView';
import { LandingPage } from '~/components/LandingPage';
import { OnboardingView } from '~/components/OnboardingView';

type GamePhase = 'landing' | 'onboarding' | 'gameplay';

export default function HomePage() {
  const [gamePhase, setGamePhase] = useState<GamePhase>('landing');

  useEffect(() => {
    setGamePhase('landing');
  }, []);

  const handleStartGame = () => {
    setGamePhase('onboarding');
  };

  const handleOnboardingComplete = () => {
    setGamePhase('gameplay');
  };

  return (
    <>
      {gamePhase === 'landing' && <LandingPage onStart={handleStartGame} />}
      {gamePhase === 'onboarding' && (
        <OnboardingView onComplete={handleOnboardingComplete} />
      )}
      {gamePhase === 'gameplay' && <GameplayView />}
    </>
  );
}
