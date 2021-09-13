import {fireEvent, render, screen} from '@testing-library/react';

import {
  ConversationsWidget
} from '../ConversationsWidget';

const renderComponent = () => {
  return render(<ConversationsWidget/>);
};

describe('LoginForm', () => {
  it('Render without errors', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('Functional test', () => {
    describe('Conversations filter test', () => {
      it('Search input change causes changes of conversation badges number', async () => {
        await renderComponent();
        const conversationsCurtain = screen.getByRole('conversations-curtain');
        if (conversationsCurtain) {
          fireEvent.click(conversationsCurtain);
        }
        const conversationsSnackbar = screen.getByRole('conversation-snackbar');
        if (!conversationsSnackbar) {
          const conversationBadgesNumber = screen.getByRole('conversation-badges').childElementCount;
          const searchInput = screen.getByPlaceholderText('Type to start searching');
          if (conversationBadgesNumber) {
            const value = 'test';
            fireEvent.focus(searchInput);
            fireEvent.change(searchInput, { target: { value } });
            const newConversationBadgesNumber = screen.getByRole('conversation-badges').childElementCount;
            expect(conversationBadgesNumber).not.toEqual(newConversationBadgesNumber);
          }
        }
      });
    });
  })
});