import { userStore, conversationStore } from 'stores';
import {ConversationCreateDTO, ConversationDTO, UserDTO} from 'types';
import { serviceLocator } from 'services';
import {useState} from "react";
import {Button, CheckBox, Input} from "../../../components";

const StartGroupChatTemplate = () => {
  const [selectedUsersIds, setSelectedUsersIds] = useState<number[]>([]);
  const [newGroupChatName, setNewGroupChatName] = useState<string>('');

  const currentUser = userStore.currentLoginUser;

  const handleUserSelect = (userId: number, selected: boolean) => {
    if (selected) {
      setSelectedUsersIds([...selectedUsersIds, userId]);
    } else {
      setSelectedUsersIds([...selectedUsersIds].filter((id: number) => id !== userId));
    }
  };

  const onGroupChatCreated = () => {
    if (!currentUser) {
      return;
    }
    const newConversationData: ConversationCreateDTO = {
      user_ids: selectedUsersIds,
      name: newGroupChatName,
    };
    serviceLocator.conversationService.createNewConversation(currentUser?.id, newConversationData);
  };

  return (
    <div>
      <Input
        type="text"
        value={newGroupChatName}
        onChange={(name: string, value: string) => {setNewGroupChatName(value)}}
      />
      {
        userStore.userList?.map((user: UserDTO) => {
          return (
            <div
              key={`user-${user.id}`}
            >
              {user.name}
              <CheckBox
                value={selectedUsersIds.includes(user.id)}
                onChange={(value: boolean) => {handleUserSelect(user.id, value)}}
              />
            </div>
          )
        })
      }
      <Button
        content="Create group"
        onClick={onGroupChatCreated}
      />
    </div>
  )
};

export { StartGroupChatTemplate };