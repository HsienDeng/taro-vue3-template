import Taro from '@tarojs/taro';

interface AdapterConfig extends Taro.request.Option {
  baseURL: string;
  data: any;
  headers: any;
  timeout: number;
}

interface ErrorCallBack extends TaroGeneral.CallbackResult {
  statusCode: number;
  header: TaroGeneral.IAnyObject;
}

/**
 * taro请求适配器
 * @param config
 * @returns
 */
export default function taroAdapter<T>(config: AdapterConfig): Promise<T> {
  return new Promise((resolve, reject) => {
    // header
    const headers = {
      ...config.headers,
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const token = Taro.getStorageSync('token');
    if (token) {
      headers['Authorization'] = 'Bearer ' + token;
    }

    Taro.request({
      ...config,
      url: config.baseURL + config.url,
      data: config.data,
      method: config.method,
      header: headers,
      timeout: config.timeout,
      success: function (res) {
        const { code } = res.data;
        if (code !== 200) {
          codeHandle(code);
          if (!res.data.msg) {
            res.data.msg = '请求失败';
          }
          reject(res.data);
        }
        resolve(res.data);
      },
      fail: function (err: ErrorCallBack) {
        const error = {
          ...err,
          status: err.statusCode,
          statusText: err.errMsg,
          headers: err.header,
          config: config,
          request: null,
        };
        reject(error);
      },
    });
  });
}

/**
 * code 处理
 * @param status
 * @returns
 */
function codeHandle(status) {
  switch (status) {
    // 401: 未登录状态
    case 401:
    case 403:
      Taro.removeStorageSync('token');
      Taro.reLaunch({
        url: '/pages/login/index',
      });
      break;
    default:
      return null;
  }
}
