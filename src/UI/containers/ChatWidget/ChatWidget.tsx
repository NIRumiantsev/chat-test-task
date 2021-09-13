import { ChangeEvent, useMemo, useState, useRef, useEffect } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { get } from 'lodash';
import moment from 'moment';
import { serviceLocator } from 'services';
import { conversationStore, userStore } from 'stores';
import { ChatImage, SendIcon } from 'assets';
import { getInterlocutor } from 'utils';
import { Avatar } from 'UI';
import {MessageDTO, UserDTO} from 'types';

import './ChatWidget.scss';

const ChatWidget = observer( () => {
  const [newMessage, setNewMessage] = useState<string>('');

  const currentConversation = toJS(conversationStore).currentConversation;
  const currentUser = toJS(userStore).currentLoginUser;
  const currentUserList = toJS(userStore).userList;

  const messengerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollDownMessenger();
  }, [messengerRef.current]);

  const conversationTitle = useMemo(() => {
    if (currentConversation && currentUser) {
      if (get(currentConversation, "members.length") > 2) {
        return currentConversation?.name || '';
      } else {
        return getInterlocutor(currentConversation, currentUser.id)?.name;
      }
    } else {
      return '';
    }
  }, [currentConversation]);

  const handleMessageChange = (message: string) => {
    setNewMessage(message);
    const heightLimit = 200;
    //@ts-ignore
    const textarea: HTMLTextAreaElement = textareaRef.current;
    //@ts-ignore
    const messages: HTMLDivElement = messagesRef.current;
    if (textarea) {
      textarea.style.height = "";
      const textareaHeight = Math.min(textarea.scrollHeight, heightLimit) + "px";
      textarea.style.height = textareaHeight
      messages.style.paddingBottom = `calc(${textareaHeight} + 60px)`
    }
  };

  const handleSendMessage = async () => {
    if (currentUser && currentConversation && newMessage.length > 0) {
      await serviceLocator.conversationService.createNewMessage(currentUser.id, currentConversation.id, newMessage);
      await serviceLocator.conversationService.loadMessages(currentUser.id, currentConversation.id);
      await serviceLocator.conversationService.loadConversationList(currentUser.id);
      setNewMessage('');
      scrollDownMessenger();
    }
  };

  const scrollDownMessenger = () => {
    const scrollHeight = messengerRef?.current?.scrollHeight;
    if (scrollHeight) {
      messengerRef?.current?.scrollTo(0, scrollHeight);
    }
  };

  const findUserName = (userId: number) =>
    currentUserList.find((user: UserDTO) => user.id === userId)?.name;

  return (
    <div className="ChatWidget">
      {
        currentConversation && currentUser && conversationStore?.conversationList?.length > 0 ? (
          <div className="ChatWidget_messenger" ref={messengerRef}>
            <div className="ChatWidget_header">
              <div className="ChatWidget_holder">
                <Avatar
                  size="m"
                  content={conversationTitle || ''}
                  currentId={currentConversation.id}
                />
                <h2 className="ChatWidget_title">{conversationTitle}</h2>
              </div>
              <span className="ChatWidget_timestamp">
                {moment(getInterlocutor(currentConversation, currentUser.id)?.last_seen_at).fromNow()}
              </span>
            </div>
            <div
              className="ChatWidget_messages"
              ref={messagesRef}
            >
              {conversationStore.currentMessages.map((message: MessageDTO) =>
                  <div
                    className="ChatWidget_message"
                    style={
                      message.user_id === currentUser.id
                        ? {justifyContent: 'flex-end'}
                        : {justifyContent: 'flex-start'}
                    }
                    key={`message-${message.id}`}
                  >
                    <div
                      className="ChatWidget_balloon"
                      style={
                        message.user_id === currentUser.id
                          ? {borderRadius: '15px 0px 15px 15px'}
                          : {borderRadius: '0px 15px 15px 15px'}
                      }
                    >
                      <div className="ChatWidget_holder">
                        <span className="ChatWidget_name">{findUserName(message.user_id)}</span>
                        <span className="ChatWidget_timestamp">{moment(message.sent_at).format('HH:mm')}</span>
                      </div>
                      <p className="ChatWidget_text">{message.text}</p>
                    </div>
                  </div>
              )}
            </div>
            <div className="ChatWidget_container">
              <textarea
                className="ChatWidget_textarea"
                placeholder="Start typing"
                ref={textareaRef}
                value={newMessage}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => handleMessageChange(event.target.value)}
              />
              <img
                onClick={handleSendMessage}
                className="ChatWidget_send"
                src={SendIcon}
                alt="Send message"
              />
            </div>
          </div>
        ) : (
          <img
            className="ChatWidget_image"
            src={ChatImage}
            alt="Press «Start dialog» or «Create group chat» to start conversation"
          />
        )
      }
    </div>
  );
});

export { ChatWidget };