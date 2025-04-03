'use client';

import { useAlgorithm } from '../hooks/useAlgorithm';
import { AlgorithmVisualizer } from '../components/AlgorithmVisualizer';
import { BubbleSortVisualizer } from '../components/BubbleSortVisualizer';
import { generateBubbleSortSteps } from '../algorithms/bubbleSort';
import styles from './page.module.css';

export default function Home() {
  // 生成一个随机数组用于排序
  const initialArray = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  const steps = generateBubbleSortSteps(initialArray);
  const [state, controller] = useAlgorithm(steps);
  const currentStep = steps[state.currentStep];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Algorithm Visualization</h1>
        <h2>Bubble Sort</h2>
        <AlgorithmVisualizer
          algorithm={controller}
          state={state}
          currentStep={currentStep}
        >
          <BubbleSortVisualizer currentStep={currentStep} />
        </AlgorithmVisualizer>
      </main>
    </div>
  );
}
