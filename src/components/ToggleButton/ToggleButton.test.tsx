import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useReducer } from 'react';
import ToggleButton from '.';

const stateOneRegEx = /\bstateOne\b/;
const stateTwoRegEx = /\bstateTwo\b/;

const toggleCallbackMock = jest.fn((a: boolean) => !a);

function ComponentWithToggle() {
  const [isStateOne, toggleState] = useReducer(toggleCallbackMock, true);

  return (
    <div>
      <ToggleButton
        isStateOne={isStateOne}
        onClick={toggleState}
      />
    </div>
  );
}

describe('Component: <ToggleButton />', () => {
  describe('when stateOne is active', () => {
    it('should have className stateOne', () => {
      const { getByTestId } = render(
        <ToggleButton isStateOne={true} />
      );
      
      const toggleBtn = getByTestId('toggleBtn');
      expect(toggleBtn).toBeInTheDocument();
      expect(toggleBtn.className).toMatch(stateOneRegEx);
    })
  })
  
  describe('when stateTwo is active', () => {
    it('should have className stateTwo', () => {
      const { getByTestId } = render(
        <ToggleButton isStateOne={false} />
      );
      
      const toggleBtn = getByTestId('toggleBtn');
      expect(toggleBtn).toBeInTheDocument();
      expect(toggleBtn.className).toMatch(stateTwoRegEx);
    })
  })

  describe('when clicked', () => {
    it('will toggle the state', () => {
      const { getByTestId } = render(<ComponentWithToggle />);

      const toggleBtn = getByTestId('toggleBtn');
      expect(toggleBtn).toBeInTheDocument();
      
      expect(toggleCallbackMock).toBeCalledTimes(0);
      expect(toggleBtn.className).toMatch(stateOneRegEx);
      
      userEvent.click(toggleBtn);
      
      expect(toggleCallbackMock).toBeCalledTimes(1);
      expect(toggleBtn.className).toMatch(stateTwoRegEx);

      userEvent.click(toggleBtn);

      expect(toggleCallbackMock).toBeCalledTimes(2);
      expect(toggleBtn.className).toMatch(stateOneRegEx);
    })
  })
})
