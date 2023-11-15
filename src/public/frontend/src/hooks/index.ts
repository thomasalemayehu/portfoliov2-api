import { useState } from "react";

const useStorage = <T>(key: string, initialValue: T) => {
  // Retrieve data from sessionStorage on initial render
  const storedValue = sessionStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  // State to manage the current value
  const [value, setValue] = useState<T>(initial);

  // Save the value to sessionStorage whenever it changes
  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    sessionStorage.setItem(key, JSON.stringify(newValue));
  };

  // Clear the value from sessionStorage
  const clearStoredValue = () => {
    setValue(initialValue);
    sessionStorage.removeItem(key);
  };

  return [value, setStoredValue, clearStoredValue] as const;
};

export { useStorage };
