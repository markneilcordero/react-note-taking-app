import { useState, useEffect } from "react";

/**
 * useLocalStorage Hook
 * @param {string} key - The localStorage key to use
 * @param {*} initialValue - Default value if no existing value found
 */
const useLocalStorage = (key, initialValue) => {
  // Load value from localStorage (or use initialValue)
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.error("useLocalStorage error:", error);
      return initialValue;
    }
  });

  // Save to localStorage on value change
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
