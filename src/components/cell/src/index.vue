<template>
  <div :class="rootClass"> 123 </div>
</template>

<script setup lang="ts">
  import { computed, PropType } from 'vue';
  import { createComponent } from '@/utils/create/component';

  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      required: true,
    },
    descTextAlign: {
      type: String as PropType<'left' | 'center' | 'right'>,
      default: 'right',
    },
    isLink: {
      type: Boolean,
      default: true,
    },
    roundRadius: {
      type: Number,
      default: 6,
    },
    center: {
      type: Boolean,
      default: false,
    },
  });
  const { componentName } = createComponent('cell');

  const rootClass = computed(() => {
    const preCls = componentName;
    return {
      [preCls]: true,
      [`${preCls}--clickable`]: props.isLink,
    };
  });
</script>

<style lang="scss">
  .ghc-cell {
    position: relative;

    &--clickable {
      cursor: pointer;

      &::before {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        background-color: #000;
        transform: translate(-50%, -50%);
        opacity: 0;
        content: ' ';
      }
    }
  }
</style>
