import { AnchorHTMLAttributes, FC } from 'react';
import NextLink from 'next/link';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  color?: 'primary' | 'secondary';
}

const Link: FC<LinkProps> = ({
  children,
  className,
  color = 'secondary',
  href,
  ...props
}) => (
  <NextLink href={href}>
    <a
      className={clsx([
        styles.wrapper,
        styles[`${color}Color`],
        className
      ])}
      {...props}
    >
      {children}
    </a>
  </NextLink>
);

export default Link;
