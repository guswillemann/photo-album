import clsx from 'clsx';
import { ButtonHTMLAttributes, FC } from 'react';
import styles from './styles.module.scss';

interface ToggleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isStateOne: boolean;
  iconsSrc?: {
    stateOne: string;
    stateTwo: string;
  };
};

const defaultIconsSrc = {
  stateOne: '/icons/on.svg',
  stateTwo: '/icons/off.svg',
};

const ToggleButton = ({
  className,
  isStateOne,
  iconsSrc = defaultIconsSrc,
  ...props
}: ToggleButtonProps) => {
  return (
    <button
      className={clsx([
        styles.wrapper,
        isStateOne ? styles.stateOne : styles.stateTwo, 
        className,
      ])}
      {...props}
    >
      <img src={iconsSrc.stateOne} alt="Icon state " />
      <img src={iconsSrc.stateTwo} alt="Icon state " />
    </button>
  );
}

export default ToggleButton;
