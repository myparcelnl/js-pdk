<template>
  <button
    :class="
      ([
        'active:bg-orange-800',
        'bg-orange-600',
        'duration-75',
        'focus:bg-orange-700',
        'hover:bg-orange-700',
        'rounded-full',
        'text-white',
        'transition-colors',
        'select-none',
      ],
      sizeClasses)
    "
    :disabled="disabled"
    type="button"
    @click="$emit('click')">
    <PdkIcon
      v-if="icon"
      :icon="icon"
      class="mr-1" />
    <slot>
      {{ translate(label) }}
    </slot>
  </button>
</template>

<script lang="ts" setup>
import {AdminIcon, useLanguage} from '@myparcel-pdk/frontend-core/src';
import {PropType, computed} from 'vue';
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
    default: 'action_save',
  },

  size: {
    type: String as PropType<Size>,
    default: Size.MEDIUM,
  },
});

defineEmits(['click']);

const {translate} = useLanguage();

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
