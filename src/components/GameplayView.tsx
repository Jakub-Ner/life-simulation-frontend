'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '~/store/gameStore';
import AvatarsContainer from './avatars/AvatarsContainer';
import LifeBar from './ui/LifeBar';
import VerticalProgressBars from './ui/progress/progress-bars';
import TurnInitView from './TurnInitView';
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

function NextPhaseArrow({ onClick }: { onClick: () => void }) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='group fixed bottom-5 left-70 z-50 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-600 shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_60px_rgba(168,85,247,0.8)] active:scale-95'
    >
      <div className='absolute inset-0 animate-ping rounded-full bg-purple-400 opacity-20' />
      <svg
        className='relative z-10 h-10 w-10 text-white transition-transform duration-300 group-hover:translate-x-1'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        role='img'
        aria-label='arrow-title'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={3}
          d='M13 7l5 5m0 0l-5 5m5-5H6'
        />
      </svg>
      <div className='-inset-2 absolute animate-pulse rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30' />
    </button>
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
