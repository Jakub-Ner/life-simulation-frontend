import type React from 'react';

type LifeBarProps = {
  currentAge: number;
  minAge?: number;
  maxAge?: number;
};

const LifeBar: React.FC<LifeBarProps> = ({
  currentAge,
  minAge = 15,
  maxAge = 65,
}) => {
  const clampedAge = Math.max(minAge, Math.min(currentAge, maxAge));
  const progressPercent = ((clampedAge - minAge) / (maxAge - minAge)) * 100;

  const getColor = (): string => {
    const ratio = (clampedAge - minAge) / (maxAge - minAge);
    if (ratio < 0.33) return 'bg-green-400'; // młodość
    if (ratio < 0.66) return 'bg-green-500'; // dorosłość
    return 'bg-green-600'; // wiek średni
  };

  const ticks = [];
  for (let a = minAge; a <= maxAge; a += 5) {
    const leftPercent = ((a - minAge) / (maxAge - minAge)) * 100;

    // Tick Mark
    ticks.push(
      <div
        key={`tick-${a}`}
        className='-translate-x-1/2 absolute top-0 h-2 w-[1px] bg-white'
        style={{ left: `${leftPercent}%` }}
      ></div>,
    );

    // Label
    let alignmentClass = '-translate-x-1/2';
    if (a === minAge) {
      alignmentClass = '';
    } else if (a === maxAge) {
      alignmentClass = '-translate-x-full';
    }
    ticks.push(
      <div
        key={`label-${a}`}
        className={`absolute top-2 text-sm text-white ${alignmentClass}`}
        style={{ left: `${leftPercent}%` }}
      >
        {a}
      </div>,
    );
  }

  return (
    <div className='relative w-full max-w-2xl pt-8'>
      <div className='absolute top-0 right-0 left-0 w-full text-center text-gray-400 text-lg'>
        Wiek
      </div>
      <div className='relative h-10 w-full overflow-hidden rounded-lg bg-gray-700'>
        {/* Colored Progress */}
        <div
          className={`${getColor()} h-full transition-all duration-500`}
          style={{ width: `${progressPercent}%` }}
        ></div>

        {/* Age Indicator */}
        <div
          className='absolute top-0 flex h-full items-center transition-all duration-500'
          style={{ left: `${progressPercent}%` }}
        >
          <div className='relative h-full'>
            <div className='-translate-x-1/2 absolute bottom-full mb-2'>
              <div className='rounded bg-white p-1 font-bold text-black text-sm'>
                {clampedAge} lat
              </div>
              <div className='mx-auto h-0 w-0 border-t-4 border-t-white border-r-4 border-r-transparent border-l-4 border-l-transparent'></div>
            </div>
            <div className='h-full w-[2px] bg-white'></div>
          </div>
        </div>
      </div>
      <div className='relative h-4'>{ticks}</div>
    </div>
  );
};

export default LifeBar;
