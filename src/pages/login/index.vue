<template>
  <div class="login">
    <div class="app-logo">
      <div class="title">临床试验研究中心</div>
    </div>

    <div class="login-container">
      <WeChatLogin />
      <PhoneLogin />
      <PassWordLogin />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { WeChatLogin, PhoneLogin, PassWordLogin } from './component';
</script>

<style lang="scss">
  .login {
    height: 100vh;

    .app-logo {
      background-color: $primary-color;
      text-align: center;
      color: #fff;
      padding: 100rpx 0;
      margin-bottom: 80rpx;

      .title {
        color: #fff;
        margin-top: 10px;
        font-weight: bold;
        font-size: 40px;
      }
    }

    &-container {
      padding: 0 80px;

      .active-text {
        color: $primary-color;
      }

      .footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 40px;
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
