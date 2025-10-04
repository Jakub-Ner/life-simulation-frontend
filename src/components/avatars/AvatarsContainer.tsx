import type React from 'react';
import Avatar from './Avatar';
import './avatars.css';

type Age = 'YOUNG' | 'ADULT' | 'OLD';
type Gender = 'male' | 'female';
type PositionKey = 'false-false' | 'true-false' | 'true-true' | 'false-true';

interface AvatarsContainerProps {
  age: Age;
  gender: Gender;
  isHappy: boolean;
  isSick: boolean;
  isSpouse: boolean;
  hasChild: boolean;
  size?: number;
  isShadow?: boolean;
}

const AvatarsContainer: React.FC<AvatarsContainerProps> = ({
  age,
  gender,
  isHappy,
  isSick,
  isSpouse,
  hasChild,
  size = 320,
  isShadow = false,
}) => {
  const baseY = 40;

  // Matrix of X positions for [main, spouse, child], null if not applicable
  const positionMatrix: Record<PositionKey, (number | null)[]> = {
    'false-false': [50, null, null],
    'true-false': [0, 120, null],
    'true-true': [-20, 90, 230],
    'false-true': [10, null, 180],
  };

  const key: PositionKey = `${isSpouse}-${hasChild}` as PositionKey;
  const positions = positionMatrix[key];

  const avatars: Array<{
    age: Age;
    gender: 'male' | 'female' | 'child';
    isHappy: boolean;
    isSick: boolean;
    size: number;
    position: { x: number; y: number };
    zIndex: number;
    isShadow: boolean;
  }> = [];

  // Main
  if (positions[0] !== null) {
    avatars.push({
      age,
      gender,
      isHappy,
      isSick,
      size,
      position: { x: positions[0] as number, y: baseY },
      zIndex: 10,
      isShadow: isSpouse || hasChild,
    });
  }

  // Spouse
  if (positions[1] !== null) {
    const spouseGender: Gender = gender === 'male' ? 'female' : 'male';
    avatars.push({
      age,
      gender: spouseGender,
      isHappy: isHappy || !isSick,
      isSick: false,
      size: size - 10,
      position: { x: positions[1] as number, y: baseY + 10 },
      zIndex: 5,
      isShadow: hasChild,
    });
  }

  // Child
  if (positions[2] !== null) {
    avatars.push({
      age: 'YOUNG',
      gender: 'child',
      isHappy: isHappy || !isSick,
      isSick: false,
      size: size * 0.75,
      position: { x: positions[2] as number, y: baseY + 50 },
      zIndex: 1,
      isShadow: false,
    });
  }

  return (
    <div className='avatars-container shadow'>
      {avatars.map((avatar, index) => (
        <Avatar key={`${avatar.age}-${avatar.gender}-${index}`} {...avatar} />
      ))}
    </div>
  );
};

export default AvatarsContainer;
