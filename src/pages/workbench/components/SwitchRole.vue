<script setup lang="ts">
  import { ref, toRefs } from 'vue';
  import { useUserStore } from '@/store/modules/user';

  const isVisible = ref(false);
  const $userStore = useUserStore();
  const { currentRole, rolesFull } = toRefs($userStore);
  const menuItems = ref<any[]>([]);

  // 选择事件
  const chooseItem = (itemParams: any) => {
    console.log(itemParams);

    $userStore.setCurrentRole(itemParams.roleId);
  };

  // 构建菜单
  const buildMenuItems = () => {
    menuItems.value = rolesFull?.value.map((item) => {
      return {
        name: item.roleName,
        roleId: item.roleId,
        roleKey: item.roleKey,
        disable: item.roleId === currentRole.value.roleId,
      };
    });
  };

  defineExpose({
    show: () => {
      buildMenuItems();
      isVisible.value = true;
    },
  });
</script>

<template>
  <NutActionSheet
    v-model:visible="isVisible"
    :menu-items="menuItems"
    cancel-txt="取消"
    @choose="chooseItem"
  />
</template>
