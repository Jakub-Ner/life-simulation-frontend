'use client';

import { useEffect, useState } from 'react';
import NextPhaseArrow from './NextPhaseArrow';
import TurnInitView from './TurnInitView';
import AvatarsContainer from './avatars/AvatarsContainer';
import LifeBar from './ui/LifeBar';
import VerticalProgressBars from './ui/progress/progress-bars';
import './GameplayView.css';
import { Card } from '~/components/ui/card';
import { useGameStore } from '~/store/gameStore';

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
    <div className='group relative overflow-hidden rounded-xl border border-purple-700/50 bg-purple-900/30 p-4 backdrop-blur-sm transition-all duration-100 hover:border-purple-500 hover:bg-purple-800/40'>
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
          className={`h-full rounded-full transition-all duration-100 ease-out ${color}`}
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

function ActionDecisionView({
  actions,
  availableTime,
  title,
  onActionSelected,
  allowSkip = false,
}: {
  actions: GameAction[];
  availableTime: number;
  title: string;
  onActionSelected: (action: GameAction | null) => void;
  allowSkip?: boolean;
}) {
  const [selectedAction, setSelectedAction] = useState<GameAction | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isShatteringView, setIsShatteringView] = useState(false);
  const [cardsExpanded, setCardsExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCardsExpanded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleConfirm = () => {
    if (!selectedAction) return;

    setIsConfirming(true);
    setIsShatteringView(true);

    setTimeout(() => {
      onActionSelected(selectedAction);
    }, 100);
  };

  const handleSkip = () => {
    setIsConfirming(true);
    setIsShatteringView(true);

    setTimeout(() => {
      onActionSelected(null);
    }, 500);
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
            {title}
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
        <div className='flex flex-wrap justify-center gap-6'>
          {actions.map((action, idx) => {
            const isSelected = selectedAction?.name === action.name;
            const canAfford = availableTime >= action.time_cost;
            const centerIndex = Math.floor(actions.length / 2);
            const offsetFromCenter = idx - centerIndex;

            return (
              <div
                key={action.name}
                className={`transition-all duration-700 ease-out ${isShatteringView && !isSelected
                  ? 'animate-[fadeOut_0.5s_ease-out_forwards]'
                  : ''
                  }`}
                style={{
                  transform: cardsExpanded
                    ? 'translateX(0)'
                    : `translateX(${-offsetFromCenter * 240}px) scale(0.8)`,
                  opacity: cardsExpanded ? 1 : 0.5,
                  animationDelay: isShatteringView ? `${idx * 0.1}s` : '0s',
                  transitionDelay: cardsExpanded
                    ? `${Math.abs(offsetFromCenter) * 0.08}s`
                    : '0s',
                }}
              >
                <Card
                  key={`${action.name}-${idx}`}
                  requiredTime={action.time_cost}
                  imageUrl={action.image_url}
                  description={action.name}
                  parameterChanges={action.parameter_change}
                  onClick={() =>
                    canAfford && !isConfirming && setSelectedAction(action)
                  }
                  isSelected={isSelected}
                  isDisabled={!canAfford || isConfirming}
                  disabledReason={!canAfford ? 'Brak czasu!' : undefined}
                />
              </div>
            );
          })}
        </div>

        {/* Action buttons */}
        <div className='zoom-in -translate-x-1/2 fixed bottom-8 left-1/2 flex animate-in gap-4'>
          {allowSkip && !isConfirming && (
            <button
              type='button'
              onClick={handleSkip}
              className='group relative overflow-hidden rounded-2xl border-2 border-purple-600 bg-transparent px-8 py-4 font-bold text-lg text-purple-300 shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300 hover:scale-105 hover:bg-purple-600/20'
            >
              Pomiń ⏭️
            </button>
          )}

          {selectedAction && !isConfirming && (
            <button
              type='button'
              onClick={handleConfirm}
              className='group relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 px-12 py-4 font-bold text-2xl text-white shadow-[0_0_50px_rgba(168,85,247,0.6)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_80px_rgba(168,85,247,0.8)]'
            >
              <div className='absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              <span className='relative z-10'>Potwierdzam wybór! 🎯</span>
            </button>
          )}
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
            onNext={handleNextPhase}
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
