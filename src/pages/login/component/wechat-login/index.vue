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

<script setup>
  import { computed, onMounted } from 'vue';
  import Taro from '@tarojs/taro';
  import { LoginAction, useLoginAction } from '@/pages/login/hooks/useLogin';
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
    userStore
      .login({
        code,
        grant_type: 'wechat',
      })
      .finally(() => {
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
