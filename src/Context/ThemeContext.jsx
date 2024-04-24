// ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
// Créez un contexte de thème
const ThemeContext = createContext();

// Créez un fournisseur de thème
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("themeConcentration");

  useEffect(() => {
    import(`../sass/${theme}.scss`).then(() => {
      console.log(`Loaded theme ${theme}`);
    }).catch((error) => {
      console.error(`Erreur ${theme}`, error);
    });
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(theme === "concentration" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
