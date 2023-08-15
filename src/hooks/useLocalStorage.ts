import { useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item
        ? typeof item === 'object'
          ? JSON.parse(item)
          : item
        : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(
        key,
        typeof value !== 'string' ? JSON.stringify(value) : value,
      );
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};
