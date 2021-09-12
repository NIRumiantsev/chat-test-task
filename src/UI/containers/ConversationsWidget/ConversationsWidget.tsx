import { useEffect, useState } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { cloneDeep } from 'lodash';
import { conversationStore, userStore } from 'stores';
import {Button, Input, useWindowDimensions} from 'UI';
import { ConversationDTO, WindowDimensions } from 'types';
import { serviceLocator } from 'services';
import { ConversationBadge } from './subcomponents';
import { CloseIcon, MagnifierIcon } from 'assets';
import { getInterlocutor } from 'utils';

import './ConversationsWidget.scss';

const ConversationsWidget = observer(() => {
  const defaultConversations = cloneDeep(toJS(conversationStore).conversationList);

  const [searchText, setSearchText] = useState<string>('');
  const [conversationList, setConversationList] = useState<ConversationDTO[]>(defaultConversations);
  const [mobileWidgetOpen, setMobileWidgetOpen] = useState<boolean>(false);

  const currentUser = userStore.currentLoginUser;

  const { width: windowWidth }: WindowDimensions = useWindowDimensions();

  useEffect(() => {
    filterConversations();
  }, [searchText]);

  useEffect(() => {
    setConversationList(conversationStore.conversationList);
  }, [conversationStore.conversationList]);

  const filterConversations = () => {
    if (currentUser) {
      const filteredConversations = defaultConversations.filter((conversation: ConversationDTO) => (
        conversation.name?.includes(searchText) || getInterlocutor(conversation, currentUser.id)?.name.includes(searchText)
      ))
      setConversationList(filteredConversations);
    }
  };

  const handlePreviewClick = async (conversationId: number) => {
    if (currentUser) {
      await serviceLocator.conversationService.loadConversation(currentUser.id, conversationId);
      setMobileWidgetOpen(false);
    }
  };

  if (windowWidth <= 1080 && !mobileWidgetOpen) {
    return (
      <div
        className="ConversationsWidget_curtain"
        onClick={() => setMobileWidgetOpen(true)}
      >
        <img
          src={MagnifierIcon}
          alt="Tap to search"
        />
      </div>
    )
  }

  return (
    <div className="ConversationsWidget">
      {windowWidth <= 1080 && (
        <div className="ConversationsWidget_close">
          <Button
            onClick={() => setMobileWidgetOpen(false)}
            type="system"
            withIcon={true}
            icon={CloseIcon}
            width="45px"
          />
        </div>
      )}
      <Input
        type="text"
        placeholder="Type to start searching"
        value={searchText}
        onChange={(name:string, value: string) => setSearchText(value)}
        withIcon={true}
        icon={MagnifierIcon}
      />
      {
        conversationList.length === 0 || !currentUser ? (
          <div className="ConversationsWidget_snackbar">
            Your chats will be displayed here
          </div>
        ) : (
          <div className="ConversationsWidget_container">
            {conversationList.map((conversation: ConversationDTO) =>(
              <ConversationBadge
                key={conversation.id}
                title={conversation.name || getInterlocutor(conversation, currentUser.id)?.name || ''}
                content={conversation.last_message?.text}
                lastMessageTime={conversation.last_message?.sent_at}
                currentId={
                  conversation.members.length > 0
                    ? conversation.id
                    : getInterlocutor(conversation, currentUser.id)?.id || 0
                }
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