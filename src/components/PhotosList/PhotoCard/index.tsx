import Image from 'next/image';
import { PhotoData } from '..';
import { Modal } from '../..';
import { useToggle } from '../../../hooks';
import PhotoDetails from './PhotoDetails';
import styles from './styles.module.scss';

type PhotoProps = {
  photoData: PhotoData;
};

export default function PhotoCard({ photoData }: PhotoProps) {
  const [isModalOpen, toggleModal] = useToggle(false);

  return (
    <>
      <li
        onClick={toggleModal}
        className={styles.wrapper}
        role="button"
      >
        <Image
          src={photoData.src.large}
          width={photoData.width}
          height={photoData.height}
          alt={`Photo by ${photoData.photographer}`}
          placeholder="blur"
          blurDataURL={photoData.src.small}
        />
        <div className={styles.info}>
          <span>Photographer:</span>
          <p>{photoData.photographer}</p>
        </div>
      </li>
      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
      >
        <PhotoDetails photoData={photoData} /> 
      </Modal>
    </>
  );
}
