import clsx from 'clsx';
import { FC, MouseEvent as ReactMouseEvent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IconButton, ScrollLock } from '..';
import styles from './styles.module.scss';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isClosing) return;
    const timeoutCallback = () => {
      onClose();
      setIsClosing(false);
    };

    const timeoutId = setTimeout(timeoutCallback, 500);
    return () => clearTimeout(timeoutId);
  }, [isClosing, onClose, setIsClosing]);

  if (!isOpen) return null;

  const handleModalClick = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target instanceof HTMLElement && e.target.id === 'modal-container') {
      setIsClosing(true);
    }
  };

  const handleCloseBtnClick = () => setIsClosing(true);

  return createPortal((
    <div
      className={clsx([
        styles.modalContainer,
        isClosing && styles.closing,
      ])}
      id="modal-container"
      onClick={handleModalClick}
      data-testid="modalContainer"
    >
      <IconButton
        className={styles.closeBtn}
        onClick={handleCloseBtnClick}
        iconSrc="/icons/x.svg"
        iconAlt="Letter X"
        aria-label="Close modal"
        data-testid="closeModalBtn"
      />
      {!isClosing && <ScrollLock />}
      {children}
    </div>
  ),
  document.getElementById('__next') as HTMLDivElement
)};

export default Modal;