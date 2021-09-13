import { render, screen } from '@testing-library/react';

import {
  Avatar,
  AvatarProps,
} from '../Avatar';

const renderComponent = (props: AvatarProps) => {
  return render(<Avatar {...props}/>);
};

describe('Avatar', () => {
  const content = 'test';
  const currentId = 1;

  it('Render without errors', () => {
    expect(() => renderComponent({ content, currentId })).not.toThrow();
  });

  describe('Props test', () => {
    describe('content test', () => {
      it('Content property changes avatar content', () => {
        const content = 'new-test';
        renderComponent({ content, currentId });
        const avatar = screen.getByRole('avatar');
        expect(avatar.textContent).toEqual(content[0]);
      });
    });
  })
});