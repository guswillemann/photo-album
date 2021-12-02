import { useEffect } from 'react';

const ScrollLock = () => {
  useEffect(() => {
    document.body.dataset.scroll = 'lock';
    return () => {
      document.body.dataset.scroll = undefined
    };
  }, []);

  return null;
}

export default ScrollLock;