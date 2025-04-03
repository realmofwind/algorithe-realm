import { AlgorithmStep } from '../types/algorithm';
import { recordComparisonStep, recordSwapStep, recordCompletionStep } from '../utils/algorithmUtils';

interface BubbleSortData {
  array: number[];
  currentIndex: number;
  comparingIndex: number;
  sortedIndices: number[];
}

export function generateBubbleSortSteps(array: number[]): AlgorithmStep<BubbleSortData>[] {
  const steps: AlgorithmStep<BubbleSortData>[] = [];
  const n = array.length;
  const currentArray = [...array];
  const sortedIndices: number[] = [];

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      // 记录当前步骤
      recordComparisonStep(
        steps,
        {
          array: [...currentArray],
          currentIndex: j,
          comparingIndex: j + 1,
          sortedIndices: [...sortedIndices],
        },
        j,
        j + 1
      );

      // 如果当前元素大于下一个元素，交换它们
      if (currentArray[j] > currentArray[j + 1]) {
        [currentArray[j], currentArray[j + 1]] = [currentArray[j + 1], currentArray[j]];
        
        // 记录交换后的步骤
        recordSwapStep(
          steps,
          {
            array: [...currentArray],
            currentIndex: j,
            comparingIndex: j + 1,
            sortedIndices: [...sortedIndices],
          },
          j,
          j + 1
        );
      }
    }
    
    // 标记已排序的元素
    sortedIndices.push(n - 1 - i);
    
    // 记录一轮排序完成后的步骤
    recordCompletionStep(
      steps,
      {
        array: [...currentArray],
        currentIndex: -1,
        comparingIndex: -1,
        sortedIndices: [...sortedIndices],
      },
      `Completed pass ${i + 1}, elements from index ${n - 1 - i} to ${n - 1} are sorted`
    );
  }

  // 添加最后一个元素到已排序列表
  sortedIndices.push(0);
  
  // 记录排序完成的最终步骤
  recordCompletionStep(
    steps,
    {
      array: [...currentArray],
      currentIndex: -1,
      comparingIndex: -1,
      sortedIndices: [...sortedIndices],
    },
    'Sorting completed!'
  );

  return steps;
} 