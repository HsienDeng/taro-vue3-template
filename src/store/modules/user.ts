import { defineStore } from 'pinia';
import Taro from '@tarojs/taro';
import { login } from '@/api/user';
import { awaitWrap } from '@/utils/ghc';

export const useUserStore = defineStore({
  id: 'auth',
  state: () => ({
    token: '',
    loginInfo: {},
    userInfo: {},
  }),

  actions: {
    pwdLoginAction() {
      return;
    },
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
      console.log(data);
      this.loginInfo = data;
      this.token = data.access_token;
      Taro.setStorageSync('token', data.access_token);
      Taro.reLaunch({
        url: '/pages/index/index',
      });
    },
  },
});
