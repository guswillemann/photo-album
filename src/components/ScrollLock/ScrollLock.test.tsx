import ScrollLock from '.';
import { render } from '@testing-library/react';

describe('Component: <ScrollLock />', () => {
  const scrollLock = render(<ScrollLock />);
  const body = scrollLock.baseElement;

  describe('when rendered', () => {
    it('should set body attribute "data-scroll" to "lock"', () => {
      expect(body.getAttribute('data-scroll')).toEqual('lock');
    })
  })

  describe('when unmounted', () => {
    it('should set body attribute "data-scroll" to an empty string', () => {
      scrollLock.unmount()
      expect(body.getAttribute('data-scroll')).toEqual('');
    })
  })
})