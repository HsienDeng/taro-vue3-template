<!--
 * @Author: Coder Derek
 * @File: index.vue
 * @Software: WebStorm
 * @Description: profile
-->
<template>
  <div class="profile box-border">
    <div class="info-section">
      <nut-avatar size="large" shape="square">
        <image src="@/assets/images/avatar-default.jpg" class="avatar" />
      </nut-avatar>
      <div class="info">
        <p class="name">Breaking bad</p>
        <p class="desc">It's all good man</p>
      </div>
      <!--<div class="right">-->
      <!--  <IconFont name="arrow-right" size="15px" />-->
      <!--</div>-->
    </div>
    <div class="function-section">
      <CellGroup is-link>
        <nut-cell title="个人资料" center is-link>
          <template #icon>
            <image src="~@/assets/images/profile/profile.png" class="function-icon" />
          </template>
        </nut-cell>
        <nut-cell title="账号设置" center is-link>
          <template #icon>
            <image src="~@/assets/images/profile/setting.png" class="function-icon" />
          </template>
        </nut-cell>
      </CellGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { CellGroup } from '@nutui/nutui-taro';
</script>

<style scoped lang="scss">
  @import './index.scss';
</style>
