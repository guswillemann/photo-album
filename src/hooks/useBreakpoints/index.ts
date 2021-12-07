import { useEffect, useState } from 'react';

type ScreenSize = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
type Breakpoint = [ScreenSize, number];

const breakpoints: Breakpoint[] = [
  ['xxl', 1400],
  ['xl', 1200],
  ['lg', 992],
  ['md', 768],
  ['sm', 576],
  ['xs', 0],
];

function findBreakpoint(screenWidth: number) {
  const breakpoint = breakpoints.find(([name, minWidth]) => screenWidth >= minWidth);
  if (!breakpoint) return 'xs';
  return breakpoint[0];
}

export default function useBreakpoints() {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => setScreenWidth(window.innerWidth), []);

  useEffect(() => {
    const callback = () => setScreenWidth(window.innerWidth);

    window.addEventListener('resize', callback )
    return () => window.removeEventListener('resize', callback)
  }, []);
  
  const currentBreakpoint = findBreakpoint(screenWidth);

  return currentBreakpoint;
}