import { makeAutoObservable } from 'mobx';
import {
  ConversationDTO
} from 'types';

class ConversationStore {
  conversationList: ConversationDTO[] = [];
  currentConversation: ConversationDTO | null = null;

  constructor() {
    makeAutoObservable(this);
  }
}

const conversationStore = new ConversationStore();

export { ConversationStore, conversationStore };