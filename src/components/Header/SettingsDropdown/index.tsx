import clsx from 'clsx';
import { ToggleButton } from '../..';
import { useToggle } from '../../../hooks';
import styles from './styles.module.scss';

type SettingsDropdownProps = {
  isVisible: boolean;
};

export default function SettingsDropdown({ isVisible }: SettingsDropdownProps) {
  const [isAutoLoad, toggleAutoLoad] = useToggle(true);
  const [isThemeLight, toggleTheme] = useToggle(true);

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
          iconsSrc={{
            stateOne: '/icons/sun.svg',
            stateTwo: '/icons/moon.svg',
          }}
        />
      </div>
    </section>
  );
}