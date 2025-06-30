import { AlgorithmStep } from '../../types/algorithm';
import { recordStep, recordCompletionStep, recordSwapStep, recordComparisonStep } from '../../utils/algorithmUtils';

export interface MergeSortData {
  array: number[];
  left: number;
  right: number;
  sortedIndices: number[];
}

export const generateMergeSortSteps = (arr: number[]): AlgorithmStep<MergeSortData>[] => {
  const steps: AlgorithmStep<MergeSortData>[] = [];
  const array = [...arr];

  // 记录开始
  recordStep(steps, {
    array: [...array],
    left: 0,
    right: array.length - 1,
    sortedIndices: [],
  }, '开始归并排序');

  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      recordComparisonStep(steps, {
        array: [...array],
        left: minIndex,
        right: j,
        sortedIndices: Array.from({ length: i }, (_, i) => i),
      }, minIndex, j);

      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    [array[minIndex], array[i]] = [array[i], array[minIndex]];
    recordSwapStep(steps, {
      array: [...array],
      left: minIndex,
      right: i,
      sortedIndices: Array.from({ length: i+1 }, (_, i) => i),
    }, minIndex, i);
  }

  recordCompletionStep(steps, {
    array: [...array],
    left: 0,
    right: array.length - 1,
    sortedIndices: [...array],
  }, '选择排序完成');

  return steps;
}