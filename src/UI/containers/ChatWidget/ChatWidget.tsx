import { observer } from 'mobx-react';
import { conversationStore } from 'stores';

const ChatWidget = observer( () => {

  return (
    <div>{conversationStore.currentConversation?.id}</div>
  );
});

export { ChatWidget };