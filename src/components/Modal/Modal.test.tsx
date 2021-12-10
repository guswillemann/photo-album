import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '.';

const testRegEx = {
  modal: /\bmodalContainer\b/,
  closeBtn: /\bcloseBtn\b/,
  closing: /\bclosing\b/,
};

const toggleModalMock = jest.fn();

const testContainer = document.createElement('div')
testContainer.setAttribute('id', '__next');

describe('Component: <Modal />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  })

  describe('when closed', () => {
    it('should not render a DOM element', () => {
      const { queryByTestId } = render(<Modal isOpen={false} onClose={toggleModalMock}  />, {
        container: document.body.appendChild(testContainer),
      });  

      const modal = queryByTestId('modalContainer');
      expect(modal).not.toBeInTheDocument();
    })
  })

  describe('when open', () => {
    beforeEach(() => {
      render((
          <Modal isOpen={true} onClose={toggleModalMock}>
            <div>Modal content</div>
          </Modal>
        ), {
        container: document.body.appendChild(testContainer),
      })

      jest.useFakeTimers();
      jest.spyOn(global, 'setTimeout');
    })

    afterEach(() => {
      jest.runOnlyPendingTimers()
      jest.useRealTimers();
    })

    it('should render a DOM element', () => {
      const modal = screen.queryByTestId('modalContainer');
      const modalContent = screen.queryByText('Modal content');
      const closeBtn = screen.queryByTestId('closeModalBtn');
      
      expect(modal).toBeInTheDocument();
      expect(modal?.className).toMatch(testRegEx.modal);

      expect(modalContent).toBeInTheDocument();
      
      expect(closeBtn).toBeInTheDocument();
      expect(closeBtn?.className).toMatch(testRegEx.closeBtn);
    })

    describe('when the container element is clicked', () => {
      it('should close the modal, after a timeout', () => {
        const modal = screen.getByTestId('modalContainer');

        expect(modal.className).not.toMatch(testRegEx.closing);

        userEvent.click(modal);

        expect(modal.className).toMatch(testRegEx.closing);

        expect(setTimeout).toBeCalledTimes(1);
        expect(setTimeout).lastCalledWith(expect.any(Function), 500);

        act(() => { jest.runAllTimers() });

        expect(toggleModalMock).toBeCalledTimes(1);
        expect(modal.className).not.toMatch(testRegEx.closing);
      })
    })
    
    describe('when the Close Button is clicked', () => {
      it('should close the modal, after a timeout', () => {
        const modal = screen.getByTestId('modalContainer');
        const closeBtn = screen.getByTestId('closeModalBtn');

        expect(modal.className).not.toMatch(testRegEx.closing);

        userEvent.click(closeBtn);

        expect(modal.className).toMatch(testRegEx.closing);

        expect(setTimeout).toBeCalledTimes(1);
        expect(setTimeout).lastCalledWith(expect.any(Function), 500);

        act(() => { jest.runAllTimers() });

        expect(toggleModalMock).toBeCalledTimes(1);
        expect(modal.className).not.toMatch(testRegEx.closing);
      })
    })

    describe('when the modal content is clicked', () => {
      it('should not close the modal', () => {
        const modal = screen.getByTestId('modalContainer');
        const modalContent = screen.getByText('Modal content');
        
        userEvent.click(modalContent);
        expect(modal.className).not.toMatch(testRegEx.closing);

        expect(setTimeout).toBeCalledTimes(0);

        act(() => { jest.runAllTimers() });

        expect(toggleModalMock).toBeCalledTimes(0);
        expect(modal.className).not.toMatch(testRegEx.closing);
      })
    })
  })
})