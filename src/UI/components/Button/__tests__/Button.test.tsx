import { fireEvent, render, screen } from '@testing-library/react';

import {
  Button,
  ButtonProps,
  buttonPropType,
} from '../Button';

const renderComponent = (props: ButtonProps) => {
  return render(<Button {...props}/>);
};

describe('Button', () => {
  const onClick = jest.fn();

  it('Render without errors', () => {
    expect(() => renderComponent({ onClick })).not.toThrow();
  });

  describe('Props test', () => {
    describe('onClick test', () => {
      it('Call onChange function if button is clicked', () => {
        renderComponent({ onClick });
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(onClick).toHaveBeenCalled();
        expect(onClick).toHaveBeenCalledTimes(1);
      });
    });

    describe('content test', () => {
      it('Content property changes button content', () => {
        const content = 'test';
        renderComponent({ onClick, content });
        const button = screen.getByRole('button');
        expect(button.textContent).toEqual(content);
      });
    });

    describe('type test', () => {
      buttonPropType.forEach((type) => {
        it(`Change button class to .Button--${type}`, () => {
          renderComponent({ onClick, type });
          const button = screen.getByRole('button');
          expect(button.className).toBe(`Button--${type}`);
        });
      });
    });

    describe('width test', () => {
      it('Width property changes button width style', () => {
        const width = '256px';
        renderComponent({ onClick, width });
        const button = screen.getByRole('button');
        expect(button.style.width).toEqual(width);
      });
    });

    describe('withIcon test', () => {
      it('withIcon property changes button justifyContent style if content exists and adds icon', () => {
        const content = 'test';
        renderComponent({ onClick, content, withIcon: true });
        const button = screen.getByRole('button');
        expect(button.style.justifyContent).toEqual('flex-start');
        screen.findByRole('button-icon');
      });
    });
  })
});