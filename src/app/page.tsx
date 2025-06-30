'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from "framer-motion";
import { useAlgorithm } from '../hooks/useAlgorithm';
import { AlgorithmVisualizer } from '../components/AlgorithmVisualizer';
import { BubbleSortVisualizer } from '../components/BubbleSortVisualizer';
import { QuickSortVisualizer } from '../components/QuickSortVisualizer';
import { SelectSortVisualizer } from '../components/SelectSortVisualizer';
import { generateBubbleSortSteps } from '../algorithms/sort/bubbleSort';
import { generateQuickSortSteps } from '../algorithms/sort/quickSort';
import { generateSelectSortSteps } from '../algorithms/sort/selectSort';
import styles from './page.module.css';
import { BubbleSortData } from '@/algorithms/sort/bubbleSort';
import { QuickSortData } from '@/algorithms/sort/quickSort';
import { SelectSortData } from '@/algorithms/sort/selectSort';
import { AlgorithmStep } from '@/types/algorithm';

import MatrixCode from '@/components/ui/matrix-code';

type AlgorithmType = 'bubble' | 'quick' | 'select';

export default function Home() {
  const [algorithmType, setAlgorithmType] = useState<AlgorithmType>('bubble');
  
  // 生成一个随机数组用于排序
  // const initialArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 20) + 1);
  const initialArray = useMemo(() => [2, 4, 1, 0, 3, 5], []);
  
  // 根据选择的算法类型生成步骤
  const steps = useMemo(() =>{
    switch(algorithmType) {
      case 'bubble':
        return generateBubbleSortSteps(initialArray);
      case 'quick':
        return generateQuickSortSteps(initialArray);
      case 'select':
        return generateSelectSortSteps(initialArray);
      default:
        return [];
    }
  }, [algorithmType, initialArray]);

  
    
  const [state, controller] =  useAlgorithm<BubbleSortData | QuickSortData | SelectSortData>(steps);
  const currentStep: AlgorithmStep<BubbleSortData | QuickSortData | SelectSortData> = steps[state.currentStep];


  const renderAlgorithmVisualizer = useCallback(() => {
    switch(algorithmType) {
      case 'bubble':
        return <BubbleSortVisualizer currentStep={currentStep as AlgorithmStep<BubbleSortData>} />;
      case 'quick':
        return <QuickSortVisualizer currentStep={currentStep as AlgorithmStep<QuickSortData>} />;
      case 'select':
        return <SelectSortVisualizer currentStep={currentStep as AlgorithmStep<SelectSortData>} />;
      default:
        return null;
    }
  }, [algorithmType, currentStep]);

  return (
    <div className={styles.page}>
      {/* <MatrixCode /> */}
      <motion.div
        animate={{ rotateX: 90 }}
        transition={{ type: "spring", bounce: 0.25 }}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'red',
        }}
      />
      {/* <main className={styles.main}>
        <h1>Algorithm Visualization</h1>
        <div className={styles.algorithmSelector}>
          <button
            className={`${styles.algorithmButton} ${algorithmType === 'bubble' ? styles.active : ''}`}
            onClick={() => setAlgorithmType('bubble')}
          >
            Bubble Sort
          </button>
          <button
            className={`${styles.algorithmButton} ${algorithmType === 'quick' ? styles.active : ''}`}
            onClick={() => setAlgorithmType('quick')}
          >
            Quick Sort
          </button>
          <button
            className={`${styles.algorithmButton} ${algorithmType === 'select' ? styles.active : ''}`}
            onClick={() => setAlgorithmType('select')}
          >
            Select Sort
          </button>
        </div>
        <AlgorithmVisualizer
          algorithm={controller}
          state={state}
          currentStep={currentStep}
        >
          {renderAlgorithmVisualizer()}
        </AlgorithmVisualizer>
      </main> */}
    </div>
  );
}
