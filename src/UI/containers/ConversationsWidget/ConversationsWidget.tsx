import { observer } from 'mobx-react';
import {conversationStore, userStore} from 'stores';
import { ConversationPreview } from 'UI';
import { ConversationDTO } from 'types';
import {serviceLocator} from "../../../services";

const ConversationsWidget = observer(() => {

  const currentUser = userStore.currentLoginUser;

  const handlePreviewClick = async (conversationId: number) => {
    if (currentUser) {
      await serviceLocator.conversationService.loadConversation(currentUser.id, conversationId);
    }
  };

  return (
    <div>
      {conversationStore.conversationList.map((conversation: ConversationDTO) =>(
        <ConversationPreview
          key={conversation.id}
          onClick={() => {handlePreviewClick(conversation.id)}}
          conversationName={conversation.name || [...conversation.members].reverse()[0].name}
        />
      ))}
    </div>
  );
});

export { ConversationsWidget };