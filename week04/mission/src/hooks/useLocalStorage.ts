import { useState } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const readValue = () => {
    try {
      const item = localStorage.getItem(key);

      if (item === null) return initialValue;
      try {
        return JSON.parse(item);
      } catch {
        return item as unknown as T;
      }
    } catch {
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = (value: T) => {
    try {
      const valueToStore =
        typeof value === "string" ? value : JSON.stringify(value);
      setStoredValue(value);
      localStorage.setItem(key, valueToStore);
    } catch {
      // 저장 실패 무시
    }
  };

  return [storedValue, setValue] as const;
}
