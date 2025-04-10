import { AlgorithmStep } from '../types/algorithm';

/**
 * 创建算法步骤
 * @param stepNumber 步骤序号
 * @param data 步骤数据
 * @param description 步骤描述
 * @param metadata 可选的元数据
 */
export function createStep<T>(
  stepNumber: number,
  data: T,
  description: string,
  metadata?: Record<string, unknown>
): AlgorithmStep<T> {
  return {
    step: stepNumber,
    data,
    description,
    metadata,
  };
}

/**
 * 记录算法步骤
 * @param steps 步骤数组
 * @param data 步骤数据
 * @param description 步骤描述
 * @param metadata 可选的元数据
 */
export function recordStep<T>(
  steps: AlgorithmStep<T>[],
  data: T,
  description: string,
  metadata?: Record<string, unknown>
): void {
  steps.push(createStep(steps.length, data, description, metadata));
}

/**
 * 记录比较步骤
 * @param steps 步骤数组
 * @param data 步骤数据
 * @param index1 第一个比较的索引
 * @param index2 第二个比较的索引
 * @param metadata 可选的元数据
 */
export function recordComparisonStep<T>(
  steps: AlgorithmStep<T>[],
  data: T,
  index1: number,
  index2: number,
  metadata?: Record<string, unknown>
): void {
  recordStep(
    steps,
    data,
    `比较元素 ${index1} 和 ${index2}`,
    metadata
  );
}

/**
 * 记录交换步骤
 * @param steps 步骤数组
 * @param data 步骤数据
 * @param index1 第一个交换的索引
 * @param index2 第二个交换的索引
 * @param metadata 可选的元数据
 */
export function recordSwapStep<T>(
  steps: AlgorithmStep<T>[],
  data: T,
  index1: number,
  index2: number,
  metadata?: Record<string, unknown>
): void {
  recordStep(
    steps,
    data,
    `交换元素 ${index1} 和 ${index2}`,
    metadata
  );
}

/**
 * 记录完成步骤
 * @param steps 步骤数组
 * @param data 步骤数据
 * @param description 完成描述
 * @param metadata 可选的元数据
 */
export function recordCompletionStep<T>(
  steps: AlgorithmStep<T>[],
  data: T,
  description: string,
  metadata?: Record<string, unknown>
): void {
  recordStep(steps, data, description, metadata);
} 