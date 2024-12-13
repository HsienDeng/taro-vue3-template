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

<script setup>
  import { WeChatLogin, PhoneLogin, PassWordLogin } from './component';
</script>

<style lang="scss">
  .login {
    height: 100vh;

    .app-logo {
      background-color: $primary-color;
      text-align: center;
      color: #fff;
      padding: 80rpx 0;
      margin-bottom: 80rpx;

      .title {
        color: #fff;
        margin-top: 10px;
        font-size: 50rpx;
      }
    }

    .login-code-img {
      height: 60rpx;
      width: 180rpx;
    }

    &-container {
      padding: 0 80px;

      .active-text {
        color: $primary-color;
      }

      .footer {
        display: flex;
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
      .footer.space {
        justify-content: space-between;
      }
      .footer.end {
        justify-content: flex-end;
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
