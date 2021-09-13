import { fireEvent, render, screen } from '@testing-library/react';

import {
  Checkbox,
  CheckBoxProps,
} from '../Checkbox';

const renderComponent = (props: CheckBoxProps) => {
  return render(<Checkbox {...props}/>);
};

describe('Checkbox', () => {
  const value = false;
  const onChange = jest.fn();

  it('Render without errors', () => {
    expect(() => renderComponent({ value, onChange})).not.toThrow();
  });

  describe('Props test', () => {
    describe('onChange test', () => {
      it('Call onChange function if value changed', () => {
        renderComponent({ value, onChange });
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(onChange).toHaveBeenCalled();
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(true);
      });
    });
  })
});