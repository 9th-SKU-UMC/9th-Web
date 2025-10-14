import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const save = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  const remove = () => {
    setValue(initialValue);
    localStorage.removeItem(key);
  };

  return [value, save, remove] as const;
}

export default useLocalStorage;
