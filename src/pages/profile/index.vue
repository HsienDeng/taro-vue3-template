<template>
  <div class="profile box-border">
    <div class="info-section">
      <nut-avatar :size="55" shape="square" src="">
        <img src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" alt="头像" />
      </nut-avatar>
      <div class="info">
        <p class="name">{{ $userStore.getNickName() }}</p>
        <p class="desc">{{ roleName }}</p>
      </div>
    </div>
    <div class="function-section">
      <CellGroup is-link>
        <nut-cell class="cell-m1" title="个人资料" icon="user" is-link />
        <nut-cell class="cell-m1" title="账号设置" icon="clear" is-link />
        <nut-cell class="cell-m1" title="版本信息" icon="info" value="V1.0.0" is-link />
        <nut-cell class="cell-m1" title="退出登录" icon="setting" is-link />
      </CellGroup>
    </div>
  </div>
</template>

<script setup>
  import { CellGroup } from '@nutui/nutui-taro';
  import { useUserStore } from '@/store/modules/user';

  const $userStore = useUserStore();

  const roleName = $userStore.currentRole?.roleName;
</script>

<style lang="scss">
  .profile {
    //padding: 0 32px;
    height: 100vh;
    background-color: $bg-color-grey;

    .info-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 32px 20px;
      background-color: $bg-color;

      .avatar {
        width: 100%;
        height: 100%;
      }

      .info {
        flex: 1;
        margin-left: 20px;

        .name {
          font-size: 40px;
          margin-bottom: 10rpx;
          font-weight: 500;
        }

        .desc {
          color: $text-color-grey;
          font-size: 26px;
        }
      }
    }

    .function-section {
      margin-top: 30px;

      .function-icon {
        width: 60px;
        height: 60px;
      }
    }
  }
</style>
