import clsx from 'clsx';
import { IconButton, Input, Button } from '../..';
import { useDropdown } from '../../../hooks';
import styles from './styles.module.scss';

export default function ThemeForm() {
  const [isThemeInfoVisible, toggleThemeInfo, themeForm] = useDropdown<HTMLFormElement>(false);

  return (
    <form ref={themeForm} className={styles.themeForm}>
      <Input
        name="theme"
        placeholder="Theme text"
      />
      <div className={styles.formButtons}>
        <Button
          type="submit"
          variant="textOnly"
        >
          Submit
        </Button>
        <IconButton
          type="button"
          iconSrc="/icons/info.svg"
          iconAlt="Icon with the letter I in a circle"
          onClick={toggleThemeInfo}
        />
      </div>
      <div className={clsx([styles.themeInfo, isThemeInfoVisible && styles.visible])}>
        <p>{"It's possible to filter the photos using keywords like: 'Nature', 'Tigers', 'People'. Or it could be something specific like 'Group of people working.'"}</p>
      </div>
    </form>
  );
}