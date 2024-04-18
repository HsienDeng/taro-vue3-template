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
      微信快捷登录
    </NutButton>
    <NutButton block size="large" @click="toggleLogin(LoginAction.PHONE)"> 手机号码登录</NutButton>
  </NutSpace>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { LoginAction, useLoginAction } from "@/pages/login/hooks/useLogin";
import Taro from "@tarojs/taro";
import { wechatCodeLogin } from "@/api/user";
import { useUserStore } from "@/store/modules/user";

const userStore = useUserStore();
/**
 * use toggle login action
 */
const { action, toggleLogin } = useLoginAction();
const bolShow = computed(() => {
  return action.value === LoginAction.WECHAT;
});

/**
 * 微信快捷登录
 */
function getPhoneNumber(e) {
  const { code, errMsg } = e.detail;
  if (errMsg !== "getPhoneNumber:ok") {
    Taro.showToast({
      title: errMsg,
      icon: "none",
    });
    return false;
  }
  Taro.showLoading({
    title: "正在登录中...",
    mask: true,
  });
  wechatCodeLogin({
    code,
  })
    .then((res) => {
      if (!res.data) {
        Taro.showToast({
          title: "登录失败，请稍后重试。",
          icon: "none",
        });
        return false;
      }
      Taro.hideLoading();
      userStore.loginAction(res);
    })
    .catch((err) => {
      Taro.hideLoading();
      Taro.showToast({
        title: err.msg,
        icon: "none",
      });
    });
}

onMounted(() => {
  const token = Taro.getStorageSync("token");
  if (!!token) {
    Taro.reLaunch({
      url: "/pages/index/index",
    });
  }
});
</script>

<style lang="scss">
.wechat-action__login {
  margin-top: 20rpx;
}
</style>
