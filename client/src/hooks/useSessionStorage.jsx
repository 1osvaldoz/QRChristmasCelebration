import { useState } from "react";

export function useSessionStorage(key, initialValue) {
  const [storedValue, setValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setSessionStorage = (value) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
      setValue(value);
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setSessionStorage];
}