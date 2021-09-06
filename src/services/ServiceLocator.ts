import {
  userStore,
  conversationStore,
} from 'stores';
import {
  UserService,
  ConversationService,
} from 'services';

class ServiceLocator {
  public coursesService: UserService;
  public conversationService: ConversationService;

  constructor() {
    this.coursesService = new UserService(this, userStore);
    this.conversationService = new ConversationService(this, conversationStore);
  }
}

const serviceLocator = new ServiceLocator();

export { ServiceLocator, serviceLocator };
