import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SettingsPanel from '.';

const containerClass = /\bsettingsContainer\b/;

describe('Component: <SettingsPanel />', () => {
  beforeEach(() => {
    render(<SettingsPanel />);
  })

  afterEach(() => {
    jest.resetAllMocks();
  })

  it('should have the proper className', () => {
    const settingsContainer = screen.getByTestId('settingsContainer');

    expect(settingsContainer.className).toMatch(containerClass);
  })  

  it('should render a button and the SettingsDropdown', () => {
    const iconBtnImg = screen.queryByAltText('Gear Icon');
    const settingsDropdown = screen.queryByTestId('settingsDropdown');

    expect(iconBtnImg).toBeInTheDocument();
    expect(settingsDropdown).toBeInTheDocument();
  })

  it('should be able to toggle the dropdown visibility', () => {
    const dropdown = screen.getByTestId('settingsDropdown');
    const iconBtnImg = screen.getByAltText('Gear Icon');
    const visibleClass = /\bvisible\b/;
    
    expect(dropdown.className).not.toMatch(visibleClass);
    
    userEvent.click(iconBtnImg);
    
    expect(dropdown.className).toMatch(visibleClass);
    
    userEvent.click(iconBtnImg);
    
    expect(dropdown.className).not.toMatch(visibleClass);
  });
})
