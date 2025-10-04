'use client';
import React, { useState, useEffect } from 'react';

export interface CardProps {
  requiredTime: number; // Time in milliseconds for the animation delay
  imageUrl: string; // Image URL for the front of the card
  description: string; // Text description for the front of the card
}

const customStyles = `
  .card-container {
    perspective: 800px;
  }
  .card {
    transform-style: preserve-3d;
    transition: transform 0.75s, box-shadow 0.3s ease-in-out; /* Added box-shadow to transition */
    position: relative; /* Needed for pseudo-element or absolute glow */
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
    box-shadow: 0 0 15px 5px rgba(139, 92, 246, 0.7), /* Purple glow */
                0 0 30px 10px rgba(139, 92, 246, 0.5);
  }
`;

const TimeBadge = ({ requiredTime }: { requiredTime: number }) => (
  <div className='absolute top-2 right-2 rounded-full bg-indigo-600 px-2 py-1 font-bold text-white text-xs shadow-lg'>
    {requiredTime} godz.
  </div>
);

const cardBackImage = 'https://picsum.photos/210/332?random=1';

export const Card = ({ requiredTime, imageUrl, description }: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false); // New state for glow

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFlipped(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = () => {
    setIsGlowing(!isGlowing); // Toggle glow on click
  };

  return (
    <>
      <style>{customStyles}</style>
      <div className='card-container flex select-none items-center justify-center p-8'>
        <div
          className={`card relative h-[332px] w-[210px] cursor-pointer rounded-xl shadow-2xl ${isFlipped ? 'flipped' : ''} ${isGlowing ? 'glowing' : ''}`}
          onClick={handleCardClick} // Add onClick handler
        >
          {/* Back Side of the Card */}
          <div
            className='card-face absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl bg-gray-900'
            style={{
              backgroundImage: `url(${cardBackImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className='absolute inset-0 bg-black/60'></div>
            <span className='relative z-10 p-4 text-center font-extrabold text-3xl text-white'>
              The Mystery Card
            </span>
          </div>

          {/* Front Side of the Card */}
          <div className='card-face card-back absolute inset-0 flex flex-col items-center rounded-xl bg-gray-500 p-4 shadow-inner'>
            <TimeBadge requiredTime={requiredTime} />
            <div className='flex h-3/5 w-full items-center justify-center overflow-hidden rounded-lg border-2 border-gray-100'>
              <img
                src={imageUrl}
                alt='Card Visual'
                className='h-full w-full object-cover'
              />
            </div>
            <div className='mt-4 flex flex-grow flex-col justify-center text-center'>
              <p className='mt-1 max-h-20 overflow-hidden text-gray-100 text-sm'>
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
