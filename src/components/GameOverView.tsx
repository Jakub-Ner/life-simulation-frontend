'use client';

import type React from 'react';
import type { GameParameters } from '~/store/gameStore';

interface GameOverViewProps {
  summary: string;
  stats: GameParameters;
  onPlayAgain: () => void;
}

const GameOverView: React.FC<GameOverViewProps> = ({
  summary,
  stats,
  onPlayAgain,
}) => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-900 via-red-900 to-green-900 px-4 py-12'>
      <div className='max-w-7xl text-center'>
        <h1 className='mb-4 font-bold text-5xl text-white md:text-7xl'>
          Koniec gry
        </h1>

        <div className='mx-auto mt-8 mb-12 grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2'>
          {/* Stats Section */}
          <div className='rounded-lg bg-white/10 p-8 text-left backdrop-blur-sm'>
            <h2 className='mb-4 border-gray-500 border-b pb-2 font-bold text-3xl text-cyan-300'>
              Statystyki końcowe
            </h2>
            <ul className='space-y-6 text-3xl text-gray-200'>
              <li className='flex items-center justify-between'>
                <span className='flex items-center'>
                  <span className='mr-4 text-5xl'>💼</span>
                  Kariera
                </span>
                <span className='font-semibold text-4xl text-white'>
                  {stats.career}
                </span>
              </li>
              <li className='flex items-center justify-between'>
                <span className='flex items-center'>
                  <span className='mr-4 text-5xl'>❤️</span>
                  Relacje
                </span>
                <span className='font-semibold text-4xl text-white'>
                  {stats.relations}
                </span>
              </li>
              <li className='flex items-center justify-between'>
                <span className='flex items-center'>
                  <span className='mr-4 text-5xl'>🏥</span>
                  Zdrowie
                </span>
                <span className='font-semibold text-4xl text-white'>
                  {stats.health}
                </span>
              </li>
              <li className='flex items-center justify-between'>
                <span className='flex items-center'>
                  <span className='mr-4 text-5xl'>💰</span>
                  Pieniądze
                </span>
                <span className='font-semibold text-4xl text-white'>
                  {stats.money}
                </span>
              </li>
            </ul>
          </div>

          {/* Summary Section */}
          <div className='rounded-lg bg-white/10 p-8 text-left backdrop-blur-sm'>
            <h2 className='mb-4 border-gray-500 border-b pb-2 font-bold text-3xl text-cyan-300'>
              Podsumowanie
            </h2>
            <p className='text-gray-200 text-xl'>{summary}</p>
          </div>
        </div>

        <button
          type='button'
          onClick={onPlayAgain}
          className='rounded-lg bg-emerald-500 px-12 py-4 font-bold text-white text-xl shadow-lg transition-all duration-300 hover:scale-105 hover:bg-emerald-600 hover:shadow-2xl'
        >
          Zagraj ponownie
        </button>
      </div>
    </div>
  );
};

export default GameOverView;
