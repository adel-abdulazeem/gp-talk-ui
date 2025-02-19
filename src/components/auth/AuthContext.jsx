import React, { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) return savedMode === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(storedAuth);
    
    // Apply dark mode class to root element
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  const login = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };
  const logout = () => {
    localStorage.removeItem("isAuthenticated"); // Remove authentication status
    setIsAuthenticated(false);
  };

        const value = {
          isAuthenticated,
          login,
          logout,
          darkMode,
          toggleDarkMode
        };
  return (
    <AuthContext.Provider value={value}>
      <div className={darkMode ? "dark" : ""}>
        {children}
      </div>
    </AuthContext.Provider>
  );
};