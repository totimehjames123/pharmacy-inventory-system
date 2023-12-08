import { useState, useEffect } from 'react';

const useTheme = () => {
  const [isLightMode, setIsLightMode] = useState(true);

  useEffect(() => {
    // Retrieve theme from localStorage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme !== null) {
      // If theme is stored in localStorage, set it in state
      setIsLightMode(storedTheme === 'light');
    }
  }, []);

  const toggleThemeMode = () => {
    // Toggle theme mode
    setIsLightMode((prevMode) => !prevMode);
  
    // Store the updated theme mode in localStorage
    localStorage.setItem('theme', !isLightMode ? 'dark' : 'light');
  };
  

  return { isLightMode, toggleThemeMode };
};

export default useTheme;
