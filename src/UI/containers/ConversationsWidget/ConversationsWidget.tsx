import { useEffect, useState } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { cloneDeep } from 'lodash';
import { conversationStore, userStore } from 'stores';
import { Input } from 'UI';
import { ConversationDTO } from 'types';
import { serviceLocator } from 'services';
import { ConversationBadge } from './subcomponents';
import { MagnifierIcon } from 'assets';

import './ConversationsWidget.scss';

const ConversationsWidget = observer(() => {
  const defaultConversations = cloneDeep(toJS(conversationStore).conversationList);

  const [searchText, setSearchText] = useState<string>('');
  const [conversationList, setConversationList] = useState<ConversationDTO[]>(defaultConversations);

  const currentUser = userStore.currentLoginUser;

  useEffect(() => {
    filterConversations();
  }, [searchText]);

  useEffect(() => {
    setConversationList(conversationStore.conversationList);
  }, [conversationStore.conversationList]);

  const filterConversations = () => {
    const filteredConversations = defaultConversations.filter((conversation: ConversationDTO) => (
      conversation.name?.includes(searchText) || getInterlocutor(conversation).name.includes(searchText)
    ))
    setConversationList(filteredConversations);
  };

  const getInterlocutor = (conversation: ConversationDTO) => {
    return [...conversation.members].reverse()[0]
  }

  const handlePreviewClick = async (conversationId: number) => {
    if (currentUser) {
      await serviceLocator.conversationService.loadConversation(currentUser.id, conversationId);
    }
  };

  return (
    <div className="ConversationsWidget">
      <Input
        type="text"
        placeholder="Type to start searching"
        value={searchText}
        onChange={(name:string, value: string) => setSearchText(value)}
        withIcon={true}
        icon={MagnifierIcon}
      />
      {
        conversationList.length === 0 ? (
          <div className="ConversationsWidget_snackbar">
            Your chats will be displayed here
          </div>
        ) : (
          <div className="ConversationsWidget_container">
            {conversationList.map((conversation: ConversationDTO) =>(
              <ConversationBadge
                key={conversation.id}
                title={conversation.name || getInterlocutor(conversation).name}
                content={conversation.last_message?.text}
                lastMessageTime={conversation.last_message?.sent_at}
                currentId={conversation.members.length > 0 ? conversation.id : getInterlocutor(conversation).id}
                onClick={() => {handlePreviewClick(conversation.id)}}
              />
            ))}
          </div>
        )
      }
    </div>
  );
});

export { ConversationsWidget };