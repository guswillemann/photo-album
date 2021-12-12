import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FC } from 'react';
import SettingsDropdown from '.';
import { SettingsContext } from '../../../../contexts';

const toggleAutoLoadMock = jest.fn();
const toggleThemeMock = jest.fn();

const SettingsProviderMock: FC = ({ children }) => {
  return (
    <SettingsContext.Provider value={{
      isAutoLoad: true,
      toggleAutoLoad: toggleAutoLoadMock,
      isThemeLight: true,
      toggleTheme: toggleThemeMock,
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

const containerClass = /\bsettingsDropdownContainer\b/;
const visibleClass = /\bvisible\b/;
const optionClass = /\boption\b/;

describe('Component <SettingsDropdown />', () => {
  describe('when not visible', () => {
    beforeEach(() => {
      render(<SettingsDropdown isVisible={false} />);
    })

    it('should not have the proper className "visible"', () => {
      const settingsDropdown = screen.getByTestId('settingsDropdown');

      expect(settingsDropdown.className).toMatch(containerClass);
      expect(settingsDropdown.className).not.toMatch(visibleClass);
    })
  })

  describe('when visible', () => {
    beforeEach(() => {
      render(<SettingsDropdown isVisible={true} />, {
        wrapper: SettingsProviderMock,
      });
    })

    afterEach(() => {
      jest.resetAllMocks();
    })

    it('should have the className "visible"', () => {
      const settingsDropdown = screen.getByTestId('settingsDropdown');

      expect(settingsDropdown.className).toMatch(containerClass);
      expect(settingsDropdown.className).toMatch(visibleClass);
    })

    it('should have the AutoLoad option', () => {
      const autoLoadText = screen.getByText('Auto Load Photos');
      const autoLoadToggle = autoLoadText.nextElementSibling;

      expect(autoLoadText.parentElement?.className).toMatch(optionClass);
      
      expect(autoLoadToggle).toBeInTheDocument();
      expect(autoLoadToggle?.getAttribute('role')).toBe('switch');
      expect(autoLoadToggle?.getAttribute('aria-label')).toBeTruthy();

      expect(toggleAutoLoadMock).toBeCalledTimes(0);
      
      if (autoLoadToggle) userEvent.click(autoLoadToggle);
      
      expect(toggleAutoLoadMock).toBeCalledTimes(1);
    })

    it('should have the Theme option', () => {
      const themeModeText = screen.getByText('Theme Mode');
      const themeModeToggle = themeModeText.nextElementSibling;

      expect(themeModeText.parentElement?.className).toMatch(optionClass);
      
      expect(themeModeToggle).toBeInTheDocument();
      expect(themeModeToggle?.getAttribute('role')).toBe('switch');
      expect(themeModeToggle?.getAttribute('aria-label')).toBeTruthy();

      expect(toggleThemeMock).toBeCalledTimes(0);
      
      if (themeModeToggle) userEvent.click(themeModeToggle);
      
      expect(toggleThemeMock).toBeCalledTimes(1);
    })
  })
})
