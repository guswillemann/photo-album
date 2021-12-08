import { useEffect, useRef } from 'react';

export default function useOutsideClick<T extends HTMLElement>(
  callback: () => void,
  shouldAddListener = true,
) {
  const containerRef = useRef<T>(null);
  useEffect(() => {
    if (!shouldAddListener) return;
    
    const eventCallback = (e: MouseEvent | FocusEvent) => {
      if (
        containerRef.current 
        && e.target instanceof HTMLElement
        && !containerRef.current.contains(e.target)
      ) {
        callback();
      }
    };
    
    document.addEventListener('mousedown', eventCallback);
    document.addEventListener('focusin', eventCallback);
    
    return () => {
      document.removeEventListener('mousedown', eventCallback);
      document.removeEventListener('focusin', eventCallback);
    }
  }, [containerRef, callback, shouldAddListener]);

  return [containerRef];
}