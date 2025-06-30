import React from 'react';
import { AlgorithmStep } from '../types/algorithm';
import { QuickSortData } from '../algorithms/sort/quickSort';
import styles from './QuickSortVisualizer.module.css';

interface QuickSortVisualizerProps {
  currentStep: AlgorithmStep<QuickSortData>;
}

export const QuickSortVisualizer: React.FC<QuickSortVisualizerProps> = ({ currentStep }) => {
  const { array, pivot, left, right, i, j, sortedIndices, partitionIndices, currentPartition } = currentStep.data;
  const {description} = currentStep;

  return (
    <>
      <div className={styles.lenged}>
        <div className={`${styles.lengedItem} ${styles.sorted}`}>Sorted</div>
        <div className={`${styles.lengedItem} ${styles.pivot}`}>Pivot</div>
        <div className={`${styles.lengedItem} ${styles.comparing}`}>Comparing</div>
        <div className={`${styles.lengedItem} ${styles.partitioned}`}>Partitioned</div>
        <div className={`${styles.lengedItem} ${styles.currentPartition}`}>Current Partition</div>
      </div>
      <div className={styles.description}>{description}</div>
      <div className={styles.container}>
        <div className={styles.arrayContainer}>
          {array.map((value, index) => {
            const isPivot = value === pivot;
            const isPartitioned = partitionIndices && index >= partitionIndices.start && index <= partitionIndices.end;
            const isCurrentPartition = currentPartition && index >= currentPartition.start && index <= currentPartition.end;
            const isSorted = sortedIndices.includes(index);
            const isComparing = index === left || index === right;

            const isLeft = index === left;
            const isRight = index === right;
            const isI = index === i;
            const isJ = index === j;

            let jLabel = <span className={styles.jLabel}>j</span>;
            let iLabel = <span className={styles.iLabel}>i</span>;
            // 同时展示i，j
            if(i === j) {
              iLabel = <></>;
              jLabel = <span className={styles.jLabel}>i-j</span>
            }

            return (
              <div
                key={index}
                className={`${styles.bar} ${
                  isSorted
                    ? styles.sorted
                    : isPivot
                    ? styles.pivot
                    : isComparing
                    ? styles.comparing
                    : isPartitioned
                    ? styles.partitioned
                    : isCurrentPartition
                    ? styles.currentPartition
                    : ''
                }`}
                style={{ height: `${value * 20}px` }}
              >
                <span className={styles.value}>{value}</span>
                {isPivot && <span className={styles.pivotLabel}>Pivot</span>}
                {isLeft && <span className={styles.leftLabel}>Left</span>}
                {isRight && <span className={styles.rightLabel}>Right</span>}
                {isI && iLabel}
                {isJ && jLabel}
              </div>
            );
          })}
        </div>
      </div>
    </>
    
  );
}; 