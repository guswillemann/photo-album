import SettingsPanel from './SettingsPanel';
import styles from './styles.module.scss';
import ThemeForm from './ThemeForm';

export default function Header() {
  return (
    <header className={styles.wrapper}>
      <div className={styles.headerContent}>
        <img
          width="85"
          height="40"
          src="/images/logo.svg"
          alt="Photo Album Logo"
          className={styles.logo}
        />
        <ThemeForm />
        <SettingsPanel />
      </div>
    </header>
  );
}
