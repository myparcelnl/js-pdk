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
    <slot />
  </button>
</template>

<script lang="ts" setup>
import {computed, type PropType} from 'vue';
import {Size} from '@myparcel-dev/pdk-admin';

const props = defineProps({
  disabled: {
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
    case Size.Small:
      return 'px-2 py-1 text-sm';

    case Size.Large:
      return 'px-4 py-2 text-lg';

    default:
      return 'px-3 py-1';
  }
});
</script>
