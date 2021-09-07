import { userStore, conversationStore } from 'stores';
import {ConversationCreateDTO, ConversationDTO, UserDTO} from 'types';
import { serviceLocator } from 'services';

const StartConversationTemplate = () => {

  const currentUser = userStore.currentLoginUser;

  const handleUserClick = (userId: number) => {
    if (!currentUser) {
      return;
    }
    const conversationList = conversationStore.conversationList;
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
      serviceLocator.conversationService.createNewConversation(currentUser?.id, newConversationData);
    } else {
      serviceLocator.conversationService.loadConversation(currentUser?.id, existingConversation.id);
    }
  };

  return (
    <div>
      {
        userStore.userList?.map((user: UserDTO) => {
          return (
            <div
              onClick={() => {handleUserClick(user.id)}}
              key={`user-${user.id}`}
            >
              {user.name}
            </div>
          )
        })
      }
    </div>
  )
};

export { StartConversationTemplate };