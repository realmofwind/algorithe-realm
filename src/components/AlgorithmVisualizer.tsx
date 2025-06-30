import React from 'react';
import { AlgorithmVisualizerProps } from '../types/algorithm';
import styles from './AlgorithmVisualizer.module.css';
import {QuickSortData} from '../algorithms/sort/quickSort';
import {BubbleSortData} from '../algorithms/sort/bubbleSort';
import {SelectSortData} from '../algorithms/sort/selectSort';

export const AlgorithmVisualizer = <T extends QuickSortData | BubbleSortData | SelectSortData>({
  algorithm,
  state,
  currentStep,
  children,
}: AlgorithmVisualizerProps<T>) => {
  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <button onClick={algorithm.start} disabled={state.isRunning}>
          Start
        </button>
        <button onClick={algorithm.pause} disabled={!state.isRunning || state.isPaused}>
          Pause
        </button>
        <button onClick={algorithm.resume} disabled={!state.isPaused}>
          Resume
        </button>
        <button onClick={algorithm.stop} disabled={!state.isRunning && !state.isPaused}>
          Stop
        </button>
        <button onClick={algorithm.nextStep} disabled={state.isRunning}>
          Next Step
        </button>
        <button onClick={algorithm.previousStep} disabled={state.isRunning}>
          Previous Step
        </button>
        <div className={styles.speedControl}>
          <label>Speed (ms):</label>
          <input
            type="range"
            min="100"
            max="2000"
            step="100"
            value={state.speed}
            onChange={(e) => algorithm.setSpeed(Number(e.target.value))}
          />
          <span>{state.speed}ms</span>
        </div>
      </div>
      
      <div className={styles.progress}>
        Step {state.currentStep} of {state.totalSteps}
      </div>
      
      <div className={styles.description}>
        {currentStep.description}
      </div>
      
      {currentStep.metadata && Object.keys(currentStep.metadata).length > 0 && (
        <div className={styles.metadata}>
          {Object.entries(currentStep.metadata).map(([key, value]) => (
            <div key={key} className={styles.metadataItem}>
              <span className={styles.metadataKey}>{key}:</span>
              <span className={styles.metadataValue}>{String(value)}</span>
            </div>
          ))}
        </div>
      )}
      
      <div className={styles.visualization}>
        {children}
      </div>
    </div>
  );
}; 