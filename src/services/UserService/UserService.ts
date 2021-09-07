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

  // There is no API methods for authentication so we just take the entered username and any string as password,
  // searching for user in the user list, then we save user id in local storage so we can load user data by login
  // every time page refreshes if user id exists. If it doesn't we just redirect user to login page.
  // Attention! In case of this task we assume that user name is unique and can be used as unique login.
  async createFakeAuth(login: string, password: string) {
    if (password) {
      const currentUser = this.store.userList.find((user: UserDTO) => user.name === login);
      if (currentUser) {
        this.localStorage.addItem('userId', currentUser.id?.toString());
        await this.loadLoginUser(currentUser.id?.toString())
          .catch(() => {throw 'Something went wrong'});
      } else {
        throw 'User not found'
      }
    } else {
      throw 'You should enter your password'
    }
  }

  checkUserLogin() {
    return this.localStorage.getItem('userId');
  }

  async loadLoginUser(userId: string) {
    const { data }: { data: UserDTO } = await this.api.get(USER_URL(userId));
    this.store.currentLoginUser = data;
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
