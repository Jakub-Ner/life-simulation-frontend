'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '~/store/gameStore';
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

function TurnInitView({
  description,
  age,
  stage,
}: {
  description: string;
  age: number;
  stage: number;
}) {
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTextVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='relative z-10 w-full max-w-4xl'>
      {/* Stage indicator */}
      <div className='fade-in mb-8 animate-in text-center duration-700'>
        <div className='mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-purple-500 bg-gradient-to-br from-purple-600/30 to-pink-600/30 shadow-[0_0_40px_rgba(168,85,247,0.4)] backdrop-blur-sm'>
          <span className='font-bold text-4xl text-white'>{stage}</span>
        </div>
        <p className='font-semibold text-purple-300 text-xl'>
          Etap {stage} • Wiek: {age} lat
        </p>
      </div>

      {/* Main content card */}
      <div
        className={`slide-in-from-bottom relative overflow-hidden rounded-3xl border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/40 to-indigo-900/40 p-12 shadow-[0_0_60px_rgba(168,85,247,0.3)] backdrop-blur-md transition-all duration-1000 ${
          textVisible ? 'animate-in' : 'opacity-0'
        }`}
      >
        {/* Decorative corner elements */}
        <div className='absolute top-0 left-0 h-32 w-32 bg-gradient-to-br from-purple-600/20 to-transparent' />
        <div className='absolute right-0 bottom-0 h-32 w-32 bg-gradient-to-tl from-pink-600/20 to-transparent' />

        {/* Animated border glow */}
        <div className='absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 opacity-50 blur-xl' />

        <div className='relative z-10'>
          <h2 className='mb-8 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-clip-text text-center font-bold text-4xl text-transparent md:text-5xl'>
            Twoja historia trwa...
          </h2>

          <div className='relative'>
            {/* Quote decoration */}
            <div className='-left-6 -top-4 absolute text-6xl text-purple-500/30'>
              "
            </div>
            <div className='-bottom-8 -right-6 absolute text-6xl text-purple-500/30'>
              "
            </div>

            <p className='text-center font-medium text-2xl text-gray-100 leading-relaxed md:text-3xl'>
              {description}
            </p>
          </div>

          {/* Decorative line */}
          <div className='mx-auto mt-12 h-1 w-32 rounded-full bg-gradient-to-r from-transparent via-purple-500 to-transparent' />

          {/* Hint text */}
          <p className='mt-8 text-center text-purple-300 text-sm'>
            Kliknij strzałkę, aby kontynuować swoją podróż →
          </p>
        </div>
      </div>

      {/* Pulsing rings around card */}
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
        <div className='h-full w-full animate-pulse rounded-3xl border-2 border-purple-400/20' />
        <div className='absolute h-[calc(100%+2rem)] w-[calc(100%+2rem)] animate-pulse rounded-3xl border-2 border-purple-400/10' />
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
