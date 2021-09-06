import { makeAutoObservable } from 'mobx';
import {
} from 'types';

class UserStore {
  constructor() {
    makeAutoObservable(this);
  }
}

const userStore = new UserStore();

export { UserStore, userStore };