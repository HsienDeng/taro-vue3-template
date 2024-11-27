import store from '@/store';
import { defineStore } from 'pinia';
import Taro from '@tarojs/taro';
import { loginRequest } from '@/api/user';
import { awaitWrap } from '@/utils/ghc';
import { selectUserInfo } from '@/api/user';
import { UserVo } from '@/api/user/types';
import { ref } from 'vue';

export const useUserStore = defineStore(
  'userStore',
  () => {
    const token = ref('');
    const userInfo = ref<UserVo>();
    const roles = ref<string[]>();
    const permissions = ref<string[]>();

    const pwdLoginAction = () => {
      return;
    };

    /* 设置用户信息 */
    function setUserInfo() {
      selectUserInfo().then((res) => {
        userInfo.value = res.user;
        console.log(userInfo.value);
        permissions.value = res.permissions;
        roles.value = res.roles;
      });
    }

    /* 通用登录 */
    async function login(data: any) {
      Taro.showLoading({
        title: '正在登录中...',
        mask: true,
      });
      const [res, nil] = await awaitWrap(loginRequest(data));
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
      await loginAction(res);
      return Promise.resolve();
    }
    /**
     * 登录成功后的操作
     */
    async function loginAction(data) {
      Taro.setStorageSync('token', data.access_token);
      Taro.reLaunch({
        url: '/pages/workbench/index',
      });
    }

    return {
      token,
      userInfo,
      roles,

      login,
      pwdLoginAction,
      setUserInfo,
    };
  },
  {
    persist: {
      key: 'userStore',
    },
  },
);

//
//
// export const useUserStore = defineStore(
//   'userStore',
//   {
//     state: (): UserState => ({
//       token: '',
//       loginInfo: {},
//       userInfo: {},
//       rolesFull: [],
//       roles: [],
//       permissions: [],
//     }),
//     actions: {
//       pwdLoginAction() {
//         return;
//       },
//       setUserInfo() {
//         selectUserInfo().then((res) => {
//           const { user, rolesFull, permissions, roles } = res;
//           this.userInfo = user;
//           this.rolesFull = rolesFull;
//           this.permissions = permissions;
//           this.roles = roles;
//         });
//       },
//       /* 通用登录 */
//       async login(data: any) {
//         Taro.showLoading({
//           title: '正在登录中...',
//           mask: true,
//         });
//         const [res, nil] = await awaitWrap(login(data));
//         Taro.hideLoading();
//         if (nil) {
//           return Promise.reject(nil);
//         }
//         if (!res.access_token) {
//           Taro.showToast({
//             title: '登录失败，请稍后重试。',
//             icon: 'none',
//           });
//           return false;
//         }
//         await this.loginAction(res);
//         return Promise.resolve();
//       },
//       /**
//        * 登录成功后的操作
//        */
//       async loginAction(data) {
//         this.loginInfo = data;
//         this.token = data.access_token;
//         Taro.setStorageSync('token', data.access_token);
//         Taro.reLaunch({
//           url: '/pages/workbench/index',
//         });
//       },
//     },
//   },
//   {
//     persist: {
//       key: 'userStore',
//     },
//   },
// );

// 外部使用
export function useAsyncUserStoreWithOut() {
  return useUserStore(store);
}
