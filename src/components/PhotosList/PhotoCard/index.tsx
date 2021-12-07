import Image from 'next/image';
import { Modal } from '../..';
import { useToggle } from '../../../hooks';
import { Photo } from '../../../types';
import PhotoDetails from './PhotoDetails';
import styles from './styles.module.scss';

type PhotoProps = {
  photoData: Photo;
};

export default function PhotoCard({ photoData }: PhotoProps) {
  const [isModalOpen, toggleModal] = useToggle(false);

  return (
    <li
      className={styles.wrapper}
    >
      <button onClick={toggleModal}>
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
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
      >
        <PhotoDetails photoData={photoData} /> 
      </Modal>
    </li>
  );
}
