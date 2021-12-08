import Loading from '.';
import { render } from '@testing-library/react';

describe('Component: <Loading />', () => {
  const { container, getByText } = render(<Loading />);
  const loadingNode = getByText('Loading');

  it('should render a single node', () => {
    expect(loadingNode).toBeInTheDocument();
    expect(container.childNodes.length).toBe(1);
  })
  
  it('should have the "loading" className', () => {
    expect(loadingNode.className).toEqual('loading');
  })
})