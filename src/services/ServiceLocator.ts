import {
  userStore
} from 'stores';
import {
  UserService
} from 'services';

class ServiceLocator {
  public coursesService: UserService;

  constructor() {
    this.coursesService = new UserService(this, userStore);
  }
}

const serviceLocator = new ServiceLocator();

export { ServiceLocator, serviceLocator };
