<template>
  <div class="login">
    <div class="login-header">
      <AppLogo />
    </div>

    <div class="login-container">
      <WeChatLogin />
      <PhoneLogin />
      <PassWordLogin />
    </div>
  </div>
</template>

<script setup lang="ts">
  import AppLogo from '@/components/app-logo/index.vue';
  import { WeChatLogin, PhoneLogin, PassWordLogin } from './component';
</script>

<style lang="scss">
  .login {
    height: 100vh;

    &-header {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      padding: 0 40px;
      box-sizing: border-box;
      height: 350px;
      background-size: 100% 100%;
      margin-top: 200rpx;
    }

    &-container {
      padding: 0 80px;

      .active-text {
        color: $primary-color;
      }

      .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 60px;
        font-size: var(--nut-checkbox-label-font-size, 28rpx);

        .tip {
          //font-size: 24rpx;
          color: #999999;
        }

        .to-login {
          color: $primary-color;
        }
      }
    }

    .nut-cell {
      padding: 26rpx 0 !important;
    }
    .nut-cell-group__wrap {
      box-shadow: none !important;
    }
    .nut-cell-group .nut-cell::after {
      left: 0 !important;
      right: 0 !important;
      border-bottom: var(--nut-cell-after-border-bottom, 2rpx solid #d1d1d1);
    }
    .nut-form-item.error.line::before {
      left: 0 !important;
      right: 0 !important;
    }
  }
</style>
