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

<script setup lang="ts">
  import { CellGroup } from '@nutui/nutui-taro';
  import { useUserStore } from '@/store/modules/user';

  const $userStore = useUserStore();

  const roleName = $userStore.currentRole?.roleName;
</script>

<style lang="scss">
  @import './index.scss';
</style>
