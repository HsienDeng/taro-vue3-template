import { http } from '@/utils/http';
import { Result } from '@/utils/http/type';

/**
 * 登录
 */
export function login(query): Result<{
  access_token: string;
}> {
  const url = '/auth/appLogin';
  return http.post(url, query);
}

/**
 * tk-319更新登录登录
 */
export function wechatCodeLogin(query) {
  const url = '/auth/app-login';
  return http.post(url, query);
}

/**
 * 登录
 */
export function logout() {
  const url = '/auth/logout';
  return http.delete(url);
}

/**
 * 注册
 */
export function register(query) {
  const url = '/auth/register';
  return http.post(url, query);
}

// 获取验证码
export function sendSms(phone, register = false) {
  const params = {
    smsTemplate: 'sms_mfs',
    phone: phone,
    register,
  };
  return http.post('/system/sms/send', params);
}
export function code2Session(query) {
  const url = '/miniApp/code2Session';
  return http.post(url, query);
}

/**
 * 修改密码
 */
export function updatePassWord(data) {
  const url = '/system/user/changePwd';
  return http.post(url, data);
}

// 获取验证码
export function getCodeImg() {
  return http.get('/code');
}

interface InfoType {
  user: any;
  userInfo: any;
  permissions: any;
}

// 获取个人信息
export function getUserInfo() {
  return http.get<InfoType>('/system/user/getInfo');
}

// 修改个人信息
export function updateUserInfo(data) {
  const url = '/system/user/updateUserInfo';
  return http.post(url, data);
}

// 查询个人中心信息
export function getUserInfoByUserId(params) {
  const url = '/system/user/getUserInfoByUserId';
  return http.get(url, params);
}

// 查询个人信息（非当前登录人）
export function getUserByUserId(params) {
  const url = '/system/user/' + params;
  return http.get(url, params);
}

// 获取二维码
export function getQRcode(params) {
  const url = '/system/user/getQRcode';
  return http.get(url, params);
}

// 修改密码
export function changePasswords(data) {
  const url = '/system/user/changePasswords';
  return http.post(url, data);
}

// 修改手机号
export function updatePhone(data) {
  const url = '/system/user/updatePhone';
  return http.post(url, data);
}

/**
 * 获取登录的加密密钥
 */
export function getKey() {
  const url = '/system/rsa/getKey';
  return http.get(url);
}
export function getAccessToken() {
  const url = '/auth/getAccessToken';
  return http.get(url);
}
export function getPhoneNumber(token, code) {
  const url = `/auth/getPhoneNumber?access_token=${token}&code=${code}`;
  return http.post(url);
}

// 忘记密码
export function changePwd(data) {
  const url = '/system/user/changePwd';
  return http.post(url, data);
}

/**
 * 第三方登录
 */
export function thirdLogin(data) {
  const url = '/system/thirdParty/ctriLogin';
  return http.post(url, data);
}

/**
 * 小程序角色排序
 */
export function updateAppAuthRoleOrder(data) {
  const url = '/system/app/role/updateAppAuthRoleOrder';
  return http.post(url, data);
}

/**
 * 更新userType
 */
export function updateUserUserType(data) {
  const url = '/system/user/updateUserUserType';
  return http.post(url, data);
}
