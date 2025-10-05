import type React from 'react';
import { useGameStore } from '~/store/gameStore';

interface TurnInitViewProps {
  description: string;
  age: number;
  stage: number;
  onNextAction: () => void;
}

const TurnInitView: React.FC<TurnInitViewProps> = ({
  description,
  age,
  stage,
  onNextAction,
}) => {
  const gameState = useGameStore((state) => state);

  // The loading state remains the same
  if (gameState.isLoading) {
    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center'>
        <div className='relative flex flex-col items-center'>
          {/* Outer rotating ring */}
          <div className='h-48 w-48 animate-spin rounded-full border-8 border-transparent border-t-emerald-500 border-r-teal-500' />

          {/* Middle counter-rotating ring */}
          <div
            className='absolute top-4 h-40 w-40 rounded-full border-8 border-transparent border-b-emerald-400 border-l-teal-400'
            style={{ animation: 'spin 1.5s linear infinite reverse' }}
          />

          {/* Inner pulsing circle */}
          <div className='absolute top-12 h-24 w-24 animate-pulse rounded-full bg-gradient-to-br from-emerald-500/30 to-teal-500/30 shadow-[0_0_60px_rgba(16,185,129,0.4)]' />

          {/* Orbiting particles */}
          <div
            className='absolute top-0 h-48 w-48 animate-spin'
            style={{ animationDuration: '3s' }}
          >
            <div className='-top-2 -translate-x-1/2 absolute left-1/2 h-4 w-4 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.8)]' />
          </div>
          <div
            className='absolute top-0 h-48 w-48'
            style={{
              animation: 'spin 2.5s linear infinite',
              animationDelay: '0.5s',
            }}
          >
            <div className='-translate-y-1/2 absolute top-1/2 left-0 h-3 w-3 rounded-full bg-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.8)]' />
          </div>
          <div
            className='absolute top-0 h-48 w-48'
            style={{
              animation: 'spin 2s linear infinite',
              animationDelay: '1s',
            }}
          >
            <div className='-translate-x-1/2 absolute bottom-0 left-1/2 h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.6)]' />
          </div>
        </div>
      </div>
    );
  }

  return (
    // Keep the full-screen background and particles
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-950 via-teal-950 to-cyan-950 px-4 py-12'>
      {/* Animated background particles */}
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className='absolute h-2 w-2 animate-pulse rounded-full bg-teal-500/30'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main content container, now FIXED at the top (top-10) and centered */}
      <div className='-translate-x-1/2 fade-in slide-in-from-top-4 fixed top-20 left-1/2 z-10 w-full max-w-4xl animate-in duration-500'>
        <div
          // Removed hover effects, fixed the border and shadow
          className='relative overflow-hidden rounded-3xl border-2 border-teal-800/50 bg-teal-900/30 p-10 text-center shadow-[0_0_50px_rgba(16,185,129,0.2)] backdrop-blur-sm'
        >
          {/* Inner animated gradient border/glow (fixed opacity, not on hover) */}
          <div className='absolute inset-0 rounded-3xl border-4 border-transparent bg-gradient-to-br from-emerald-500/0 via-teal-600/50 to-cyan-600/0 opacity-20' />

          {/* Heading with gradient text */}
          <h1 className='mb-4 text-center font-extrabold text-5xl tracking-tight'>
            <span className='bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent'>
              Etap {stage} • Wiek: {age} lat
            </span>
          </h1>

          {/* Main description */}
          <p className='mb-6 text-center font-medium text-2xl text-gray-200 leading-relaxed'>
            {description}
          </p>

          {/* Call to action text */}
          <p className='text-center font-light text-lg text-teal-300'>
            Kliknij przycisk poniżej, aby rozpocząć turę →
          </p>
        </div>
      </div>

      {/* Navigation button (centered at the bottom) */}
      <div className='-translate-x-1/2 fixed bottom-8 left-1/2 flex animate-in duration-500'>
        <button
          type='button'
          onClick={onNextAction}
          className='group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-12 py-4 font-bold text-2xl text-white shadow-[0_0_50px_rgba(16,185,129,0.6)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_80px_rgba(16,185,129,0.8)]'
        >
          {/* Hover background effect */}
          <div className='absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
          <span className='relative z-10'>Rozpocznij turę! 🎯</span>
        </button>
      </div>
    </div>
  );
};

export default TurnInitView;
