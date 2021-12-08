import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconSrc: string;
  iconAlt: string;
  iconWidth?: number;
  iconHeight?: number;
}

export default function IconButton({
  className,
  iconSrc,
  iconAlt,
  iconWidth = 30,
  iconHeight = 30,
  ...props
}: IconButtonProps) {
  return (
    <button className={clsx([
      styles.wrapper,
      className
    ])} {...props}>
      <img width={iconWidth} height={iconHeight} src={iconSrc} alt={iconAlt} />
    </button>
  );
}
