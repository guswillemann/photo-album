import clsx from 'clsx';
import { FC, MouseEvent as ReactMouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { IconButton, ScrollLock } from '..';
import styles from './styles.module.scss';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleModalClick = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target instanceof HTMLElement && e.target.id === 'modal-container') onClose();
  };

  return createPortal((
      <>
        <ScrollLock />
        <IconButton
          className={styles.closeBtn}
          onClick={onClose}
          iconSrc="/icons/x.svg"
          iconAlt="Letter X"
          aria-label="Close modal"
        />
        <div className={clsx([
            styles.wrapper,
            isOpen && styles.open
          ])}
          id="modal-container"
          onClick={handleModalClick}
        >
          {children}
        </div>
      </>
    ),
    document.getElementById('__next') as HTMLDivElement
  );
};

export default Modal;