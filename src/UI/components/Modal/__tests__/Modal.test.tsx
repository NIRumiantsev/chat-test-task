import { fireEvent, render, screen } from '@testing-library/react';

import {
  Modal,
  ModalProps,
} from '../Modal';

const renderComponent = (props: ModalProps) => {
  return render(<Modal {...props}/>);
};

describe('Modal', () => {
  const title = 'test';
  const content = 'test';
  const onClose = jest.fn();

  it('Render without errors', () => {
    expect(() => renderComponent({title, content, onClose})).not.toThrow();
  });

  describe('Props test', () => {

    describe('onClose test', () => {
      it('Call onClose function if required button clicked', () => {
        renderComponent({title, content, onClose});
        const closeButton = screen.getByRole('button');
        fireEvent.click(closeButton);
        expect(onClose).toHaveBeenCalledTimes(1);
      });
    });

    describe('title test', () => {
      it('Title property changes modal title', () => {
        renderComponent({title, content, onClose});
        const modalTitle = screen.getByRole('modal-title');
        expect(modalTitle.textContent).toEqual('test');
      });
    });

    describe('content test', () => {
      it('Content property changes modal content', () => {
        renderComponent({title, content, onClose});
        const modalWindow = screen.getByRole('modal-window');
        expect(modalWindow.textContent).toContain('test');
      });
    });
  })
});