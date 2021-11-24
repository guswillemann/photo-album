import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';
import styles from './styles.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
  return (
    <input className={clsx([styles.wrapper, className])} {...props} />
  );
}
