// 算法状态接口
export interface AlgorithmState {
  currentStep: number;
  totalSteps: number;
  isRunning: boolean;
  isPaused: boolean;
  speed: number;
  metadata: Record<string, unknown>; // 用于存储算法特定的元数据
}

// 算法步骤接口
export interface AlgorithmStep<T> {
  step: number;
  data: T; // 使用泛型来支持不同类型的数据
  description: string;
  metadata?: Record<string, unknown>; // 可选的步骤元数据
}

// 算法控制器接口
export interface AlgorithmController {
  start: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  setSpeed: (speed: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  // 新增：更新元数据的方法
  updateMetadata: (key: string, value: unknown) => void;
}

// 算法配置接口
export interface AlgorithmConfig {
  initialSpeed?: number;
  minSpeed?: number;
  maxSpeed?: number;
  speedStep?: number;
  autoPlay?: boolean;
  loop?: boolean;
  onComplete?: () => void;
  onStepChange?: (step: number) => void;
}

// 算法可视化组件接口
export interface AlgorithmVisualizerProps<T> {
  algorithm: AlgorithmController;
  state: AlgorithmState;
  currentStep: AlgorithmStep<T>;
  children: React.ReactNode;
} 