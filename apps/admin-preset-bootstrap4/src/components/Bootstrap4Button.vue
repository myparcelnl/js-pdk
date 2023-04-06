<template>
  <BaseButton
    :class="sizeClasses"
    class="btn btn-primary text-nowrap"
    v-bind="$props"
    @click="$emit('click')">
    <slot />
  </BaseButton>
</template>

<script lang="ts" setup>
/* eslint-disable vue/no-unused-properties */
import {PropType, computed} from 'vue';
import {AdminIcon} from '@myparcel-pdk/frontend-admin-core/src';
import BaseButton from './common/BaseButton.vue';
import {Size} from '@myparcel-pdk/common/src';

const props = defineProps({
  disabled: {
    type: Boolean,
  },

  icon: {
    type: String as PropType<AdminIcon>,
    default: null,
  },

  label: {
    type: String,
    default: null,
  },

  loading: {
    type: Boolean,
  },

  size: {
    type: String as PropType<Size>,
    default: 'md',
  },
});

defineEmits(['click']);

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'btn-sm';
    case 'lg':
      return 'btn-lg';
    default:
      return '';
  }
});
</script>
