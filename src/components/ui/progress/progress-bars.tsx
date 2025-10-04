import type React from 'react';
import { useGameStore } from '~/store/gameStore';
import './progress-bars.css';

interface ProgressData {
  currentValue: number;
  previousValue: number;
}

export interface Progresses {
  career: ProgressData;
  finances: ProgressData;
  health: ProgressData;
  relations: ProgressData;
}

const VerticalProgressBars: React.FC = () => {
  const { parameters, parameterModifications } = useGameStore();

  const progresses: Progresses = {
    career: {
      previousValue: parameters.career,
      currentValue: parameterModifications.career,
    },
    finances: {
      previousValue: parameters.money,
      currentValue: parameterModifications.money,
    },
    health: {
      previousValue: parameters.health,
      currentValue: parameterModifications.health,
    },
    relations: {
      previousValue: parameters.relations,
      currentValue: parameterModifications.relations,
    },
  };
  const categories = [
    { key: 'career', label: '💼', baseColorClass: 'bar-blue' },
    { key: 'finances', label: '💰', baseColorClass: 'bar-lime' },
    { key: 'health', label: '💊', baseColorClass: 'bar-teal' },
    { key: 'relations', label: '❤️', baseColorClass: 'bar-grape' },
  ];

  const maxValue = 100;

  return (
    <div className='progress-bars-container'>
      {categories.map((category) => {
        const data = progresses[category.key as keyof Progresses];
        if (!data) return null;

        const difference = data.currentValue - data.previousValue;
        const previousValue = data.previousValue;
        const currentValue = data.currentValue;

        const baseHeightPercent = (previousValue / maxValue) * 100;
        const diffHeightPercent = (Math.abs(difference) / maxValue) * 100;

        const diffColorClass =
          difference >= 0 ? 'diff-positive' : 'diff-negative';

        let baseDisplayHeight = baseHeightPercent;
        const diffDisplayHeight = diffHeightPercent;
        let diffSegmentPosition: React.CSSProperties = {};

        if (difference > 0) {
          diffSegmentPosition = { bottom: `${baseHeightPercent}%` };
        } else if (difference < 0) {
          baseDisplayHeight = (currentValue / maxValue) * 100;
          diffSegmentPosition = { bottom: `${baseDisplayHeight}%` };
        }

        return (
          <div className='progress-bar-wrapper' key={category.key}>
            <div className='progress-bar-label'>{category.label}</div>
            <div className='progress-bar-vertical-track'>
              <div
                className={`progress-base-fill ${category.baseColorClass}`}
                style={{ height: `${baseDisplayHeight}%` }}
              />

              {difference !== 0 && (
                <div
                  className={`progress-diff-fill ${diffColorClass}`}
                  style={{
                    height: `${diffDisplayHeight}%`,
                    ...diffSegmentPosition,
                  }}
                >
                  <span className='diff-value'>
                    {difference > 0 ? `+${difference}` : difference}
                  </span>
                </div>
              )}
            </div>
            <div className='current-value-label'>{currentValue}</div>
          </div>
        );
      })}
    </div>
  );
};

export default VerticalProgressBars;
