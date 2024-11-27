import Taro from '@tarojs/taro';
import apiConfig from '@/api.config';
import { Router } from 'tarojs-router-next';

/**
 * 处理错误
 * @param code
 * @param msg
 */
const handleResponseError = (code: number, msg: string) => {
  switch (code) {
    case 400:
      Taro.showToast({
        title: msg || '请求错误，请联系管理员解决',
        icon: 'error',
      });
      break;
    case 401:
      Taro.showModal({
        title: '提示',
        content: '登录已过期，请重新登录！',
      }).then(() => {
        Taro.removeStorageSync('token');
        Router.toLogin();
      });
      break;
    case 404:
      Taro.showToast({
        title: msg || '资源不存在',
        icon: 'error',
      });
      break;
    default:
      Taro.showToast({
        title: msg || '请求错误，请联系管理员解决',
        icon: 'error',
      });
  }
};

/**
 * 处理请求
 * @param res
 */
const handleResponse = (res) => {
  const code = res.data.code || res.statusCode;
  console.log(code);
  if (code && code !== 200) {
    const errorMsg = res.data.msg || '网络错误，请稍候重试';
    handleResponseError(code, errorMsg);
    return [null, res.data];
  }
  return [res.data, null];
};

/**
 * 网络请求拦截器
 * @param chain
 */
const interceptor = (chain) => {
  return new Promise((resolve, reject) => {
    const requestParams = chain.requestParams;
    const token = Taro.getStorageSync('token');
    if (token) {
      requestParams.header['Authorization'] = 'Bearer ' + token;
    }
    return chain
      .proceed(requestParams)
      .then((res: Promise<any>) => {
        const [data, nil] = handleResponse(res);
        if (nil) {
          return reject(data);
        }
        return resolve(data);
      })
      .catch((err) => reject(err));
  });
};

Taro.addInterceptor(interceptor);

/**
 * 请求
 * @param method
 * @param url
 * @param config
 */
const request = (method, url, config): Promise<any> => {
  let contentType = config?.data ? 'application/json' : 'application/x-www-form-urlencoded';
  if (config) contentType = config?.headers?.contentType || contentType;
  const option = {
    method,
    isShowLoading: false,
    url: apiConfig.baseUrl + url,
    data: config && (config?.data || config?.params),
    header: {
      'content-type': contentType,
    },
  };
  return Taro.request(option);
};

export default {
  get: (url: string, config?: any) => {
    return request('GET', url, config);
  },
  post: (url: string, config?: any) => {
    return request('POST', url, config);
  },
};
