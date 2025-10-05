import type React from 'react';
import { useGameStore } from '~/store/gameStore';
import './SegmentLifeBar.css';

// Define stage colors
const STAGE_COLORS = {
  mladosc: 'bg-blue-300', // młodość
  dorosly: 'bg-blue-500', // dorosły
  dojrzaly: 'bg-blue-700', // wiek dojrzary
} as const;

const getStageForStartAge = (startAge: number): keyof typeof STAGE_COLORS => {
  if (startAge < 25) return 'mladosc';
  if (startAge < 45) return 'dorosly';
  return 'dojrzaly';
};

const SegmentLifeBar: React.FC = () => {
  const { gender, age } = useGameStore();
  const minAge = 15;
  const maxAge = gender === 'female' ? 60 : 65;
  const clampedAge = Math.max(minAge, Math.min(age, maxAge));

  // Calculate segment starts
  const segmentStarts = [];
  for (let a = minAge; a < maxAge; a += 5) {
    segmentStarts.push(a);
  }

  const maxSegmentIndex = segmentStarts.length - 1;
  const currentSegmentIndex =
    Math.floor((clampedAge - minAge) / 5) > maxSegmentIndex
      ? maxSegmentIndex
      : Math.floor((clampedAge - minAge) / 5);

  return (
    <div className='segment-life-bar-container flex items-center justify-center gap-2'>
      {segmentStarts.map((startAge, index) => {
        const isActive = index <= currentSegmentIndex;
        const stage = getStageForStartAge(startAge);
        const bgColor = isActive ? STAGE_COLORS[stage] : 'bg-gray-200';
        const textColor = isActive ? 'text-white' : 'text-gray-600';

        return (
          <div
            key={`segment-${startAge}`}
            className={`whitespace-nowrap rounded-full px-3 py-1 font-medium text-xs ${bgColor} ${textColor} transition-colors duration-300`}
          >
            {startAge}-{startAge + 5}
          </div>
        );
      })}
    </div>
  );
};

export default SegmentLifeBar;
