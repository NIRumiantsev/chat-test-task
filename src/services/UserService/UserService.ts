import { BaseService, ServiceLocator } from 'services';
import { UserStore } from 'stores';
import { UserDTO } from 'types';
import {
  USER_URL,
  USER_LIST_URL,
} from './urls';

export class UserService extends BaseService {
  private store: UserStore;

  constructor(rootService: ServiceLocator, coursesStore: UserStore) {
    super(rootService);
    this.store = coursesStore;
  }

  async loadUserList() {
    const { data }: { data: UserDTO[] } = await this.api.get(USER_LIST_URL);
    this.store.userList = data;
  }

  async loadUserData(userId: string) {
    const { data }: { data: UserDTO } = await this.api.get(USER_URL(userId));
    this.store.currentUser = data;
  }
}
