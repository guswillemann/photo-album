import { useEffect, useReducer } from 'react';

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

const reducer = () => findBreakpoint(window.innerWidth);

export default function useBreakpoints() {
  const [currentBreakpoint, updateBreakpoint] = useReducer(reducer, 'xs');

  useEffect(() => {
    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);
  
  return { currentBreakpoint };
}