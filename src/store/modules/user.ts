import { defineStore } from 'pinia';
import Taro from '@tarojs/taro';

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
