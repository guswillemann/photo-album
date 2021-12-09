import clsx from 'clsx';
import { FC, MouseEvent as ReactMouseEvent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IconButton, ScrollLock } from '..';
import { useToggle } from '../../hooks';
import styles from './styles.module.scss';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
  const [isClosing, toggleIsClosing] = useToggle(false);

  useEffect(() => {
    if (!isClosing) return;
    const timeoutCallback = () => {
      onClose();
      toggleIsClosing();
    };

    const timeoutId = setTimeout(timeoutCallback, 500);
    return () => clearTimeout(timeoutId);
  }, [isClosing, onClose, toggleIsClosing]);

  const handleModalClick = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isClosing) return;
    if (e.target instanceof HTMLElement && e.target.id === 'modal-container') toggleIsClosing();
  };

  if (!isOpen) return null;
  return createPortal((
    <div
      className={clsx([
        styles.modalContainer,
        isClosing && styles.closing,
      ])}
      id="modal-container"
      onClick={handleModalClick}
    >
      <IconButton
        className={styles.closeBtn}
        onClick={onClose}
        iconSrc="/icons/x.svg"
        iconAlt="Letter X"
        aria-label="Close modal"
      />
      <ScrollLock />
      {children}
    </div>
  ),
  document.getElementById('__next') as HTMLDivElement
)};

export default Modal;