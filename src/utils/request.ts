import axios, {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';

interface PendingType {
  url?: string;
  method?: Method;
  params?: string;
  data?: string;
  // eslint-disable-next-line no-unused-vars
  cancel?: (str: string) => void;
}

// 取消重复请求
const pending: Array<PendingType> = [];
const { CancelToken } = axios;

const removePending = (config: AxiosRequestConfig) => {
  for (const key in pending) {
    const index: number = +key;
    const item: PendingType = pending[key];
    if (
      item.url === config.url &&
      item.method === config.method &&
      JSON.stringify(item.params) === JSON.stringify(config.params) &&
      JSON.stringify(item.data) === JSON.stringify(config.data)
    ) {
      item.cancel('操作太频繁，请稍后再试！！！');
      pending.splice(index, 1);
    }
  }
};

interface NewAxiosInstance extends AxiosInstance {
  // eslint-disable-next-line no-unused-vars
  <T>(url: string, config: AxiosRequestConfig): Promise<T>;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
}

const instance: NewAxiosInstance = axios.create({
  timeout: 10000,
  responseType: 'json',
});

instance.interceptors.request.use(
  (request) => {
    removePending(request);
    request.cancelToken = new CancelToken((c) => {
      pending.push({ c } as PendingType);
    });
    return request;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => {
    removePending(response.config);
    const errorCode = response?.data?.errorCode;
    switch (errorCode) {
      case '401':
        // 根据errorCode，对业务做异常处理
        break;
      default:
        break;
    }

    return response;
  },
  (error) => {
    const response = error.response;

    // 根据返回的http状态码做不同的处理
    switch (response?.status) {
      case 401:
        // token失效
        break;
      case 403:
        // 没有权限
        break;
      case 500:
        // 服务端错误
        break;
      case 503:
        // 服务端错误
        break;
      default:
        break;
    }

    // 超时重新请求
    const config = error.config;
    // 全局的请求次数,请求的间隙
    const [RETRY_COUNT, RETRY_DELAY] = [3, 1000];

    if (config && RETRY_COUNT) {
      // 设置用于跟踪重试计数的变量
      config.__retryCount = config.__retryCount || 0;
      // 检查是否已经把重试的总数用完
      if (config.__retryCount >= RETRY_COUNT) {
        return Promise.reject(response || { message: error.message });
      }
      // 增加重试计数
      config.__retryCount++;
      // 创造新的Promise来处理指数后退
      const backoff = new Promise((resolve) => {
        setTimeout(() => {
          resolve('');
        }, RETRY_DELAY || 1);
      });
      // instance重试请求的Promise
      return backoff.then(() => {
        return instance(config);
      });
    }

    // eslint-disable-next-line
    return Promise.reject(response || { message: error.message });
  },
);

export default instance;
