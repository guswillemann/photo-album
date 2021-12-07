import clsx from 'clsx';
import { ToggleButton } from '../../..';
import { useSettingsContext } from '../../../../hooks';
import styles from './styles.module.scss';

type SettingsDropdownProps = {
  isVisible: boolean;
};

export default function SettingsDropdown({ isVisible }: SettingsDropdownProps) {
  const {
    isAutoLoad,
    toggleAutoLoad,
    isThemeLight,
    toggleTheme
  } = useSettingsContext();

  return (
    <section className={clsx([
      styles.wrapper,
      isVisible && styles.visible,
    ])}>
      <div className={styles.option}>
        <span>Auto Load Photos</span>
        <ToggleButton
          aria-label="Toggle photos auto load"
          role="switch"
          isStateOne={isAutoLoad}
          onClick={toggleAutoLoad}
        />
      </div>
      <div className={styles.option}>
        <span>Theme Mode</span>
        <ToggleButton
          aria-label="Toggle the Theme mode"
          role="switch"
          isStateOne={isThemeLight}
          onClick={toggleTheme}
          icons={{
            stateOne: {
              src: '/icons/sun.svg',
              alt: 'Sun Icon',
            },
            stateTwo: {
              src: '/icons/moon.svg',
              alt: 'Moon Icon',
            },
          }}
        />
      </div>
    </section>
  );
}