'use client';

import { useEffect, useState } from 'react';
import { Card } from '~/components/ui/card';
import { useGameStore } from '~/store/gameStore';

export interface RandomEventReaction {
  id: string;
  description: string;
  image_url: string;
  parameter_change: {
    career: number;
    relations: number;
    health: number;
    money: number;
  };
  result: string;
}

export interface RandomEvent {
  name: string;
  description: string;
  reactions: RandomEventReaction[];
}

export function RandomEventView({
  event,
  onReactionSelected,
}: {
  event: RandomEvent;
  onReactionSelected: (reaction: RandomEventReaction) => void;
}) {
  const gameStore = useGameStore();
  const [selectedReaction, setSelectedReaction] =
    useState<RandomEventReaction | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isShatteringView, setIsShatteringView] = useState(false);
  const [cardsExpanded, setCardsExpanded] = useState(false);

  useEffect(() => {
    gameStore.resetParameterModificationsToCurrent();
  }, [gameStore.resetParameterModificationsToCurrent]);

  useEffect(() => {
    const deltas = selectedReaction
      ? selectedReaction.parameter_change
      : { career: 0, relations: 0, health: 0, money: 0 };
    gameStore.tempSetParameterModifications(deltas);
  }, [selectedReaction, gameStore.tempSetParameterModifications]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCardsExpanded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleConfirm = () => {
    if (!selectedReaction) return;

    setIsConfirming(true);
    setIsShatteringView(true);

    setTimeout(() => {
      onReactionSelected(selectedReaction);
    }, 100);
  };

  return (
    <div className='relative z-10 mx-auto max-w-7xl'>
      {/* Event Header */}
      <div className='fade-in mb-12 animate-in text-center duration-700'>
        <h2 className='mb-6 bg-gradient-to-r from-emerald-200 via-cyan-200 to-emerald-200 bg-clip-text font-bold text-4xl text-transparent'>
          {event.name}
        </h2>
        <p className='mx-auto max-w-2xl text-gray-300 text-xl leading-relaxed'>
          {event.description}
        </p>
      </div>

      {/* Reaction Cards */}
      <div className='flex flex-wrap justify-center gap-6'>
        {event.reactions.map((reaction, idx) => {
          const isSelected =
            selectedReaction?.description === reaction.description;
          const centerIndex = Math.floor(event.reactions.length / 2);
          const offsetFromCenter = idx - centerIndex;

          return (
            <div
              key={reaction.description}
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
                key={`${reaction.description}-${idx}`}
                requiredTime={0}
                imageUrl={reaction.image_url}
                description={reaction.description}
                parameterChanges={reaction.parameter_change}
                onClick={() => !isConfirming && setSelectedReaction(reaction)}
                isSelected={isSelected}
                isDisabled={isConfirming}
              />
            </div>
          );
        })}
      </div>

      {/* Confirm button */}
      {selectedReaction && !isConfirming && (
        <div className='zoom-in -translate-x-1/2 fixed bottom-8 left-1/2 flex animate-in flex-col items-center gap-4'>
          <button
            type='button'
            onClick={handleConfirm}
            className='group relative overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-600 to-orange-600 px-12 py-4 font-bold text-2xl text-white shadow-[0_0_50px_rgba(251,191,36,0.6)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_80px_rgba(251,191,36,0.8)]'
          >
            <div className='absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
            <span className='relative z-10'>Potwierdzam wybór!</span>
          </button>
        </div>
      )}
    </div>
  );
}
