const BASE_URL = process.env.BASE_URL;

const CONVERSATION_LIST_URL = (userId: string) =>
  `${BASE_URL}/user/${userId}/conversation`;
const CONVERSATION_URL = (userId: string, conversationId: string) =>
  `${BASE_URL}/user/${userId}/conversation/${conversationId}`;

export {
  CONVERSATION_LIST_URL,
  CONVERSATION_URL,
};