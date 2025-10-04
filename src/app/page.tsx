'use client';

import { useEffect, useState } from 'react';
import { LandingPage } from '~/components/LandingPage';

type GamePhase = 'landing' | 'onboarding' | 'gameplay';

export default function HomePage() {
  const [gamePhase, setGamePhase] = useState<GamePhase>('landing');

  useEffect(() => {
    setGamePhase('landing');
  }, []);

  const handleStartGame = () => {
    setGamePhase('onboarding');
  };

  return (
    <>
      {gamePhase === 'landing' && <LandingPage onStart={handleStartGame} />}
      {gamePhase === 'onboarding' && <div>Onboarding phase (TODO)</div>}
      {gamePhase === 'gameplay' && <div>Gameplay phase (TODO)</div>}
    </>
  );
}
