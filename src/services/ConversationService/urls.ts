const BASE_URL = process.env.REACT_APP_BASE_URL;

const CONVERSATION_LIST_URL = (userId: string) =>
  `${BASE_URL}/user/${userId}/conversation`;
const CONVERSATION_URL = (userId: string, conversationId: string) =>
  `${BASE_URL}/user/${userId}/conversation/${conversationId}`;
const MESSAGE_URL = (userId: string, conversationId: string) =>
  `${BASE_URL}/user/${userId}/conversation/${conversationId}/message`;

export {
  CONVERSATION_LIST_URL,
  CONVERSATION_URL,
  MESSAGE_URL,
};