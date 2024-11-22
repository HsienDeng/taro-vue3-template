import http from '@/utils/http';
import { LoginResult } from '@/api/user/types';

/** 登录固定传参 */
const client_id = 'ctms';
const client_secret = 'chengshuang';
const grant_type = 'password';
const scope = 'server';
const app_id = '2';

/**
 * 登录
 */
export function login(params: any): Promise<LoginResult> {
  params = {
    client_id,
    client_secret,
    grant_type,
    app_id,
    scope,
    ...params, //以最新的传参为准
  };
  if (params.grant_type === 'wechat') {
    delete params.app_id;
  }
  return http.get('/auth/oauth/token', {
    params,
  });
}

/** 获取图形验证码 */
export function getImageCode() {
  return http.get('/code');
}

/** 获取短信验证码 */
export function sendSmsCode(data) {
  return http.post('/system/sms/sendSMS', {
    data,
  });
}
