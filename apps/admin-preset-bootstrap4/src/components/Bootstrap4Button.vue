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
import {computed, type PropType} from 'vue';
import {type AdminIcon, Size} from '@myparcel-pdk/admin';
import BaseButton from './common/BaseButton.vue';

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
    default: Size.Medium,
  },
});

defineEmits(['click']);

const sizeClasses = computed(() => {
  switch (props.size) {
    case Size.ExtraSmall:
    case Size.Small:
      return 'btn-sm';

    case Size.Large:
    case Size.ExtraLarge:
      return 'btn-lg';

    default:
      return '';
  }
});
</script>
