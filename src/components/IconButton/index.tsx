import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconSrc: string;
  iconAlt: string;
}

export default function IconButton({className, iconSrc, iconAlt, ...props }: IconButtonProps) {
  return (
    <button className={clsx([
      styles.wrapper,
      className
    ])} {...props}>
      <img width="30" height="30" src={iconSrc} alt={iconAlt} />
    </button>
  );
}
