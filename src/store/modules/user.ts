import store from '@/store';
import { defineStore } from 'pinia';
import Taro from '@tarojs/taro';
import { login } from '@/api/user';
import { awaitWrap } from '@/utils/ghc';
import { selectUserInfo } from '@/api/user';
import { UserInfoVo } from '@/api/user/types';

interface UserState extends UserInfoVo {
  token: string;
  loginInfo: any;
  userInfo: any;
}

export const useUserStore = defineStore({
  id: 'auth',
  state: (): UserState => ({
    token: '',
    loginInfo: {},
    userInfo: {},
    rolesFull: [],
    roles: [],
    permissions: [],
  }),
  actions: {
    pwdLoginAction() {
      return;
    },
    setUserInfo() {
      selectUserInfo().then((res) => {
        const { user, rolesFull, permissions, roles } = res;
        this.userInfo = user;
        this.rolesFull = rolesFull;
        this.permissions = permissions;
        this.roles = roles;
        console.log(res);
      });
    },
    /* 通用登录 */
    async login(data: any) {
      Taro.showLoading({
        title: '正在登录中...',
        mask: true,
      });
      const [res, nil] = await awaitWrap(login(data));
      Taro.hideLoading();
      if (nil) {
        return Promise.reject(nil);
      }
      if (!res.access_token) {
        Taro.showToast({
          title: '登录失败，请稍后重试。',
          icon: 'none',
        });
        return false;
      }
      await this.loginAction(res);
      return Promise.resolve();
    },
    /**
     * 登录成功后的操作
     */
    async loginAction(data) {
      this.loginInfo = data;
      this.token = data.access_token;
      Taro.setStorageSync('token', data.access_token);
      Taro.reLaunch({
        url: '/pages/workbench/index',
      });
    },
  },
});

// 外部使用
export function useAsyncUserStoreWithOut() {
  return useUserStore(store);
}
