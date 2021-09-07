import { ServiceLocator } from './ServiceLocator';
import { ApiService } from './ApiService';
import { LocalStorageService } from './LocalStorageService';

class BaseService {
  protected rootService: ServiceLocator;
  protected api: ApiService;
  protected localStorage: LocalStorageService;

  constructor(rootService: ServiceLocator) {
    this.rootService = rootService;
    this.api = new ApiService();
    this.localStorage = new LocalStorageService();
  }
}

export { BaseService };
