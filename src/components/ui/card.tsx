'use client';
import React, { useState, useEffect } from 'react';

export interface CardProps {
  requiredTime: number;
  imageUrl: string;
  description: string;
  parameterChanges?: {
    career: number;
    relations: number;
    health: number;
    money: number;
  };
  onClick?: () => void;
  isSelected?: boolean;
  isDisabled?: boolean;
  disabledReason?: string;
  autoFlip?: boolean;
  showTimeBadge?: boolean;
}

const customStyles = `
  .card-container {
    perspective: 800px;
  }
  .card {
    transform-style: preserve-3d;
    transition: transform 0.75s, box-shadow 0.3s ease-in-out;
    position: relative;
  }
  .card-face {
    backface-visibility: hidden;
  }
  .card-back {
    transform: rotateY(180deg);
  }
  .flipped {
    transform: rotateY(180deg);
  }
  .glowing {
    box-shadow: 0 0 15px 5px rgba(16, 185, 129, 0.7),
                0 0 30px 10px rgba(16, 185, 129, 0.5);
  }
  .selected {
    box-shadow: 0 0 50px rgba(16, 185, 129, 0.6);
  }
`;

const TimeBadge = ({ requiredTime }: { requiredTime: number }) => (
  <div className='absolute top-2 right-2 z-20 rounded-full bg-teal-600 px-3 py-1 font-bold text-white text-xs shadow-lg'>
    ⏱️ {requiredTime}h
  </div>
);

const cardBackImage = '/card-reverse.png';
const animationDelay = 900; // milliseconds

const getParameterColor = (value: number) => {
  if (value > 0) return 'text-green-400';
  if (value < 0) return 'text-red-400';
  return 'text-gray-400';
};

const getParameterIcon = (value: number) => {
  if (value > 0) return '↑';
  if (value < 0) return '↓';
  return '•';
};

export const Card = ({
  requiredTime,
  imageUrl,
  description,
  parameterChanges,
  onClick,
  isSelected = false,
  isDisabled = false,
  disabledReason,
  showTimeBadge = true,
}: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // Start unflipped and flip after delay
    setIsFlipped(false);
    const timer = setTimeout(() => {
      setIsFlipped(true);
    }, animationDelay);
    return () => clearTimeout(timer);
  }, []); // Only run on mount

  const handleCardClick = () => {
    if (!isDisabled && onClick) {
      onClick();
    }
  };

// border: #146a4c
// background: #eddbb9
// accents: #084b53

  return (
    <>
      <style>{customStyles}</style>
      <div className='card-container flex select-none items-center justify-center'>
        <div
          className={`card relative h-[398px] w-[232px] cursor-pointer rounded-xl shadow-2xl transition-all duration-500 ${
            isFlipped ? 'flipped' : ''
          } ${isSelected ? 'selected scale-105' : ''} ${
            isDisabled ? 'opacity-50' : 'hover:scale-105'
          }`}
          onClick={handleCardClick}
        >
          {/* Back Side of the Card */}
          <div
            className='card-face absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl bg-gray-900'
            style={{
              backgroundImage: `url(${cardBackImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Front Side of the Card */}
          <div 
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
            className='card-face card-back absolute inset-0 flex flex-col-reverse items-center overflow-hidden rounded-xl border-2 border-teal-700/50 shadow-inner backdrop-blur-sm'>
            {showTimeBadge && <TimeBadge requiredTime={requiredTime} />}  

            {/* Description */}
            <div className='mt-3 flex-col w-full p-2 gap-4 bg-black/20 backdrop-blur-sm'>
              <p className='line-clamp-3 text-center font-bold text-gray-100 text-s leading-tight mb-2'>
                {description}
              </p>
                {parameterChanges && (
              <div className='grid w-full grid-cols-2 gap-1'>
                {Object.entries(parameterChanges).map(([key, value]) => (
                  <div
                    key={key}
                    className='flex items-center justify-center gap-1 rounded-lg bg-black/40 px-2 py-1'
                  >
                    <span className='text-xs'>
                      {key === 'career' && '💼'}
                      {key === 'relations' && '❤️'}
                      {key === 'health' && '🏥'}
                      {key === 'money' && '💰'}
                    </span>
                    <span
                      className={`font-bold text-xs ${getParameterColor(value)}`}
                    >
                      {getParameterIcon(value)} {Math.abs(value)}
                    </span>
                  </div>
                ))}
              </div>
            )}
            </div>

            {/* Parameter changes */}


            {/* Selection indicator */}
            {isSelected && (
              <div className='zoom-in -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 flex h-16 w-16 animate-in items-center justify-center rounded-full bg-emerald-500 text-4xl shadow-[0_0_30px_rgba(16,185,129,0.8)]'>
                ✓
              </div>
            )}

            {/* Disabled overlay */}
            {isDisabled && (
              <div className='absolute inset-0 flex items-center justify-center rounded-xl bg-black/70 backdrop-blur-sm'>
                <span className='text-center font-bold text-red-400 text-sm'>
                  {disabledReason || 'Niedostępne'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
