'use client';

import { useEffect, useState } from 'react';
import { Card } from '~/components/ui/card';

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

export function ActionMultipleDecisionView({
  actions,
  availableTime,
  title,
  onActionsConfirmed,
  allowSkip = false,
}: {
  actions: GameAction[];
  availableTime: number;
  title: string;
  onActionsConfirmed: (actions: GameAction[]) => void;
  allowSkip?: boolean;
}) {
  const [selectedActions, setSelectedActions] = useState<GameAction[]>([]);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isShatteringView, setIsShatteringView] = useState(false);
  const [cardsExpanded, setCardsExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCardsExpanded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const totalTimeUsed = selectedActions.reduce(
    (sum, action) => sum + action.time_cost,
    0,
  );
  const remainingTime = availableTime - totalTimeUsed;

  const handleCardClick = (action: GameAction) => {
    if (isConfirming) return;

    const isAlreadySelected = selectedActions.some(
      (a) => a.name === action.name,
    );

    if (isAlreadySelected) {
      // Deselect
      setSelectedActions(selectedActions.filter((a) => a.name !== action.name));
    } else {
      // Check if user can afford this action
      if (remainingTime >= action.time_cost) {
        setSelectedActions([...selectedActions, action]);
      }
    }
  };

  const handleConfirm = () => {
    setIsConfirming(true);
    setIsShatteringView(true);

    setTimeout(() => {
      onActionsConfirmed(selectedActions);
    }, 100);
  };

  const handleSkip = () => {
    setIsConfirming(true);
    setIsShatteringView(true);

    setTimeout(() => {
      onActionsConfirmed([]);
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
                {remainingTime} godz. pozostało
              </span>
            </div>
            {selectedActions.length > 0 && (
              <div className='flex items-center gap-2 rounded-full border-2 border-green-500 bg-green-900/40 px-6 py-3 backdrop-blur-sm'>
                <span className='text-2xl'>✓</span>
                <span className='font-bold text-white text-xl'>
                  {selectedActions.length} wybrane
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Cards */}
        <div className='flex flex-wrap justify-center gap-6'>
          {actions.map((action, idx) => {
            const isSelected = selectedActions.some(
              (a) => a.name === action.name,
            );
            const canAfford = remainingTime >= action.time_cost;
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
                  onClick={() => handleCardClick(action)}
                  isSelected={isSelected}
                  isDisabled={!canAfford && !isSelected}
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

          {!isConfirming && (
            <button
              type='button'
              onClick={handleConfirm}
              disabled={selectedActions.length === 0}
              className='group relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 px-12 py-4 font-bold text-2xl text-white shadow-[0_0_50px_rgba(168,85,247,0.6)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_80px_rgba(168,85,247,0.8)] disabled:opacity-50 disabled:hover:scale-100'
            >
              <div className='absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              <span className='relative z-10'>
                {selectedActions.length === 0
                  ? 'Wybierz akcje'
                  : `Potwierdzam (${selectedActions.length}) 🎯`}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
