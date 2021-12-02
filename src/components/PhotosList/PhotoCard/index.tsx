import Image from 'next/image';
import { PhotoData } from '..';
import { IconButton, Modal } from '../..';
import { useToggle } from '../../../hooks';
import PhotoDetails from './PhotoDetails';
import styles from './styles.module.scss';

type PhotoProps = {
  photoData: PhotoData;
};

export default function PhotoCard({ photoData }: PhotoProps) {
  const [isModalOpen, toggleModal] = useToggle(false);

  return (
    <li className={styles.wrapper}>
      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
      >
        <PhotoDetails photoData={photoData} /> 
      </Modal>
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
        onClick={toggleModal}
      />
      <div className={styles.info}>
        <span>Photographer:</span>
        <p>{photoData.photographer}</p>
      </div>
    </li>
  );
}
