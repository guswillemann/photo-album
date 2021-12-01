import { createContext, FC, useEffect } from 'react';
import { useToggle } from '../../hooks';

type SettingsContextValue = {
  isAutoLoad: boolean;
  toggleAutoLoad: () => void;
  isThemeLight: boolean;
  toggleTheme: () => void;
};

const autoLoadStoreKey = 'autoLoad';
const themeStoreKey = 'theme';

export const SettingsContext = createContext({} as SettingsContextValue);

const SettingsProvider: FC = ({ children }) => {
  const [isAutoLoad, toggleAutoLoad] = useToggle(true);
  const [isThemeLight, toggleTheme] = useToggle(true);

  useEffect(() => {
    const storeAutoLoad = localStorage.getItem(autoLoadStoreKey);
    const storeTheme = localStorage.getItem(themeStoreKey);

    if (storeAutoLoad !== 'true') toggleAutoLoad();
    if (storeTheme !== 'light') toggleTheme();
  }, [toggleTheme, toggleAutoLoad]);

  useEffect(() => {
    const newTheme = isThemeLight ? 'light' : 'dark';
    document.body.dataset.theme = newTheme;
    localStorage.setItem(themeStoreKey, newTheme);
  }, [isThemeLight]);
  
  useEffect(() => {
    const newAutoLoad = JSON.stringify(isAutoLoad);
    localStorage.setItem(autoLoadStoreKey, newAutoLoad);
  }, [isAutoLoad]);
  
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
