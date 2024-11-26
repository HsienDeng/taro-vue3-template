<template>
  <view class="page">
    <view class="profile-card">
      <view class="wrapper">
        <view class="profile-info">
          <nut-avatar size="large" src="/cat-avatar.png" />
          <view class="profile-text">
            <text class="profile-name">邓贤</text>
            <text class="profile-role">当前角色：执检秘书</text>
          </view>
        </view>
        <nut-button size="small" type="primary" class="role-switch-btn"> 切换角色 </nut-button>
      </view>
    </view>

    <view class="menu-list">
      <nut-cell-group>
        <nut-cell title="项目审查" is-link @click="handleNavigate('/pages/project-review/index')" />
        <nut-cell
          title="委员审查"
          is-link
          @click="handleNavigate('/pages/committee-review/index')"
        />
        <nut-cell
          title="电子签名签章"
          is-link
          @click="handleNavigate('/pages/electronic-signature/index')"
        />
      </nut-cell-group>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { useUserStore } from '@/store/modules/user';
  import { Router } from 'tarojs-router-next';

  const $store = useUserStore();

  console.log($store.userInfo);
  // Navigation handler
  const handleNavigate = (url: string) => {
    console.log(url);
    Router.toProfile();
  };

  $store.setUserInfo();
</script>

<style lang="less">
  .page {
    box-sizing: border-box;
    min-height: 100vh;
    background-color: #f5f5f5;
  }

  .profile-card {
    padding: 32rpx;

    .wrapper {
      padding: 32rpx;

      background: #ffffff;
      border-radius: 16rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .profile-info {
      display: flex;
      align-items: center;
      gap: 24rpx;
    }

    .profile-text {
      display: flex;
      flex-direction: column;
      gap: 8rpx;
    }

    .profile-name {
      font-size: 32rpx;
      font-weight: 500;
      color: #333;
    }

    .profile-role {
      font-size: 28rpx;
      color: #666;
    }

    .role-switch-btn {
      font-size: 28rpx;
    }
  }

  .menu-list {
    margin: 0 32rpx;
    overflow: hidden;
  }
</style>
