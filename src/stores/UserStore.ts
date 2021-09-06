import { makeAutoObservable } from 'mobx';
import {
  UserDTO
} from 'types';

class UserStore {
  userList: UserDTO[] = [];
  currentUser: UserDTO | null = null;

  constructor() {
    makeAutoObservable(this);
  }
}

const userStore = new UserStore();

export { UserStore, userStore };