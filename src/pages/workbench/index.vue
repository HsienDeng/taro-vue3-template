<template>
  <view class="page">
    <view class="profile-card">
      <view class="wrapper">
        <view class="profile-info">
          <nut-avatar size="large">
            <img
              src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
              alt="头像"
              class="avatar"
            />
          </nut-avatar>
          <view class="profile-text">
            <text class="profile-name">{{ userInfo.nickName }}</text>
            <text class="profile-role">当前角色：{{ currentRole.roleName }}</text>
          </view>
        </view>
        <nut-button
          v-if="roles && roles.length > 1"
          size="small"
          type="primary"
          class="role-switch-btn"
          @click="switchRoleClick"
        >
          切换角色
        </nut-button>
      </view>
    </view>

    <view class="menu-list">
      <div class="item bg-white p-2">
        <div class="">项目审查</div>
        <nut-grid :column-num="3">
          <nut-grid-item text="text">1</nut-grid-item>
          <nut-grid-item text="text">2</nut-grid-item>
          <nut-grid-item text="text">3</nut-grid-item>
        </nut-grid>
      </div>
    </view>

    <SwitchRole ref="switchRoleRef" />
  </view>
</template>

<script setup lang="ts">
  import SwitchRole from './components/SwitchRole.vue';

  import { ref, toRefs } from 'vue';
  import { useUserStore } from '@/store/modules/user';

  const $store = useUserStore();
  const { userInfo, currentRole, roles } = toRefs($store);
  const switchRoleRef = ref();

  const switchRoleClick = () => {
    switchRoleRef.value?.show();
  };

  $store.setUserInfo();
</script>

<style lang="less">
  .page {
    box-sizing: border-box;
    min-height: 100vh;
    background-color: #f5f5f5;

    .avatar {
      width: 100%;
      height: 100%;
    }
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
