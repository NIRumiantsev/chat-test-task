import {ReactComponentElement, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { serviceLocator } from 'services';
import { conversationStore } from 'stores';
import { ConversationsWidget, Modal, MessengerHeader, ChatWidget } from 'UI';
import { StartConversationTemplate, StartGroupChatTemplate } from './subcomponents';

type ModalTemplates = {
  [key: string]: ReactComponentElement<'div'> | string
};

const modalTemplates: ModalTemplates = {
  startConversation: <StartConversationTemplate/>,
  startGroupChat: <StartGroupChatTemplate/>,
};

const MessengerPage = () => {
  const [modalOpen, setOpenModal] = useState<boolean>(false);
  const [modalTemplateName, setModalTemplateName] = useState<string>('');

  const history = useHistory();

  useEffect(() => {
    loadMessengerData();
  }, []);

  const loadMessengerData = async () => {
    const userId = serviceLocator.userService.checkUserLogin();
    if (userId) {
      await serviceLocator.userService.loadLoginUser(userId);
      await serviceLocator.conversationService.loadConversationList(userId);
      const firstConversation = conversationStore.conversationList[0];
      if (firstConversation) {
        await serviceLocator.conversationService.loadConversation(userId, firstConversation?.id);
      }
    } else {
      history.push('/login');
    }
  };

  const onModalOpen = (modalTemplateName: string) => {
    setOpenModal(true);
    setModalTemplateName(modalTemplateName);
  };

  const onModalClose = () => {
    setOpenModal(false);
    setModalTemplateName('');
  }

  return (
    <div>
      Messenger
      <ConversationsWidget/>
      <MessengerHeader
        onStartConversation={() => onModalOpen('startConversation')}
        onStartGroupChart={() => onModalOpen('startGroupChat')}
      />
      <ChatWidget/>
      {modalOpen && (
        <Modal
          content={modalTemplates[modalTemplateName]}
          onClose={onModalClose}
        />
      )}
    </div>
  )
};

export { MessengerPage };