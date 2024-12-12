import store from '@/store';
import { defineStore } from 'pinia';
import Taro from '@tarojs/taro';
import { loginRequest } from '@/api/user';
import { awaitWrap } from '@/utils/ghc';
import { selectUserInfo } from '@/api/user';
import { LoginResult, RolesFull, UserVo } from '@/api/user/types';
import { ref } from 'vue';

export const useUserStore = defineStore(
  'userStore',
  () => {
    const token = ref('');
    const currentRole = ref<RolesFull>({ roleId: 0, roleKey: '', roleName: '' });
    const userInfo = ref<UserVo>({ nickName: '', phonenumber: '', userId: 0, userName: '' });
    const rolesFull = ref<RolesFull[]>([]);
    const roles = ref<string[]>([]);
    const permissions = ref<string[]>();

    const pwdLoginAction = () => {
      return;
    };

    /* 设置用户信息 */
    function setUserInfo() {
      selectUserInfo().then((res) => {
        userInfo.value = res.user;
        permissions.value = res.permissions;
        roles.value = res.roles;
        rolesFull.value = res.rolesFull;

        if (!currentRole.value.roleId && res.rolesFull && res.rolesFull?.length > 0) {
          setCurrentRole();
        }
      });
    }

    /* 设置当前角色 */
    function setCurrentRole(roleId = null) {
      if (!roleId) {
        currentRole.value = rolesFull.value[0];
        return;
      }
      console.log(roleId);
      const rule = rolesFull.value.find((item) => item.roleId === roleId);
      console.log({ rule });
      if (rule) {
        currentRole.value = rule;
        console.log(currentRole.value);
      }
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
    async function loginAction(data: LoginResult) {
      Taro.setStorageSync('token', data.access_token);
      Taro.reLaunch({
        url: '/pages/workbench/index',
      });
    }

    return {
      token,
      userInfo,
      roles,
      currentRole,
      rolesFull,

      getNickName: () => userInfo.value.nickName,
      login,
      pwdLoginAction,
      setUserInfo,
      setCurrentRole,
    };
  },
  {
    persist: {
      key: 'userStore',
    },
  },
);

// 外部使用
export function useAsyncUserStoreWithOut() {
  return useUserStore(store);
}
