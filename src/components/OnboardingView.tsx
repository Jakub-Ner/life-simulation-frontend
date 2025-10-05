'use client';

import { useState } from 'react';
import { useGameStore } from '~/store/gameStore';

interface SelectionBoxProps {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
  isSelected?: boolean;
}

function SelectionBox({
  icon,
  title,
  description,
  onClick,
  isSelected,
}: SelectionBoxProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border-2 p-8 transition-all duration-500 hover:scale-105 ${
        isSelected
          ? 'border-emerald-400 bg-emerald-600/30 shadow-[0_0_30px_rgba(16,185,129,0.4)]'
          : 'border-teal-800/50 bg-teal-900/20 hover:border-teal-600 hover:bg-teal-800/30'
      }`}
    >
      {/* Animated background gradient */}
      <div className='absolute inset-0 bg-gradient-to-br from-emerald-600/0 via-teal-600/0 to-cyan-600/0 opacity-0 transition-opacity duration-500 group-hover:opacity-20' />

      {/* Content */}
      <div className='relative z-10 flex flex-col items-center gap-4'>
        <div className='text-6xl transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110'>
          {icon}
        </div>
        <h3 className='font-bold text-2xl text-white'>{title}</h3>
        <p className='text-center text-gray-300 text-sm leading-relaxed'>
          {description}
        </p>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <div className='zoom-in absolute top-4 right-4 flex h-8 w-8 animate-in items-center justify-center rounded-full bg-emerald-500'>
          <span className='text-white'>✓</span>
        </div>
      )}
    </button>
  );
}

type OnboardingStep = 'goal' | 'gender' | 'name';

const goals = [
  {
    id: 'rich',
    icon: '💎',
    title: 'Bogata emerytura',
    description:
      'Zbieraj fortunę, inwestuj mądrze i ciesz się luksusowym życiem na emeryturze.',
  },
  {
    id: 'family',
    icon: '❤️',
    title: 'Szczęśliwa rodzina',
    description:
      'Buduj silne relacje, twórz wspomnienia i zostaw po sobie kochającą rodzinę.',
  },
  {
    id: 'career',
    icon: '🏆',
    title: 'Spełnienie zawodowe',
    description:
      'Wspinaj się po szczeblach kariery, osiągaj cele i zostaw swój ślad w świecie.',
  },
];

const genders = [
  {
    id: 'male',
    icon: '👨',
    title: 'Mężczyzna',
    description: 'Rozpocznij swoją przygodę jako mężczyzna',
  },
  {
    id: 'female',
    icon: '👩',
    title: 'Kobieta',
    description: 'Rozpocznij swoją przygodę jako kobieta',
  },
];

export function OnboardingView({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<OnboardingStep>('goal');
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState(false);

  const { createNewGame, isLoading } = useGameStore();

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      if (step === 'goal') {
        setStep('gender');
      } else if (step === 'gender') {
        setStep('name');
      }
      setIsAnimating(false);
    }, 300);
  };

  const handleFinish = async () => {
    if (name.trim() && selectedGender && selectedGoal) {
      const goalText =
        goals.find((g) => g.id === selectedGoal)?.title || selectedGoal;
      await createNewGame(selectedGender, goalText, name.trim());
      if (!isLoading) {
        onComplete();
      }
    }
  };

  const canProceed = () => {
    if (step === 'goal') return selectedGoal !== '';
    if (step === 'gender') return selectedGender !== '';
    if (step === 'name') return name.trim() !== '';
    return false;
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-950 via-teal-950 to-cyan-950 px-4 py-12'>
      {isLoading ? (
        <div className='text-center'>
          <div className='mb-8 animate-bounce text-9xl'>🎮</div>
          <h2 className='mb-4 bg-gradient-to-r from-emerald-200 via-cyan-200 to-emerald-200 bg-clip-text font-bold text-5xl text-transparent'>
            Tworzę Twoją historię...
          </h2>
          <div className='mx-auto mb-6 flex max-w-md items-center justify-center gap-2'>
            <div
              className='h-3 w-3 animate-pulse rounded-full bg-emerald-400'
              style={{ animationDelay: '0s' }}
            />
            <div
              className='h-3 w-3 animate-pulse rounded-full bg-teal-400'
              style={{ animationDelay: '0.2s' }}
            />
            <div
              className='h-3 w-3 animate-pulse rounded-full bg-cyan-400'
              style={{ animationDelay: '0.4s' }}
            />
          </div>
          <p className='font-medium text-lg text-teal-300'>
            Przygotowuję Twoje życiowe wyzwania...
          </p>
        </div>
      ) : (
        <>
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

          <div
            className={`relative w-full max-w-5xl transition-all duration-300 ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
          >
            {/* Progress indicator */}
            <div className='mb-12 flex items-center justify-center gap-3'>
              {['goal', 'gender', 'name'].map((s, idx) => (
                <div
                  key={s}
                  className={`h-3 rounded-full transition-all duration-500 ${
                    step === s
                      ? 'w-24 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.6)]'
                      : idx < ['goal', 'gender', 'name'].indexOf(step)
                        ? 'w-12 bg-teal-700'
                        : 'w-12 bg-teal-900/50'
                  }`}
                />
              ))}
            </div>

            {/* Goal Selection */}
            {step === 'goal' && (
              <div className='fade-in slide-in-from-bottom-4 animate-in duration-500'>
                <h2 className='mb-4 text-center font-bold text-5xl text-white'>
                  Wybierz swój cel życiowy
                </h2>
                <p className='mb-12 text-center text-gray-300 text-xl'>
                  Co chcesz osiągnąć w swoim życiu?
                </p>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
                  {goals.map((goal) => (
                    <SelectionBox
                      key={goal.id}
                      icon={goal.icon}
                      title={goal.title}
                      description={goal.description}
                      onClick={() => setSelectedGoal(goal.id)}
                      isSelected={selectedGoal === goal.id}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Gender Selection */}
            {step === 'gender' && (
              <div className='fade-in slide-in-from-bottom-4 animate-in duration-500'>
                <h2 className='mb-4 text-center font-bold text-5xl text-white'>
                  Kim jesteś?
                </h2>
                <p className='mb-12 text-center text-gray-300 text-xl'>
                  Wybierz swoją postać
                </p>
                <div className='mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2'>
                  {genders.map((gender) => (
                    <SelectionBox
                      key={gender.id}
                      icon={gender.icon}
                      title={gender.title}
                      description={gender.description}
                      onClick={() => setSelectedGender(gender.id)}
                      isSelected={selectedGender === gender.id}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Name Input */}
            {step === 'name' && (
              <div className='fade-in slide-in-from-bottom-4 animate-in duration-500'>
                <h2 className='mb-4 text-center font-bold text-5xl text-white'>
                  Jak masz na imię?
                </h2>
                <p className='mb-12 text-center text-gray-300 text-xl'>
                  Przedstaw się światu
                </p>
                <div className='mx-auto max-w-md'>
                  <div className='relative'>
                    <input
                      type='text'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder='Wpisz swoje imię...'
                      className='w-full rounded-2xl border-2 border-teal-600 bg-teal-900/30 px-8 py-6 text-center font-semibold text-2xl text-white placeholder-teal-400 shadow-[0_0_30px_rgba(20,184,166,0.2)] transition-all duration-300 focus:border-emerald-400 focus:shadow-[0_0_50px_rgba(16,185,129,0.4)] focus:outline-none'
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && canProceed()) {
                          handleFinish();
                        }
                      }}
                    />
                    {name && (
                      <div className='-translate-y-1/2 zoom-in absolute top-1/2 right-6 animate-in text-3xl duration-300'>
                        👋
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className='mt-12 flex justify-center gap-4'>
              {step !== 'goal' && (
                <button
                  type='button'
                  onClick={() => {
                    setIsAnimating(true);
                    setTimeout(() => {
                      if (step === 'gender') setStep('goal');
                      if (step === 'name') setStep('gender');
                      setIsAnimating(false);
                    }, 300);
                  }}
                  className='rounded-xl border-2 border-teal-600 bg-transparent px-8 py-4 font-semibold text-lg text-teal-300 transition-all duration-300 hover:bg-teal-600/20'
                >
                  ← Wstecz
                </button>
              )}
              {step !== 'name' ? (
                <button
                  type='button'
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className='group relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-12 py-4 font-bold text-lg text-white shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] disabled:opacity-50 disabled:hover:scale-100'
                >
                  <span className='relative z-10'>Dalej →</span>
                  <div className='absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                </button>
              ) : (
                <button
                  type='button'
                  onClick={handleFinish}
                  disabled={!canProceed() || isLoading}
                  className='group relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-12 py-4 font-bold text-lg text-white shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] disabled:opacity-50 disabled:hover:scale-100'
                >
                  <span className='relative z-10'>
                    {isLoading ? 'Tworzenie gry...' : 'Rozpocznij grę! 🎮'}
                  </span>
                  <div className='absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
