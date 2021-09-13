import { ConversationDTO, UserDTO } from 'types';

const getInterlocutor = (conversation: ConversationDTO, currentUserId: number): UserDTO | undefined => {
  return conversation.members.find((member: UserDTO) => member.id !== currentUserId)
}

export { getInterlocutor };