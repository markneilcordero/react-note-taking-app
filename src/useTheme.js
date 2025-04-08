import { useEffect, useState } from "react";

const THEME_KEY = "preferred_theme";

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Load from localStorage or default to light
    return localStorage.getItem(THEME_KEY) || "light";
  });

  // Apply theme to <html> and persist it
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Toggle function
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
};

export default useTheme;
