import type React from 'react';

interface NextPhaseArrowProps {
  onClick: () => void;
}

const NextPhaseArrow: React.FC<NextPhaseArrowProps> = ({ onClick }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      style={{
        zIndex: 5000000000000,
        position: 'fixed',
        bottom: '20px',
        left: '300px',
        backgroundColor: '#3F84D2',
        color: '#FFFFFF',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'pulse 2s infinite',
      }}
    >
      <svg
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        style={{ width: '40px', height: '40px' }}
        aria-label='Next phase arrow'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={3}
          d='M13 7l5 5m0 0l-5 5m5-5H6'
        />
      </svg>
    </button>
  );
};

export default NextPhaseArrow;
