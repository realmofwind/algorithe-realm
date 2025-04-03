import React from 'react';
import { AlgorithmStep } from '../types/algorithm';
import styles from './BubbleSortVisualizer.module.css';

interface BubbleSortVisualizerProps {
  currentStep: AlgorithmStep;
}

export const BubbleSortVisualizer: React.FC<BubbleSortVisualizerProps> = ({ currentStep }) => {
  const { array, currentIndex, comparingIndex, sortedIndices } = currentStep.data as {
    array: number[];
    currentIndex: number;
    comparingIndex: number;
    sortedIndices: number[];
  };

  return (
    <div className={styles.container}>
      <div className={styles.arrayContainer}>
        {array.map((value, index) => (
          <div
            key={index}
            className={`${styles.bar} ${
              sortedIndices.includes(index)
                ? styles.sorted
                : index === currentIndex
                ? styles.current
                : index === comparingIndex
                ? styles.comparing
                : ''
            }`}
            style={{ height: `${value * 20}px` }}
          >
            <span className={styles.value}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}; 