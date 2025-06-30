import { AlgorithmStep } from '../../types/algorithm';
import { recordStep, recordCompletionStep, recordSwapStep, recordComparisonStep } from '../../utils/algorithmUtils';

// 快速排序的数据类型
export interface QuickSortData {
  array: number[];
  pivot: number;  // 当前选中的pivot
  left: number | null;   // 当前分区左边界
  right: number | null;  // 当前分区右边界
  i: number | null; // 当前左指针位置
  j: number | null; // 当前右指针位置
  sortedIndices: number[];  // 已排序的索引
  partitionIndices: number[];  // 当前分区的范围
  currentPartition: number[];  // 当前正在处理的子数组
}

// 分区函数
function partition(
  arr: number[],
  left: number,
  right: number,
  steps: AlgorithmStep<QuickSortData>[]
): number {
  const pivot = arr[left];  // 使用最左端元素作为pivot
  let i = left + 1;  // 从pivot右边第一个元素开始
  let j = right;

  // 记录分区开始
  recordStep(steps, {
    array: [...arr],
    pivot,
    left,
    right,
    i,
    j,
    sortedIndices: Array.from({ length: left }, (_, i) => i),
    partitionIndices: [left, right],
    currentPartition: arr.slice(left, right + 1)
  }, '开始分区');

  while (i < j) {
    // 找到右边第一个小于等于pivot的元素
    while (i < j && arr[j] > pivot) {
      j--;
      recordStep(steps, {
        array: [...arr],
        pivot,
        i,
        j,
        left,
        right,
        sortedIndices: Array.from({ length: left }, (_, i) => i),
        partitionIndices: [left, right],
        currentPartition: arr.slice(left, right + 1)
      }, '寻找右边第一个小于等于pivot的元素');
    }

   
    // 找到左边第一个大于等于pivot的元素
    while (i < j && arr[i] < pivot) {
      i++;
      recordStep(steps, {
        array: [...arr],
        pivot,
        i,
        j,
        left,
        right,
        sortedIndices: Array.from({ length: left }, (_, i) => i),
        partitionIndices: [left, right],
        currentPartition: arr.slice(left, right + 1)
      }, '寻找左边第一个大于等于pivot的元素');
    }


    // 如果找到了需要交换的元素对
    if (i < j) {
      // 交换元素
      [arr[i], arr[j]] = [arr[j], arr[i]];
       // 记录交换
       recordSwapStep(steps, {
        array: [...arr],
        pivot,
        left,
        right,
        i,
        j,
        sortedIndices: Array.from({ length: left }, (_, i) => i),
        partitionIndices: [left, right],
        currentPartition: arr.slice(left, right + 1)
      }, i, j);
    }
    if(i === j) {
      recordStep(steps, {
        array: [...arr],
        pivot,
        left,
        right,
        i,
        j,
        sortedIndices: Array.from({ length: left }, (_, i) => i),
        partitionIndices: [left, right],
        currentPartition: arr.slice(left, right + 1)
      }, `i和j相遇`);
    }
  }

  // 将pivot放到正确的位置
  [arr[left], arr[j]] = [arr[j], arr[left]];

  // 记录分区完成
  // recordStep(steps, {
  //   array: [...arr],
  //   pivot: null,
  //   left,
  //   right,
  //   i,
  //   j,
  //   sortedIndices: Array.from({ length: left }, (_, i) => i),
  //   partitionIndices: [],
  //   currentPartition: []
  // }, '分区完成');

  return j;
}

// 快速排序的递归辅助函数
function quickSortHelper(
  arr: number[],
  left: number,
  right: number,
  steps: AlgorithmStep<QuickSortData>[]
): void {
  if (left < right) {
    // 记录开始排序子数组
    recordStep(steps, {
      array: [...arr],
      pivot: arr[left],
      left,
      right,
      i: null,
      j: null,
      sortedIndices: Array.from({ length: left }, (_, i) => i),
      partitionIndices: [left, right],
      currentPartition: arr.slice(left, right + 1)
    }, `开始排序子数组 [${left}...${right}]`);

    const pivotIndex = partition(arr, left, right, steps);
    
    // 记录pivot位置已排序
    recordStep(steps, {
      array: [...arr],
      pivot: arr[pivotIndex],
      left,
      right,
      i: null,
      j: null,
      sortedIndices: [...Array.from({ length: left }, (_, i) => i), pivotIndex],
      partitionIndices: [],
      currentPartition: []
    }, `分区完成，pivot ${pivotIndex} 已到达最终位置`);
    
    quickSortHelper(arr, left, pivotIndex - 1, steps);
    
    quickSortHelper(arr, pivotIndex + 1, right, steps);
  }
}

// 生成快速排序的步骤
export function generateQuickSortSteps(arr: number[]): AlgorithmStep<QuickSortData>[] {
  const steps: AlgorithmStep<QuickSortData>[] = [];
  const array = [...arr];

  // 记录开始
  recordStep(steps, {
    array: [...array],
    pivot: null,
    left: null,
    right: null,
    i: null,
    j: null,
    sortedIndices: [],
    partitionIndices: [],
    currentPartition: []
  }, '开始快速排序');

  quickSortHelper(array, 0, array.length - 1, steps);

  // 记录完成
  recordCompletionStep(steps, {
    array: [...array],
    pivot: null,
    left: null,
    right: null,
    i: null,
    j: null,
    sortedIndices: Array.from({ length: array.length }, (_, i) => i),
    partitionIndices: [],
    currentPartition: []
  }, '快速排序完成');

  return steps;
}