import { render, screen } from '@testing-library/react';
import PhotoDetails from '.';

const photoData = {
  id: '0',
  url: '/url0',
  width: 400,
  height: 100,
  photographer: 'photographer0',
  photographer_url: '/photographer0Url',
  src: {
    portrait: '/portrait',
    landscape: '/landscape',
    tiny: '/tiny',
    small: '/small',
    medium: '/medium',
    large: '/large',
    large2x: '/large2x',
    original: '/original',
  }
}

describe('Component: <PhotoDetails />', () => {
  beforeEach(() => {
    render(<PhotoDetails photoData={photoData} />);
  })

  it('should render the photo', () => {
    const photo = screen.queryByAltText(`Photo by ${photoData.photographer}`);

    expect(photo).toBeInTheDocument();
  })

  describe('the photographer info', () => {
    it('should have a link to the photographer Pexels page', () => {
      const photogapherLink = screen.queryByText(photoData.photographer);
  
      expect(photogapherLink).toBeInTheDocument();
      expect(photogapherLink?.getAttribute('href')).toBe(photoData.photographer_url);
    })
  })
  
  describe('the photo info', () => {
    it('should display the photo resolution', () => {
      const text = `resolution: ${photoData.width} x ${photoData.height} (px)`
      const resolution = screen.queryByText(text);

      expect(resolution).toBeInTheDocument();
    })

    it('should have a link to the photo Pexels page', () => {
      const photoLink = screen.queryByText('Pexels page');
  
      expect(photoLink).toBeInTheDocument();
      expect(photoLink?.getAttribute('href')).toBe(photoData.url);
    })
  })
})