import { BaseService, ServiceLocator } from 'services';
import { ConversationStore } from 'stores';
import { ConversationDTO } from 'types';
import {
  CONVERSATION_URL,
  CONVERSATION_LIST_URL,
} from './urls';

export class ConversationService extends BaseService {
  private store: ConversationStore;

  constructor(rootService: ServiceLocator, coursesStore: ConversationStore) {
    super(rootService);
    this.store = coursesStore;
  }

  async loadConversationList(userId: string) {
    const { data }: { data: ConversationDTO[] } = await this.api.get(CONVERSATION_LIST_URL(userId));
    this.store.conversationList = data;
  }

  async loadConversation(userId: string, conversationId: string) {
    const { data }: { data: ConversationDTO } = await this.api.get(CONVERSATION_URL(userId, conversationId));
    this.store.currentConversation = data;
  }
}
