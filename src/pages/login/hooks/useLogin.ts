import { computed, ref } from 'vue';
import { createGlobalState } from '@vueuse/core';

export enum LoginAction {
  WECHAT,
  PHONE,
  PASSWORD,
}

/**
 * 切换登录方式 hook
 */
export const useLoginAction = createGlobalState(() => {
  const _action = ref(LoginAction.WECHAT);

  const action = computed(() => {
    return _action.value;
  });

  // 切换
  const toggleLogin = (ac: LoginAction) => {
    _action.value = ac;
  };

  return {
    action,
    toggleLogin,
  };
});
