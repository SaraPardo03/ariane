import React, { createContext, useContext, useState } from 'react';
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('concentration');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'concentration' : 'light';
    setTheme(newTheme);

    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    // Appliquer le thème sélectionné en tant qu'attribut 'data-theme' sur <html> ou <body>
    //document.documentElement.set('data-theme', newTheme);
  };
  document.documentElement.classList.add(theme);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
