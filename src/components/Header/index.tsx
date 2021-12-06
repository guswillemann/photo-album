import Image from 'next/image';
import SettingsPanel from './SettingsPanel';
import styles from './styles.module.scss';
import ThemeForm from './ThemeForm';

export default function Header() {
  return (
    <header className={styles.wrapper}>
      <div className={styles.headerContent}>
        <Image
          src="/images/logo.svg"
          alt="Photo Album Logo"
          width={85}
          height={40}
        />
        <ThemeForm />
        <SettingsPanel />
      </div>
    </header>
  );
}
