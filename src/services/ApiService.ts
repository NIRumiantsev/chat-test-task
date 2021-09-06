import axios, { AxiosInstance, AxiosResponse } from 'axios';

class ApiService {
  private apiService: AxiosInstance;

  constructor() {
    this.apiService = axios.create();
    this.apiService.interceptors.response.use(this.handleSuccess, this.handleError);
  }

  // eslint-disable-next-line
  private handleSuccess(response: AxiosResponse) {
    // Here we can put some operations in case of successful response
    return response;
  }

  // eslint-disable-next-line
  private handleError(error: any) {
    // Here we can put some operations in case of error
    return Promise.reject(error);
  }

  async get<T>(url: string) {
    const response = await this.apiService.get<T>(url, {
      ...this.apiService.defaults,
    });
    return response.data;
  }

  async post<T>(url: string, data?: any) {
    const response = await this.apiService.post<T>(url, data || '');
    return response.data;
  }

  async put<T>(url: string, data?: any) {
    const response = await this.apiService.post<T>(url, data || '');
    return response.data;
  }

  async delete<T>(url: string) {
    const response = await this.apiService.delete<T>(url);
    return response.data;
  }
}

export { ApiService };
