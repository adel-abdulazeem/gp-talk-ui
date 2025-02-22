import React, { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) return savedMode === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedLogin = localStorage.getItem('isAuthenticated')
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedLogin) {
      setIsAuthenticated(true);
    }
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode, isAuthenticated]);
  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  const login = (userData) => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  };
  


  const value = {
    isAuthenticated,
    login,
    logout,
    darkMode,
    toggleDarkMode,
    user
  };

  return (
    <AuthContext.Provider value={value}>
      <div className={darkMode ? "dark" : ""}>
        {children}
      </div>
    </AuthContext.Provider>
  );
};