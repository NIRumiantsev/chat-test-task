import {ReactComponentElement, useEffect, useState} from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { userStore, conversationStore } from 'stores';
import { ConversationCreateDTO, ConversationDTO, UserDTO } from 'types';
import { serviceLocator } from 'services';
import { Input } from 'UI/index';
import { MagnifierIcon } from 'assets';
import { UserItem } from '../';
import { filterUsers } from '../../helpers';

import './Template.scss';

type StartConversationProps = {
  onModalClose: () => void,
};

const StartConversationTemplate = observer((props: StartConversationProps): ReactComponentElement<'div'> => {
  const {
    onModalClose,
  } = props;

  const currentUser = userStore.currentLoginUser;

  const [searchingText, setSearchingText] = useState<string>('');
  const [userList, setUserList] = useState<UserDTO[]>(userStore.userList);

  useEffect(() => {
    setUserList(filterUsers(searchingText));
  }, [searchingText]);

  const handleUserClick = async (userId: number) => {
    if (!currentUser) {
      return;
    }
    const conversationList = toJS(conversationStore).conversationList;
    const existingConversation = conversationList.find((conversation: ConversationDTO) => {
      const { members } = conversation;
      const isPrivate = members.length === 2; //Check if conversation is one-to-one
      const includesUser = !!members?.find((member: UserDTO ) =>
        member.id === userId
      ); // Check if conversation includes user
      return isPrivate && includesUser;
    });
    if (!existingConversation) {
      const newConversationData: ConversationCreateDTO = {
        user_ids: [userId],
      };
      await serviceLocator.conversationService.createNewConversation(currentUser?.id, newConversationData);
      await serviceLocator.conversationService.loadConversationList(currentUser?.id);
    } else {
      await serviceLocator.conversationService.loadConversation(currentUser?.id, existingConversation.id);
    }
    onModalClose();
  };

  return (
    <div className="Template">
      <Input
        type="text"
        value={searchingText}
        placeholder="Type a name to start searching"
        withIcon={true}
        icon={MagnifierIcon}
        onChange={(name: string, value: string) => setSearchingText(value)}
      />
      <div className="Template_container">
        {
          userList?.map((user: UserDTO) =>
            user.id !== currentUser?.id ? (
              <UserItem
                key={`user-${user.id}`}
                userData={user}
                onClick={() => {handleUserClick(user.id)}}
              />
            ) : null
          )
        }
      </div>
    </div>
  )
});

export { StartConversationTemplate };