'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '~/store/gameStore';
import NextPhaseArrow from './NextPhaseArrow';
import TurnInitView from './TurnInitView';
import AvatarsContainer from './avatars/AvatarsContainer';
import LifeBar from './ui/LifeBar';
import VerticalProgressBars from './ui/progress/progress-bars';
import './GameplayView.css';

function StatBar({
  label,
  value,
  max = 100,
  icon,
  color,
}: {
  label: string;
  value: number;
  max?: number;
  icon: string;
  color: string;
}) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className='group relative overflow-hidden rounded-xl border border-purple-700/50 bg-purple-900/30 p-4 backdrop-blur-sm transition-all duration-300 hover:border-purple-500 hover:bg-purple-800/40'>
      <div className='mb-2 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <span className='text-2xl transition-transform duration-300 group-hover:scale-110'>
            {icon}
          </span>
          <span className='font-semibold text-gray-200 text-sm uppercase tracking-wide'>
            {label}
          </span>
        </div>
        <span className='font-bold text-lg text-white'>{value}</span>
      </div>
      <div className='relative h-3 overflow-hidden rounded-full bg-gray-800'>
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
          style={{ width: `${percentage}%` }}
        />
        <div
          className={`absolute inset-0 ${color} opacity-50 blur-sm`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function PlayerInfo({
  name,
  age,
  gender,
  goal,
}: {
  name: string;
  age: number;
  gender: string;
  goal: string;
}) {
  const genderIcon = gender === 'male' ? '👨' : '👩';

  return (
    <div className='relative overflow-hidden rounded-2xl border border-purple-700/50 bg-gradient-to-br from-purple-900/50 to-indigo-900/50 p-6 backdrop-blur-sm'>
      <div className='absolute top-0 right-0 text-[120px] opacity-5'>
        {genderIcon}
      </div>

      <div className='relative z-10'>
        <div className='mb-4 flex items-center gap-3'>
          <div className='text-4xl'>{genderIcon}</div>
          <div>
            <h2 className='font-bold text-2xl text-white'>{name}</h2>
            <p className='text-purple-300 text-sm'>Wiek: {age} lat</p>
          </div>
        </div>

        <div className='mt-4 rounded-lg border border-purple-600/30 bg-purple-950/40 p-3'>
          <p className='mb-1 font-semibold text-purple-300 text-xs uppercase tracking-wide'>
            Twój cel:
          </p>
          <p className='text-white'>{goal}</p>
        </div>
      </div>
    </div>
  );
}

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
