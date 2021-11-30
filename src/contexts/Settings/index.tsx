import { createContext, FC, useEffect } from 'react';
import { useToggle } from '../../hooks';

type SettingsContextValue = {
  isAutoLoad: boolean;
  toggleAutoLoad: () => void;
  isThemeLight: boolean;
  toggleTheme: () => void;
};

export const SettingsContext = createContext({} as SettingsContextValue);

const SettingsProvider: FC = ({ children }) => {
  const [isAutoLoad, toggleAutoLoad] = useToggle(true);
  const [isThemeLight, toggleTheme] = useToggle(true);

  useEffect(() => {
    document.body.dataset.theme = isThemeLight ? 'light' : 'dark';
  }, [isThemeLight]);
  
  return (
    <SettingsContext.Provider value={{
      isAutoLoad,
      toggleAutoLoad,
      isThemeLight,
      toggleTheme,
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;
