import { FC } from 'react';
import Image from 'next/image';
import { PhotoData } from '../..';
import styles from './styles.module.scss';
import { Link } from '../../..';

type PhotoDetailsProps = {
  photoData: PhotoData;
};

const PhotoDetails: FC<PhotoDetailsProps> = ({ photoData }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div>
          <span>Photographer</span>
          <p className={styles.photographerName}>
            <Link
              href={photoData.photographer_url}
              rel="noopener"
              target="_blank"
              color="primary"
            >
              {photoData.photographer}
            </Link>
          </p>
        </div>
        <div>
          <span>
            Photo info
          </span>
          <p>resolution: {photoData.width} x {photoData.height} (px)</p>
          <Link
            href={photoData.url}
            rel="noopener"
            target="_blank"
            color="primary"
          >
            Pexels page
          </Link>
        </div>
      </div>
      <div className={styles.photoContainer}>
        <Image
          src={photoData.src.large2x}
          width={photoData.width}
          height={photoData.height}
          alt={`Photo by ${photoData.photographer}`}
          placeholder="blur"
          blurDataURL={photoData.src.large}
        />
      </div>
    </div>
  );
};

export default PhotoDetails;