import { useState, useCallback, useRef, useEffect } from 'react';
import { AlgorithmState, AlgorithmStep, AlgorithmController, AlgorithmConfig } from '../types/algorithm';

const DEFAULT_CONFIG: Required<AlgorithmConfig> = {
  initialSpeed: 1000,
  minSpeed: 100,
  maxSpeed: 2000,
  speedStep: 100,
  autoPlay: false,
  loop: false,
  onComplete: () => {},
  onStepChange: () => {},
};

export function useAlgorithm<T>(
  initialSteps: AlgorithmStep<T>[],
  config: AlgorithmConfig = {}
): [AlgorithmState, AlgorithmController] {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  const [state, setState] = useState<AlgorithmState>({
    currentStep: 0,
    totalSteps: initialSteps.length,
    isRunning: false,
    isPaused: false,
    speed: mergedConfig.initialSpeed,
    metadata: {},
  });

  useEffect(() => {
    console.log('initialSteps', initialSteps);
    setState(prev => ({
      ...prev,
      currentStep: 0,
      totalSteps: initialSteps.length,
      isRunning: false,
      isPaused: false,
      metadata: {},
    }));
  }, [initialSteps]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const stateRef = useRef<AlgorithmState>(state);

  // 同步 state 到 ref
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // 处理步骤变化
  useEffect(() => {
    mergedConfig.onStepChange(state.currentStep);
  }, [state.currentStep, mergedConfig]);

  const start = useCallback(() => {
    console.log('start');
    setState(prev => {
      const newState = { ...prev, isRunning: true, isPaused: false };
      return newState;
    });
    // 使用 setTimeout 确保在状态更新后执行
    setTimeout(() => {
      runNextStep(stateRef.current);
    }, 100);
  }, []);

  const pause = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: true }));
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  const resume = useCallback(() => {
    setState(prev => {
      const newState = { ...prev, isPaused: false };
      // 使用 setTimeout 确保在状态更新后执行
      setTimeout(() => {
        runNextStep(newState);
      }, 0);
      return newState;
    });
  }, []);

  const stop = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: false, isPaused: false, currentStep: 0 }));
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  const setSpeed = useCallback((speed: number) => {
    const clampedSpeed = Math.min(
      Math.max(speed, mergedConfig.minSpeed),
      mergedConfig.maxSpeed
    );
    setState(prev => ({ ...prev, speed: clampedSpeed }));
  }, [mergedConfig.minSpeed, mergedConfig.maxSpeed]);

  const nextStep = useCallback(() => {
    setState(prev => {
      if (prev.currentStep < prev.totalSteps - 1) {
        return { ...prev, currentStep: prev.currentStep + 1 };
      }
      if (mergedConfig.loop) {
        return { ...prev, currentStep: 0 };
      }
      return prev;
    });
  }, [mergedConfig.loop]);

  const previousStep = useCallback(() => {
    setState(prev => {
      if (prev.currentStep > 0) {
        return { ...prev, currentStep: prev.currentStep - 1 };
      }
      if (mergedConfig.loop) {
        return { ...prev, currentStep: prev.totalSteps - 1 };
      }
      return prev;
    });
  }, [mergedConfig.loop]);

  const updateMetadata = useCallback((key: string, value: unknown) => {
    setState(prev => ({
      ...prev,
      metadata: { ...prev.metadata, [key]: value },
    }));
  }, []);

  const runNextStep = useCallback((currentState: AlgorithmState) => {
    console.log('runNextStep');
    if (currentState.isPaused || !currentState.isRunning) return;

    if (currentState.currentStep < currentState.totalSteps) {
      timerRef.current = setTimeout(() => {
        nextStep();
        // 使用 setTimeout 确保在状态更新后执行下一步
        setTimeout(() => {
          runNextStep(stateRef.current);
        }, 0);
      }, currentState.speed);
    } else {
      setState(prev => ({ ...prev, isRunning: false }));
      mergedConfig.onComplete();
    }
  }, [nextStep, mergedConfig]);

  // 自动播放
  useEffect(() => {
    if (mergedConfig.autoPlay) {
      start();
    }
  }, [mergedConfig.autoPlay, start]);

  const controller: AlgorithmController = {
    start,
    pause,
    resume,
    stop,
    setSpeed,
    nextStep,
    previousStep,
    updateMetadata,
  };

  return [state, controller];
}