import { render, screen } from '@testing-library/react';
import PhotoList from '.';

const screenWidthMap = {
  'xxl': 1400,
  'xl': 1200,
  'lg': 992,
  'md': 768,
  'sm': 576,
  'xs': 0,
};

const createPhotoData = (amount: number) => {
  const data = [];

  for (let i = 0 ; i < amount ; i = i + 1) {
    data.push({
      id: i.toString(),
      url: `/url${i}`,
      width: 400,
      height: 100,
      photographer: `photographer${i}`,
      photographer_url: `/photographer${i}Url`,
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
    });
  }

  return data;
};

type PhotoListRenderArgs = {
  photosAmount?: number;
  screenSize?: keyof typeof screenWidthMap
};

const photoListRender = ({ photosAmount = 8, screenSize = 'xs'}: PhotoListRenderArgs) => {
  if (screenSize) window.innerWidth = screenWidthMap[screenSize];
  const data = createPhotoData(photosAmount);
  render(<PhotoList photoDataArr={data} />);  
}

describe('Component: <PhotoList />', () => {
  it('should have the proper className', () => {
    photoListRender({});
    const photoList = screen.getByTestId('photoList');

    expect(photoList.className).toMatch(/\bphotoListContainer\b/);
  })

  describe.each([
    {size: 'xs', expected: 2},
    {size: 'sm', expected: 3},
    {size: 'md', expected: 3},
    {size: 'lg', expected: 4},
    {size: 'xl', expected: 4},
    {size: 'xxl', expected: 4},
  ])('when rendering in different screen sizes', ({ size, expected }: any) => {
      it(`should render ${expected} columns on a ${size} screen`, () => {
      photoListRender({ screenSize: size });
      const photoList = screen.getByTestId('photoList');
      
      expect(photoList.children.length).toBe(expected);
      
      expect(photoList.style.getPropertyValue('--number-of-columns'))
        .toBe(expected.toString());
    })
  })
})