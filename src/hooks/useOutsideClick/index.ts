import { useEffect, useRef } from 'react';

export default function useOutsideClick<T extends HTMLElement>(callback: () => void) {
  const containerRef = useRef<T>(null);
  useEffect(() => {
    const verifyClick = (e: MouseEvent) => {
      if (
        containerRef.current 
        && e.target instanceof HTMLElement
        && !containerRef.current.contains(e.target)
      ) {
        callback();
      }
    };
    document.addEventListener('mousedown', verifyClick);
    return () => document.removeEventListener('mousedown', verifyClick);
  }, [containerRef, callback]);

  return [containerRef];
}