'use client';

import { useEffect, useState } from 'react';
import { Card } from '~/components/ui/card';
import { useGameStore } from '~/store/gameStore';

export interface GameAction {
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

export function ActionDecisionView({
  actions,
  title,
  onActionSelected,
  allowSkip = false,
}: {
  actions: GameAction[];
  title: string;
  onActionSelected: (action: GameAction | null) => void;
  allowSkip?: boolean;
}) {
  const gameStore = useGameStore();
  const [selectedAction, setSelectedAction] = useState<GameAction | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isShatteringView, setIsShatteringView] = useState(false);
  const [cardsExpanded, setCardsExpanded] = useState(false);

  useEffect(() => {
    gameStore.resetParameterModificationsToCurrent();
  }, [gameStore.resetParameterModificationsToCurrent]);

  useEffect(() => {
    gameStore.updateRemainingTime(
      selectedAction ? selectedAction.time_cost : 0,
    );
  }, [selectedAction, gameStore.updateRemainingTime]);

  useEffect(() => {
    const deltas = selectedAction
      ? selectedAction.parameter_change
      : { career: 0, relations: 0, health: 0, money: 0 };
    gameStore.tempSetParameterModifications(deltas);
  }, [selectedAction, gameStore.tempSetParameterModifications]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCardsExpanded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleConfirm = () => {
    if (!selectedAction) return;

    gameStore.updateCommittedUsedTime(selectedAction.time_cost);
    gameStore.updateRemainingTime(0);
    const actionToConfirm = selectedAction;
    setSelectedAction(null);

    setIsConfirming(true);
    setIsShatteringView(true);

    setTimeout(() => {
      onActionSelected(actionToConfirm);
    }, 100);
  };

  const handleSkip = () => {
    gameStore.updateRemainingTime(0);

    setIsConfirming(true);
    setIsShatteringView(true);

    setTimeout(() => {
      onActionSelected(null);
    }, 500);
  };

  return (
    <div className='relative z-10 mx-auto max-w-7xl'>
      {/* Header */}
      <div className='fade-in mb-8 animate-in text-center duration-700'>
        <h2 className='mb-4 bg-gradient-to-r from-emerald-200 via-cyan-200 to-emerald-200 bg-clip-text font-bold text-5xl text-transparent'>
          {title}
        </h2>
        <div className='flex items-center justify-center gap-4'>
          <div className='flex items-center gap-2 rounded-full border-2 border-emerald-500 bg-teal-900/40 px-6 py-3 backdrop-blur-sm'>
            <span className='text-2xl'>⏱️</span>
            <span className='font-bold text-white text-xl'>
              {gameStore.remainingTime} godz. pozostało
            </span>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className='flex flex-wrap justify-center gap-6'>
        {actions.map((action, idx) => {
          const isSelected = selectedAction?.name === action.name;
          const canAfford = gameStore.remainingTime >= action.time_cost;
          const centerIndex = Math.floor(actions.length / 2);
          const offsetFromCenter = idx - centerIndex;

          return (
            <div
              key={action.name}
              className={`transition-all duration-700 ease-out ${
                isShatteringView && !isSelected
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
            className='group relative overflow-hidden rounded-2xl border-2 border-teal-600 bg-transparent px-8 py-4 font-bold text-lg text-teal-300 shadow-[0_0_30px_rgba(20,184,166,0.3)] transition-all duration-300 hover:scale-105 hover:bg-teal-600/20'
          >
            Pomiń ⏭️
          </button>
        )}

        {selectedAction && !isConfirming && (
          <button
            type='button'
            onClick={handleConfirm}
            className='group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-12 py-4 font-bold text-2xl text-white shadow-[0_0_50px_rgba(16,185,129,0.6)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_80px_rgba(16,185,129,0.8)]'
          >
            <div className='absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
            <span className='relative z-10'>Potwierdzam wybór! 🎯</span>
          </button>
        )}
      </div>
    </div>
  );
}
