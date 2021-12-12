import { getByTestId, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PhotoCard from '.';

const testContainer = document.createElement('div');
testContainer.setAttribute('id', '__next');

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

describe('Component: <PhotoCard />', () => {
  beforeEach(() => {
    render(<PhotoCard photoData={photoData} />, {
      container: document.body.appendChild(testContainer),
    });
  })

  describe('when rendered', () => {
    it('should have the proper container className', () => {
      const container = screen.getByTestId('photoCard');

      expect(container.className).toBe('photoCardContainer');
    })

    it('should have the image element', () => {
      const imageEl = screen.queryByAltText(`Photo by ${photoData.photographer}`);

      expect(imageEl).toBeInTheDocument();
    })

    it('should have the photographer name', () => {
      const photographer = screen.getByText(photoData.photographer);

      expect(photographer).toBeInTheDocument();
    })
  })

  describe('when clicked', () => {
    it('should open a modal with the <PhotoDetails />', () => {
      const photoCardBtnEl = screen.getByTestId('photoCardBtn');
      const getModal = () => screen.queryByText('Photo info');
      
      expect(getModal()).not.toBeInTheDocument();
      
      userEvent.click(photoCardBtnEl)
      
      expect(getModal()).toBeInTheDocument();
    })
  })
})