import type React from 'react';

interface TurnInitViewProps {
  description: string;
  age: number;
  stage: number;
}

const TurnInitView: React.FC<TurnInitViewProps> = ({
  description,
  age,
  stage,
}) => {
  return (
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
        Kliknij strzałkę, aby kontynuować swoją podróż →
      </p>
    </div>
  );
};

export default TurnInitView;
