<template>
  <NutSpace
    v-if="bolShow"
    direction="vertical"
    fill
    gutter="40rpx"
    className="wechat-action__login"
  >
    <NutButton
      type="primary"
      size="large"
      open-type="getPhoneNumber"
      @getphonenumber="getPhoneNumber"
    >
      手机号快捷登录
    </NutButton>
    <NutButton block size="large" @click="toggleLogin(LoginAction.PHONE)">
      手机号验证码登录
    </NutButton>
  </NutSpace>
</template>

<script setup lang="ts">
  import { computed, onMounted } from 'vue';
  import { LoginAction, useLoginAction } from '@/pages/login/hooks/useLogin';
  import Taro from '@tarojs/taro';
  import { login } from '@/api/user';
  import { useUserStore } from '@/store/modules/user';

  const userStore = useUserStore();
  /**
   * use toggle login action
   */
  const { action, toggleLogin } = useLoginAction();
  const bolShow = computed(() => {
    return action.value === LoginAction.WECHAT;
  });

  const handlePhoneNumber = (e) => {
    const { code, errMsg } = e.detail;
    if (errMsg !== 'getPhoneNumber:ok') {
      Taro.showModal({
        title: '您已拒绝授权，请重新点击并授权！',
        showCancel: false,
      });
      return [null];
    }
    return [code];
  };

  /**
   * 微信快捷登录
   */
  function getPhoneNumber(e) {
    const [code] = handlePhoneNumber(e);
    if (!code) return;
    Taro.showLoading({
      title: '正在登录中...',
      mask: true,
    });
    login({
      code,
      grant_type: 'wechat',
    })
      .then((res) => {
        Taro.hideLoading();
        if (!res.access_token) {
          Taro.showToast({
            title: '登录失败，请稍后重试。',
            icon: 'none',
          });
          return false;
        }
        userStore.loginAction(res);
      })
      .catch(() => {
        Taro.hideLoading();
      });
  }

  onMounted(() => {
    const token = Taro.getStorageSync('token');
    if (!!token) {
      Taro.reLaunch({
        url: '/pages/index/index',
      });
    }
  });
</script>

<style lang="scss">
  .wechat-action__login {
    margin-top: 20rpx;
  }
</style>
