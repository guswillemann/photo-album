import { IconButton } from '../..';
import { useDropdown } from '../../../hooks';
import SettingsDropdown from './SettingsDropdown';
import styles from './styles.module.scss';

export default function SettingsPanel() {
  const [isSettingsVisible, toggleSettings, settingsDiv] = useDropdown<HTMLDivElement>(false);

  return (
    <div ref={settingsDiv} className={styles.settingsContainer}>
      <IconButton
        aria-label="Toggle settings panel"
        iconSrc="/icons/gear.svg"
        iconAlt="Gear Icon"
        onClick={toggleSettings}
      />
      <SettingsDropdown isVisible={isSettingsVisible} />
    </div>
  );
}