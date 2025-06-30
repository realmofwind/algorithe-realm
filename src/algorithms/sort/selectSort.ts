import { AlgorithmStep } from '../../types/algorithm';
import { recordStep, recordCompletionStep, recordSwapStep, recordComparisonStep } from '../../utils/algorithmUtils';

export interface SelectSortData {
  array: number[];
  minIndex: number;
  currentIndex: number;
  sortedIndices: number[];
}

export const generateSelectSortSteps = (arr: number[]): AlgorithmStep<SelectSortData>[] => {
  const steps: AlgorithmStep<SelectSortData>[] = [];
  const array = [...arr];

  // 记录开始
  recordStep(steps, {
    array: [...array],
    minIndex: 0,
    currentIndex: 0,
    sortedIndices: [],
  }, '开始选择排序');

  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      recordComparisonStep(steps, {
        array: [...array],
        minIndex: minIndex,
        currentIndex: j,
        sortedIndices: Array.from({ length: i }, (_, i) => i),
      }, minIndex, j);

      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    [array[minIndex], array[i]] = [array[i], array[minIndex]];
    recordSwapStep(steps, {
      array: [...array],
      minIndex: minIndex,
      currentIndex: i,
      sortedIndices: Array.from({ length: i+1 }, (_, i) => i),
    }, minIndex, i);
  }

  recordCompletionStep(steps, {
    array: [...array],
    minIndex: 0,
    currentIndex: 0,
    sortedIndices: [...array],
  }, '选择排序完成');

  return steps;
}