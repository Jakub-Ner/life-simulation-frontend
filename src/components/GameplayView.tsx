'use client';

import { useEffect } from 'react';
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

export function GameplayView() {
  const gameState = useGameStore();
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

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 p-6'>
      {/* Animated background particles */}
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
        <div className='fade-in slide-in-from-top mb-8 animate-in duration-700'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='mb-2 font-bold text-4xl text-white'>
                Symulator Życia
              </h1>
              <p className='text-purple-300'>
                Tura: {gameState.game_turn} | Etap: {gameState.current_stage}
              </p>
            </div>
            <button
              type='button'
              onClick={() => gameState.resetGame()}
              className='rounded-lg border-2 border-purple-600 bg-purple-600/20 px-6 py-2 font-semibold text-purple-300 transition-all duration-300 hover:bg-purple-600/30'
            >
              Nowa gra
            </button>
          </div>
        </div>

        <div className='grid gap-6 lg:grid-cols-3'>
          {/* Left Column - Player Info & Stats */}
          <div className='fade-in slide-in-from-left animate-in space-y-6 duration-700 lg:col-span-1'>
            <PlayerInfo
              name={gameState.name}
              age={gameState.age}
              gender={gameState.gender}
              goal={gameState.goal}
            />

            <div className='space-y-3'>
              <h3 className='mb-4 font-bold text-white text-xl'>Parametry</h3>
              <StatBar
                label='Kariera'
                value={gameState.parameters.career}
                icon='💼'
                color='bg-gradient-to-r from-blue-500 to-blue-600'
              />
              <StatBar
                label='Relacje'
                value={gameState.parameters.relations}
                icon='❤️'
                color='bg-gradient-to-r from-pink-500 to-pink-600'
              />
              <StatBar
                label='Zdrowie'
                value={gameState.parameters.health}
                icon='🏥'
                color='bg-gradient-to-r from-green-500 to-green-600'
              />
              <StatBar
                label='Pieniądze'
                value={gameState.parameters.money}
                icon='💰'
                color='bg-gradient-to-r from-yellow-500 to-yellow-600'
              />
            </div>
          </div>

          {/* Right Column - Game Content */}
          <div className='fade-in slide-in-from-right animate-in space-y-6 duration-700 lg:col-span-2'>
            {/* Current Situation */}
            <div className='overflow-hidden rounded-2xl border border-purple-700/50 bg-purple-900/30 p-8 backdrop-blur-sm'>
              <h3 className='mb-4 font-bold text-2xl text-white'>
                Aktualna sytuacja
              </h3>
              <div className='prose prose-invert max-w-none'>
                <p className='text-gray-200 text-lg leading-relaxed'>
                  {gameState.turn_description ||
                    'Twoja przygoda się rozpoczyna...'}
                </p>
              </div>
            </div>

            {/* Actions/Cards placeholder */}
            <div className='overflow-hidden rounded-2xl border border-purple-700/50 bg-purple-900/30 p-8 backdrop-blur-sm'>
              <h3 className='mb-6 font-bold text-2xl text-white'>
                Wybierz swoją akcję
              </h3>
              <div className='flex min-h-[300px] items-center justify-center'>
                <p className='text-gray-400 text-lg'>
                  Karty akcji pojawią się tutaj...
                </p>
              </div>
            </div>

            {/* History */}
            {gameState.history.length > 0 && (
              <div className='overflow-hidden rounded-2xl border border-purple-700/50 bg-purple-900/30 p-6 backdrop-blur-sm'>
                <h3 className='mb-4 font-bold text-white text-xl'>Historia</h3>
                <div className='space-y-2'>
                  {gameState.history.map((item, idx) => (
                    <div
                      key={idx}
                      className='rounded-lg bg-purple-950/40 p-3 text-gray-300 text-sm'
                    >
                      {JSON.stringify(item)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
