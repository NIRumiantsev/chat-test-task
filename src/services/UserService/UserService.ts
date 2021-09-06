import { BaseService, ServiceLocator } from 'services';
import { UserStore } from 'stores';
import {
} from './urls';

export class UserService extends BaseService {
  private store: UserStore;

  constructor(rootService: ServiceLocator, coursesStore: UserStore) {
    super(rootService);
    this.store = coursesStore;
  }
}
