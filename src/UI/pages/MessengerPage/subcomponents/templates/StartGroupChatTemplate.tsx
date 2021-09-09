import {ReactComponentElement, useEffect, useState} from 'react';
import { userStore } from 'stores';
import { ConversationCreateDTO, UserDTO } from 'types';
import { serviceLocator } from 'services';
import { Button, Checkbox, Input } from 'UI/index';
import { MagnifierIcon } from 'assets';
import { UserItem } from '../';
import { filterUsers } from '../../helpers';


type StartGroupChatProps = {
  onModalClose: () => void,
};

const StartGroupChatTemplate = (props: StartGroupChatProps): ReactComponentElement<'div'> => {
  const {
    onModalClose,
  } = props;

  const currentUser = userStore.currentLoginUser;

  const [selectedUsersIds, setSelectedUsersIds] = useState<number[]>([]);
  const [newGroupChatName, setNewGroupChatName] = useState<string>('');
  const [searchingText, setSearchingText] = useState<string>('');
  const [userList, setUserList] = useState<UserDTO[]>(userStore.userList);

  useEffect(() => {
    setUserList(filterUsers(searchingText));
  }, [searchingText]);

  const handleUserSelect = (userId: number, selected: boolean) => {
    if (selected) {
      setSelectedUsersIds([...selectedUsersIds, userId]);
    } else {
      setSelectedUsersIds([...selectedUsersIds].filter((id: number) => id !== userId));
    }
  };

  const onGroupChatCreated = async () => {
    if (!currentUser) {
      return;
    }
    const newConversationData: ConversationCreateDTO = {
      user_ids: selectedUsersIds,
      name: newGroupChatName,
    };
    await serviceLocator.conversationService.createNewConversation(currentUser?.id, newConversationData);
    onModalClose();
  };

  return (
    <div className="Template">
      <Input
        type="text"
        placeholder="Create name of new chat"
        value={newGroupChatName}
        onChange={(name: string, value: string) => {setNewGroupChatName(value)}}
      />
      <Input
        type="text"
        value={searchingText}
        placeholder="Type a name to start searching"
        withIcon={true}
        icon={MagnifierIcon}
        onChange={(name: string, value: string) => setSearchingText(value)}
      />
      <div className="Template_container--group">
        {
          userList?.map((user: UserDTO) => {
            return (
              <UserItem
                key={`user-${user.id}`}
                userData={user}
                withCheckbox={true}
                checked={selectedUsersIds.includes(user.id)}
                onCheck={(value: boolean) => {handleUserSelect(user.id, value)}}
              />
            )
          })
        }
      </div>
      <Button
        content="Create group"
        onClick={onGroupChatCreated}
      />
    </div>
  )
};

export { StartGroupChatTemplate };