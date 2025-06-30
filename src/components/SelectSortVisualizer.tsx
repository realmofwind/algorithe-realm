import React from 'react';
import { AlgorithmStep } from '../types/algorithm';
import { SelectSortData } from '../algorithms/sort/selectSort';
import styles from './SelectSortVisualizer.module.css';

interface SelectSortVisualizerProps {
  currentStep: AlgorithmStep<SelectSortData>;
}

export const SelectSortVisualizer: React.FC<SelectSortVisualizerProps> = ({ currentStep }) => {
  const { array, minIndex, currentIndex, sortedIndices }   = currentStep.data;
  const { description } = currentStep;

  return (
    <>
      <div className={styles.lenged}>
        <div className={`${styles.lengedItem} ${styles.sorted}`}>Sorted</div>
        <div className={`${styles.lengedItem} ${styles.comparing}`}>Comparing</div>
      </div>
      <div className={styles.description}>{description}</div>
      <div className={styles.arrayContainer}>
        {array.map((value, index) => {
          const isSorted = sortedIndices.includes(index);
          const isComparing = currentIndex === index;
          const isMinIndex = minIndex === index;

          return (
            <div key={index} className={`${styles.bar} 
            ${isSorted
            ? styles.sorted 
            : isComparing
            ? styles.comparing
            : isMinIndex
            ? styles.minIndex
            : ''
            }`}
            style={{ height: `${value * 20}px` }}
            >
              {value}
              {isMinIndex && <span className={styles.minIndexLabel}>minIndex</span>}
            </div>
          )
        })}
      </div>
    </>
  );
};
