import { ServiceLocator } from './ServiceLocator';
import { ApiService } from './ApiService';

class BaseService {
  protected rootService: ServiceLocator;
  protected api: ApiService;

  constructor(rootService: ServiceLocator) {
    this.rootService = rootService;
    this.api = new ApiService();
  }
}

export { BaseService };
