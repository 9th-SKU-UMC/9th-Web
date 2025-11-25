import { useRef } from "react";

export default function useThrottle<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number
) {
  const waiting = useRef(false);

  return (...args: Parameters<T>) => {
    if (!waiting.current) {
      callback(...args);
      waiting.current = true;

      setTimeout(() => {
        waiting.current = false;
      }, delay);
    }
  };
}
