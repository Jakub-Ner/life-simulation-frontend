import type React from 'react';

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
      <div className='fixed bottom-8 left-1/2 flex -translate-x-1/2 animate-in'>
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
