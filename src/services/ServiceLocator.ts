import {
  userStore,
  conversationStore,
} from 'stores';
import {
  UserService,
  ConversationService,
} from 'services';

class ServiceLocator {
  public userService: UserService;
  public conversationService: ConversationService;

  constructor() {
    this.userService = new UserService(this, userStore);
    this.conversationService = new ConversationService(this, conversationStore);
  }
}

const serviceLocator = new ServiceLocator();

export { ServiceLocator, serviceLocator };
