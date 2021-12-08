import { RefObject, useCallback } from 'react';
import { useOutsideClick, useToggle } from '..';

export default function useDropdown<T extends HTMLElement>(
  defaultState: boolean
): [boolean, () => void, RefObject<T>] {
  const [isOpen, toggleIsOpen] = useToggle(defaultState);
  
  const outsideClickCallback = useCallback(() => {
    if(isOpen) toggleIsOpen()
  }, [isOpen, toggleIsOpen])

  const [containerRef] = useOutsideClick<T>(outsideClickCallback, isOpen);

  return [isOpen, toggleIsOpen, containerRef];
}