"use client"
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(undefined);

  // Toggle Theme
  const toggleTheme = () => {
    // Ensure theme is not undefined before toggling
    const currentTheme = theme === undefined ? "light" : theme; // Fallback if theme is still undefined
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light")
    }
    // document.body.setAttribute("data-bs-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (theme !== undefined) {
      document.body.setAttribute("data-bs-theme", theme);
    }
  })

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}