export class LocalStorageService {
  private localStorage: Storage;
  localStorageSupported: boolean;

  constructor() {
    this.localStorage = window.localStorage;
    this.localStorageSupported = typeof window['localStorage'] != 'undefined' && window['localStorage'] != null;
  }

  addItem(key: string, value: string) {
    if (this.localStorageSupported) {
      this.localStorage.setItem(key, value);
      return true;
    }
    return;
  }

  getItem(key: string) {
    if (this.localStorageSupported) {
      return this.localStorage.getItem(key);
    }
    return;
  }

  getAllKeys() {
    return Object.keys(this.localStorage);
  }

  clearLocalStorage() {
    if (this.localStorageSupported) {
      this.localStorage.clear();
      return true;
    }
    return;
  }
}
