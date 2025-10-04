import type React from 'react';

type Age = 'YOUNG' | 'ADULT' | 'OLD';
type Gender = 'male' | 'female' | 'child';

interface AvatarProps {
  age: Age;
  gender: Gender;
  isHappy: boolean;
  isSick: boolean;
  size?: number;
  position?: { x: number; y: number };
  zIndex?: number;
  isShadow?: boolean;
}

const getImagePaths = (props: AvatarProps): Record<string, string | null> => {
  const { age, gender, isHappy, isSick } = props;
  const genderForParts = gender === 'child' ? 'male' : gender;

  const body =
    gender === 'child'
      ? '/character_parts/child_template.png'
      : `/character_parts/${genderForParts}_template.png`;

  const ageIndex = age === 'YOUNG' ? 1 : age === 'ADULT' ? 2 : 3;
  const hair = `/character_parts/${genderForParts}_hair_${ageIndex}.png`;

  const eyes = `/character_parts/eyes_${genderForParts}.png`;

  const mouth = `/character_parts/lips_${isHappy ? 'smile' : 'frown'}.png`;

  const thermometer = isSick ? '/character_parts/thermometer.png' : null;

  return { body, hair, eyes, mouth, thermometer };
};

const Avatar: React.FC<AvatarProps> = (props) => {
  const paths = getImagePaths(props);
  const { size = 64, position, zIndex = 1, isShadow = false } = props;

  const divStyle: React.CSSProperties = {
    width: size,
    height: size,
    zIndex,
    ...(position ? { top: position.y, left: position.x } : {}),
  };

  return (
    <div className='absolute' style={divStyle}>
      {isShadow && (
        <div
          className='absolute bottom-0 left-0 z-0'
          style={{
            width: size * 0.7,
            height: size + 1,
            backgroundColor: 'black',
            borderRadius: '50%',
            filter: 'blur(24px)',
            opacity: 0.2,
          }}
        />
      )}
      <img
        src={paths.body as string}
        alt='body'
        className='absolute top-0 left-0 z-1 h-full w-full'
      />
      <img
        src={paths.hair as string}
        alt='hair'
        className='absolute top-0 left-0 z-2 h-full w-full'
      />
      <img
        src={paths.eyes as string}
        alt='eyes'
        className='absolute top-0 left-0 z-3 h-full w-full'
      />
      <img
        src={paths.mouth as string}
        alt='mouth'
        className='absolute top-0 left-0 z-4 h-full w-full'
      />
      {paths.thermometer && (
        <img
          src={paths.thermometer}
          alt='thermometer'
          className='absolute top-0 left-0 z-5 h-full w-full'
        />
      )}
    </div>
  );
};

export default Avatar;
