'use client';

import { useState } from 'react';
import LifeBar from '../../components/ui/LifeBar';

export default function GamePage() {
  const [age, setAge] = useState(15);

  return (
    <main className='flex min-h-screen flex-col bg-[#15162c] p-8 text-white'>
      <div className='flex flex-col items-center justify-start gap-4 pt-12'>
        <LifeBar currentAge={age} maxAge={60} />
      </div>

      <div className='mt-16 flex flex-grow flex-col items-center justify-center'>
        <button
          type='button'
          onClick={() => setAge(age + 5)}
          className='rounded bg-blue-600 px-4 py-2 transition hover:bg-blue-700'
        >
          Zwiększ wiek
        </button>
      </div>
    </main>
  );
}
