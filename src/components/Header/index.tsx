import clsx from 'clsx';
import Image from 'next/image';
import { IconButton, Input } from '..';
import { useDropdown } from '../../hooks';
import SettingsDropdown from './SettingsDropdown';
import styles from './styles.module.scss';

export default function Header() {
  const [isFilterInfoVisible, toggleFilterInfo, filterForm] = useDropdown<HTMLFormElement>(false);
  const [isSettingsVisible, toggleSettings, settingsDiv] = useDropdown<HTMLDivElement>(false);

  return (
    <header className={styles.wrapper}>
      <div className={styles.headerContent}>
        <Image
          src="/images/logo.svg"
          alt="Photo Album Logo"
          width={85}
          height={40}
        />
        <form ref={filterForm}>
          <Input
            name="theme"
            className={styles.filterInput}
            placeholder="Theme text"
          />
          <IconButton
            className={styles.infoBtn}
            type="button"
            iconSrc="/icons/info.svg"
            iconAlt="Icon with the letter I in a circle"
            onClick={toggleFilterInfo}
          />
          <div className={clsx([styles.filterInfo, isFilterInfoVisible && styles.visible])}>
            <p>{"It's possible to filter the photos using keywords like: 'Nature', 'Tigers', 'People'. Or it could be something specific like 'Group of people working.'"}</p>
          </div>
        </form>
        <div ref={settingsDiv} className={styles.settingsContainer}>
          <IconButton
            aria-label="Toggle settings panel"
            iconSrc="/icons/gear.svg"
            iconAlt="Gear Icon"
            onClick={toggleSettings}
          />
          <SettingsDropdown isVisible={isSettingsVisible} />
        </div>
      </div>
    </header>
  );
}
