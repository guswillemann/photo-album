import Image from 'next/image';
import { PhotoData } from '..';
import { IconButton } from '../..';
import styles from './styles.module.scss';

type PhotoProps = {
  photoData: PhotoData;
};

export default function PhotoCard({ photoData }: PhotoProps) {
  return (
    <li className={styles.wrapper}>
      <Image
        src={photoData.src.large}
        width={photoData.width}
        height={photoData.height}
        alt={`Photo by ${photoData.photographer}`}
        placeholder="blur"
        blurDataURL={photoData.src.small}
      />
      <IconButton
        className={styles.zoomBtn}
        iconSrc="/icons/magnifier.svg"
        iconAlt="Zoom button - Magnifier"
      />
      <div className={styles.info}>
        <span>Photographer:</span>
        <p>{photoData.photographer}</p>
      </div>
    </li>
  );
}
