'use client';

export function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-emerald-600 via-teal-700 to-blue-800 px-4 py-12'>
      <div className='max-w-4xl text-center'>
        {/* Title */}
        <h1 className='mb-6 font-bold text-5xl text-white md:text-7xl'>
          Symulator Życia
        </h1>
        <p className='mb-4 font-semibold text-2xl text-cyan-300 md:text-3xl'>
          Twoje wybory, Twoja historia
        </p>

        {/* Description */}
        <div className='mx-auto mb-12 max-w-2xl space-y-4 text-gray-200 text-lg'>
          <p>
            Przeżyj całe dorosłe życie w jednej grze – od młodości po emeryturę.
            Wybieraj ścieżkę kariery, styl życia, zarządzaj finansami i
            relacjami. Każda decyzja ma konsekwencje.
          </p>
          <p>
            To nie tylko rozrywka, ale emocjonująca symulacja ucząca
            podejmowania długoterminowych decyzji i refleksji nad własnymi
            wyborami.
          </p>
        </div>

        {/* Start Button */}
        <button
          type='button'
          onClick={onStart}
          className='rounded-lg bg-emerald-500 px-12 py-4 font-bold text-white text-xl shadow-lg transition-all duration-300 hover:scale-105 hover:bg-emerald-600 hover:shadow-2xl'
        >
          Rozpocznij swoją historię
        </button>

        {/* Decorative elements */}
        <div className='mt-16 grid grid-cols-2 gap-6 md:grid-cols-4'>
          <div className='rounded-lg bg-white/10 p-4 backdrop-blur-sm'>
            <div className='mb-2 text-3xl'>💼</div>
            <p className='text-gray-300 text-sm'>Kariera</p>
          </div>
          <div className='rounded-lg bg-white/10 p-4 backdrop-blur-sm'>
            <div className='mb-2 text-3xl'>💰</div>
            <p className='text-gray-300 text-sm'>Finanse</p>
          </div>
          <div className='rounded-lg bg-white/10 p-4 backdrop-blur-sm'>
            <div className='mb-2 text-3xl'>❤️</div>
            <p className='text-gray-300 text-sm'>Relacje</p>
          </div>
          <div className='rounded-lg bg-white/10 p-4 backdrop-blur-sm'>
            <div className='mb-2 text-3xl'>🏥</div>
            <p className='text-gray-300 text-sm'>Zdrowie</p>
          </div>
        </div>
      </div>
    </div>
  );
}
