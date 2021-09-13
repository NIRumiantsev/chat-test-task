import { fireEvent, render, screen } from '@testing-library/react';

import {
  MessengerHeader,
  MessengerHeaderProps
} from '../MessengerHeader';

const renderComponent = (props: MessengerHeaderProps) => {
  return render(<MessengerHeader {...props}/>);
};

describe('MessengerHeader', () => {
  const onStartConversation = jest.fn();
  const onStartGroupChart = jest.fn();

  it('Render without errors', () => {
    expect(() => renderComponent({ onStartConversation, onStartGroupChart })).not.toThrow();
  });

  describe('Props test', () => {
    describe('onStartConversation test', () => {
      it('Call onStartConversation and onStartGroupChart function if required button clicked', () => {
        renderComponent({ onStartConversation, onStartGroupChart });
        const conversationButton = screen.getByText('Start dialog');
        const groupChatButton = screen.getByText('Create group chat');
        fireEvent.click(conversationButton);
        expect(onStartConversation).toHaveBeenCalledTimes(1);
        fireEvent.click(groupChatButton);
        expect(onStartGroupChart).toHaveBeenCalledTimes(1);
      });
    });
  })
});