import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface ToggleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isStateOne: boolean;
  icons?: {
    stateOne: {
      src: string;
      alt: string;
    }
    stateTwo: {
      src: string;
      alt: string;
    }
  };
};

const defaultIcons = {
  stateOne: {
    src: '/icons/on.svg',
    alt: 'State On Icon'
  },
  stateTwo: {
    src: '/icons/off.svg',
    alt: 'State Off Icon'
  },
};

const ToggleButton = ({
  className,
  isStateOne,
  icons = defaultIcons,
  ...props
}: ToggleButtonProps) => {
  return (
    <button
      type="button"
      className={clsx([
        styles.wrapper,
        isStateOne ? styles.stateOne : styles.stateTwo, 
        className,
      ])}
      {...props}
      data-testid='toggleBtn'
    >
      <img
        className={clsx(
          icons === defaultIcons && styles.defaultIcons
        )}
        src={icons.stateOne.src}
        alt={icons.stateOne.alt}
        width="25"
        height="25"
      />
      <img
        className={clsx(
          icons === defaultIcons && styles.defaultIcons
        )}
        src={icons.stateTwo.src}
        alt={icons.stateTwo.alt}
        width="25"
        height="25"
      />
    </button>
  );
}

export default ToggleButton;
