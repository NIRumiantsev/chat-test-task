import { fireEvent, render, screen } from '@testing-library/react';

import {
  Input,
  InputProps,
} from '../Input';

const renderComponent = (props: InputProps) => {
  return render(<Input {...props}/>);
};

describe('Input', () => {
  const type = 'text';
  const value = 'test';
  const onChange = jest.fn();

  it('Render without errors', () => {
    expect(() => renderComponent({type, value, onChange})).not.toThrow();
  });

  describe('Props test', () => {
    describe('onChange test', () => {
      it('Call onChange function if value changed', () => {
        const name = 'test';
        renderComponent({ type, value, onChange, name });
        const newValue = 'new-value';
        const inputField = screen.getByRole('input-field');
        fireEvent.focus(inputField);
        fireEvent.change(inputField, { target: { value: newValue } });
        expect(onChange).toHaveBeenCalled();
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(name, newValue);
      });
    });

    describe('withIcon test', () => {
      it('Change input field class to .Input_field--withIcon', () => {
        renderComponent({ type, value, onChange, withIcon: true });
        const inputField = screen.getByRole('input-field');
        expect(inputField.className).toBe('Input_field--withIcon');
      });
    });

    describe('title test', () => {
      it('Title property changes input title', () => {
        const title = 'test';
        renderComponent({ type, value, onChange, title });
        const inputTitle = screen.getByRole('input-title');
        expect(inputTitle.textContent).toEqual(title);
      });
    });
  })
});