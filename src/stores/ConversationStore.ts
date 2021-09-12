import { makeAutoObservable } from 'mobx';
import {
  ConversationDTO,
  MessageDTO
} from 'types';

class ConversationStore {
  conversationList: ConversationDTO[] = [];
  currentConversation: ConversationDTO | null = null;
  currentMessages: MessageDTO[] = [];

  constructor() {
    makeAutoObservable(this);
  }
}

const conversationStore = new ConversationStore();

export { ConversationStore, conversationStore };