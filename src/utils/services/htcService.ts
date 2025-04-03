import {
    attachCommonErrorInterceptor,
    attachStatusCodeErrorInterceptor,
  } from "./interceptors";
  import { Api, HttpClient } from "./Api";
//   import { ClientApi } from "./clientApi";
  
  const httpClient = new HttpClient({
    withCredentials: true,
    timeout: 30 * 1000,
  });
  
  httpClient.instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config;
    },
    (error) => Promise.reject(error)
  )
  
  // Order is important here. These interceptors will be executed in reverse order of attachment
  attachCommonErrorInterceptor(httpClient.instance);
  attachStatusCodeErrorInterceptor(httpClient.instance);
  
  export const htcService = new Api(httpClient);
//   export const clientService = new ClientApi(httpClient);