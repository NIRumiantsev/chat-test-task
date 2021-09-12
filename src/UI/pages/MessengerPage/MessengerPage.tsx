import {ReactComponentElement, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { serviceLocator } from 'services';
import { conversationStore, userStore } from 'stores';
import { ConversationsWidget, Modal, MessengerHeader, ChatWidget } from 'UI';
import { StartConversationTemplate, StartGroupChatTemplate } from './subcomponents';

import './MessengerPage.scss';

type ModalTemplate = {
  title: string,
  content: ReactComponentElement<'div'> | string
};

type ModalTemplates = {
  [key: string]: ModalTemplate,
};

const MessengerPage = observer((): ReactComponentElement<'div'> => {
  const [modalOpen, setOpenModal] = useState<boolean>(false);
  const [modalTemplateName, setModalTemplateName] = useState<string>('');

  const currentUser = userStore.currentLoginUser;

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
        await serviceLocator.conversationService.loadMessages(userId, firstConversation?.id);
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
  };

  const onConversationModalClose = async () => {
    if (currentUser) {
      await serviceLocator.conversationService.loadConversationList(currentUser.id);
      onModalClose();
    }
  };

  const modalTemplates: ModalTemplates = {
    startConversation: {
      title: "Create a dialogue",
      content: <StartConversationTemplate onModalClose={onConversationModalClose}/>
    },
    startGroupChat: {
      title: "Create group chat",
      content: <StartGroupChatTemplate onModalClose={onConversationModalClose}/>,
    }
  };

  return (
    <div className="MessengerPage">
      <ConversationsWidget/>
      <div className="MessengerPage_column">
        <MessengerHeader
          onStartConversation={() => onModalOpen('startConversation')}
          onStartGroupChart={() => onModalOpen('startGroupChat')}
        />
        <ChatWidget/>
      </div>
      {modalOpen && (
        <Modal
          title={modalTemplates[modalTemplateName].title}
          content={modalTemplates[modalTemplateName].content}
          onClose={onModalClose}
        />
      )}
    </div>
  )
});

export { MessengerPage };