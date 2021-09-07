import { BaseService, ServiceLocator } from 'services';
import { ConversationStore } from 'stores';
import { ConversationCreateDTO, ConversationDTO } from 'types';
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

  async loadConversationList(userId: string | number) {
    const { data }: { data: ConversationDTO[] } = await this.api.get(
      CONVERSATION_LIST_URL(userId.toString())
    );
    this.store.conversationList = data;
  }

  async loadConversation(userId: string | number, conversationId: string | number) {
    const { data }: { data: ConversationDTO } = await this.api.get(
      CONVERSATION_URL(userId.toString(), conversationId.toString())
    );
    this.store.currentConversation = data;
  }

  async createNewConversation(userId: string | number, conversationData: ConversationCreateDTO) {
    const { data }: { data: ConversationDTO } = await this.api.post(
      CONVERSATION_LIST_URL(userId.toString()), conversationData
    );
    this.store.currentConversation = data;
  }

}
