<template>
  <button
    :class="[
      'select-none',
      sizeClasses,
      {
        'cursor-not-allowed': disabled,
        'opacity-50': disabled,
      },
    ]"
    :disabled="disabled"
    type="button"
    @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import {PropType, computed} from 'vue';
import {Size} from '@myparcel-pdk/common/src';

const props = defineProps({
  disabled: {
    type: Boolean,
  },

  size: {
    type: String as PropType<Size>,
    default: Size.MEDIUM,
  },
});

defineEmits(['click']);

const sizeClasses = computed(() => {
  switch (props.size) {
    case Size.SMALL:
      return 'px-2 py-1 text-sm';

    case Size.LARGE:
      return 'px-4 py-2 text-lg';

    default:
      return 'px-3 py-1';
  }
});
</script>
