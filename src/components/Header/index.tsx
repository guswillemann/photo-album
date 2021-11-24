import Image from 'next/image';
import { Input, ThemeToggle } from '..';
import styles from './styles.module.scss';


export default function Header() {
  return (
    <header className={styles.wrapper}>
      <Image
        src="/images/logo.svg"
        alt="Photo Album Logo"
        width={85}
        height={40}
      />
      <Input
        className={styles.filterInput}
        placeholder="Filter text"
      />
      <ThemeToggle />
    </header>
  );
}
