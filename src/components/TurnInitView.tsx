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
    <div className='relative z-10 mx-auto max-w-4xl'>
      <div
        style={{
          backgroundColor: '#00993F',
          color: '#000000',
          padding: '2rem',
          borderRadius: '0.5rem',
          textAlign: 'center',
          width: '500px',
          margin: 'auto',
        }}
      >
        <h1
          style={{
            fontSize: '2rem',
            marginBottom: '1rem',
            color: '#FFB34F',
          }}
        >
          Etap {stage} • Wiek: {age} lat
        </h1>
        <p
          style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: '#FFFFFF',
          }}
        >
          {description}
        </p>
        <p
          style={{
            fontSize: '1rem',
            color: '#BEC3CE',
          }}
        >
          Kliknij przycisk poniżej, aby rozpocząć turę →
        </p>
      </div>
      <div className='-translate-x-1/2 fixed bottom-8 left-1/2 flex animate-in'>
        <button
          type='button'
          onClick={onNextAction}
          className='group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-12 py-4 font-bold text-2xl text-white shadow-[0_0_50px_rgba(16,185,129,0.6)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_80px_rgba(16,185,129,0.8)]'
        >
          <div className='absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
          <span className='relative z-10'>Rozpocznij turę! 🎯</span>
        </button>
      </div>
    </div>
  );
};

export default TurnInitView;
