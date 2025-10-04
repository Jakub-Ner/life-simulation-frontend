'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '~/store/gameStore';
import NextPhaseArrow from './NextPhaseArrow';
import TurnInitView from './TurnInitView';
import AvatarsContainer from './avatars/AvatarsContainer';
import LifeBar from './ui/LifeBar';
import VerticalProgressBars from './ui/progress/progress-bars';
import './GameplayView.css';
import { Card } from '~/components/ui/card';

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
      className='group fixed right-12 bottom-12 z-50 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-600 shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_60px_rgba(168,85,247,0.8)] active:scale-95'
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
  onNext,
}: {
  description: string;
  age: number;
  stage: number;
  onNext: () => void;
}) {
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTextVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 p-6'>
      {/* Animated background particles */}
      <div className='pointer-events-none fixed inset-0 overflow-hidden'>
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className='absolute animate-pulse rounded-full bg-purple-500/30'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Floating orbs */}
      <div className='pointer-events-none fixed inset-0 overflow-hidden'>
        <div className='-left-20 absolute top-20 h-64 w-64 animate-pulse rounded-full bg-purple-600/20 blur-3xl' />
        <div className='-right-20 absolute bottom-20 h-80 w-80 animate-pulse rounded-full bg-pink-600/20 blur-3xl' />
      </div>

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
          className={`slide-in-from-bottom relative overflow-hidden rounded-3xl border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/40 to-indigo-900/40 p-12 shadow-[0_0_60px_rgba(168,85,247,0.3)] backdrop-blur-md transition-all duration-1000 ${textVisible ? 'animate-in' : 'opacity-0'
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

      <NextPhaseArrow onClick={onNext} />
    </div>
  );
}
>>>>>>> a2c75c7 (working)

interface GameAction {
  name: string;
  description: string;
  image_url: string;
  parameter_change: {
    career: number;
    relations: number;
    health: number;
    money: number;
  };
  time_cost: number;
}

function BigActionDecisionView({
  actions,
  availableTime,
  onActionSelected,
}: {
  actions: GameAction[];
  availableTime: number;
  onActionSelected: (action: GameAction) => void;
}) {
  const [selectedAction, setSelectedAction] = useState<GameAction | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isShatteringView, setIsShatteringView] = useState(false);

  const handleConfirm = () => {
    if (!selectedAction) return;

    setIsConfirming(true);
    setIsShatteringView(true);

    setTimeout(() => {
      onActionSelected(selectedAction);
    }, 1000);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 p-6'>
      {/* Animated background */}
      <div className='pointer-events-none fixed inset-0 overflow-hidden'>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className='absolute h-1 w-1 animate-pulse rounded-full bg-purple-500/20'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className='relative z-10 mx-auto max-w-7xl'>
        {/* Header */}
        <div className='fade-in mb-8 animate-in text-center duration-700'>
          <h2 className='mb-4 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-clip-text font-bold text-5xl text-transparent'>
            Wybierz swoją wielką decyzję
          </h2>
          <div className='flex items-center justify-center gap-4'>
            <div className='flex items-center gap-2 rounded-full border-2 border-purple-500 bg-purple-900/40 px-6 py-3 backdrop-blur-sm'>
              <span className='text-2xl'>⏱️</span>
              <span className='font-bold text-white text-xl'>
                {availableTime} godz. pozostało
              </span>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {actions.map((action, idx) => {
            const isSelected = selectedAction?.name === action.name;
            const canAfford = availableTime >= action.time_cost;

            return (
              <div
                key={action.name}
                className={`transition-all duration-500 ${isShatteringView && !isSelected
                    ? 'animate-[fadeOut_0.5s_ease-out_forwards]'
                    : ''
                  }`}
                style={{
                  animationDelay: isShatteringView ? `${idx * 0.1}s` : '0s',
                }}
              >
                <Card
                  requiredTime={action.time_cost}
                  imageUrl={action.image_url}
                  description={action.name}
                  parameterChanges={action.parameter_change}
                  onClick={() => canAfford && !isConfirming && setSelectedAction(action)}
                  isSelected={isSelected}
                  isDisabled={!canAfford || isConfirming}
                  disabledReason={!canAfford ? 'Brak czasu!' : undefined}
                />
              </div>
            );
          })}
        </div>

        {/* Confirm button */}
        {selectedAction && !isConfirming && (
          <div className='zoom-in fixed bottom-8 left-1/2 -translate-x-1/2 animate-in'>
            <button
              type='button'
              onClick={handleConfirm}
              className='group relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 px-12 py-6 font-bold text-2xl text-white shadow-[0_0_50px_rgba(168,85,247,0.6)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_80px_rgba(168,85,247,0.8)]'
            >
              <div className='absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              <span className='relative z-10'>Potwierdzam wybór! 🎯</span>
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeOut {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
        }
      `}</style>
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
  const [availableTime, setAvailableTime] = useState(10);

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

  const handleBigActionSelected = (action: GameAction) => {
    setAvailableTime((prev) => prev - action.time_cost);
    setTimeout(() => {
      setStagePhase('small-actions-decision');
    }, 100);
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
          <BigActionDecisionView
            actions={gameState.big_actions}
            availableTime={availableTime}
            onActionSelected={handleBigActionSelected}
          />
        )}
      </div>
    </div>
  );
}
