import clsx from 'clsx';
import { ButtonHTMLAttributes, FC } from 'react';
import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'textOnly';
  color?: 'primary' | 'secondary';
};

const Button: FC<ButtonProps> = ({
  children,
  color = 'primary',
  className,
  variant = 'default',
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx([
        styles.wrapper,
        styles[variant],
        styles[`${color}-color`],
        className,
      ])}
    >
      {children}
    </button>
  );
};

export default Button;
