import Taro from '@tarojs/taro';
import apiConfig from '@/api.config';

/**
 * 处理请求
 * @param res
 */
const handleResponse = (res) => {
  const { code, msg } = res.data;
  if (code && code !== 200) {
    const errorMsg = msg || '服务器异常';
    Taro.showToast({
      title: errorMsg,
      icon: errorMsg.length > 5 ? 'none' : 'error',
    });
    return res.data;
  }
  return res.data;
};

// 网络请求拦截器
const interceptor = (chain) => {
  const requestParams = chain.requestParams;
  const token = Taro.getStorageSync('token');
  requestParams.header = {
    ...requestParams.header,
    Authorization: 'Bearer ' + token,
  };
  return chain
    .proceed(requestParams)
    .then((res) => handleResponse(res))
    .catch(() => {
      Taro.showToast({
        title: '网络异常',
        icon: 'error',
      });
    });
};

Taro.addInterceptor(interceptor);

const request = async (method, url, params): Promise<any> => {
  let contentType = params?.data ? 'application/json' : 'application/x-www-form-urlencoded';
  if (params) contentType = params?.headers?.contentType || contentType;
  const option = {
    method,
    isShowLoading: false,
    url: apiConfig.baseUrl + url,
    data: params && (params?.data || params?.params),
    header: {
      'content-type': contentType,
    },
  };
  return await Taro.request(option);
};

export default {
  get: (url: string, config: any) => {
    return request('GET', url, config);
  },
  post: (url: string, config: any) => {
    return request('POST', url, config);
  },
};
