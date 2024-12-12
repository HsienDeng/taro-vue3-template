<template>
  <view class="page">
    <view class="profile-card">
      <view class="wrapper">
        <view class="profile-info">
          <nut-avatar size="large">
            <image src="@/assets/images/avatar-default.jpg" class="avatar" />
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
      <nut-cell-group>
        <nut-cell title="项目审查" is-link @click="handleNavigate(ProjectReviewPath.approval)" />
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

    <SwitchRole ref="switchRoleRef" />
  </view>
</template>

<script setup lang="ts">
  import SwitchRole from './components/SwitchRole.vue';

  import { ref, toRefs } from 'vue';
  import { Router } from 'tarojs-router-next';
  import { useUserStore } from '@/store/modules/user';
  import { ProjectReviewPath } from '@/pages/project-review/const';

  const $store = useUserStore();
  const { userInfo, currentRole, roles } = toRefs($store);
  const switchRoleRef = ref();

  const handleNavigate = (url: string) => {
    Router.navigate({ url });
  };

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
