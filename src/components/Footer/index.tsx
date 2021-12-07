import clsx from 'clsx';
import { useState } from 'react';
import { IconButton, Link } from '..';
import styles from './styles.module.scss';

const guswillemannLinks = {
  guswillemann: 'http://gustavowillemann.com/',
  github: 'https://github.com/guswillemann',
  linkedin: 'https://www.linkedin.com/in/gustavo-willemann/',
};

const leadsterUrl = 'https://leadster.com.br/';
const pexelsUrl = 'https://www.pexels.com/';

export default function Footer() {
  const [isShowing, setIsShowing] = useState(false);

  const Leadster = <Link target="_blank" rel="noopener" href={leadsterUrl}>Leadster</Link>;
  const Pexels = <Link target="_blank" rel="noopener" href={pexelsUrl}>Pexels</Link>;
  
  const handleClick = () => setIsShowing((old) => !old);

  return (
    <footer className={clsx([
      styles.wrapper,
      isShowing && styles.show,
    ])}>
      <IconButton onClick={handleClick} iconSrc="/icons/chevron.svg" iconAlt="up-arrow" />
      <div className={styles.footerContent}>
        <div className={styles.footerColumn}>
          <p>
             {Leadster} Front-End Activity
          </p>
          <p>
            Photos provided by {Pexels}
          </p>
        </div>
        <div className={styles.footerColumn}>
          <p>Created by Gustavo Willemann</p>
          <div className={styles.guswillemannLinks}>
            {Object.entries(guswillemannLinks).map(([name, url]) => (
              <Link key={name} target="_blank" rel="noopener" href={url}>
                <img
                  width="30"
                  height="30"
                  src={`/icons/${name}.svg`}
                  alt={`${name} Icon`}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
