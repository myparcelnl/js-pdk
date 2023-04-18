<template>
  <BaseButton
    :class="[
      'active:bg-orange-800',
      'bg-orange-600',
      'duration-75',
      'focus:bg-orange-700',
      'hover:bg-orange-700',
      'rounded-full',
      'text-white',
      'transition-colors',
      'whitespace-nowrap',
      {
        'cursor-not-allowed': disabled,
        'cursor-loading animate-pulse': loading,
      },
    ]"
    :disabled="disabled || loading"
    :size="size"
    @click="$emit('click')">
    <PdkIcon
      v-if="icon"
      :icon="icon"
      class="mr-1" />
    <slot>
      {{ translate(label) }}
    </slot>
  </BaseButton>
</template>

<script lang="ts" setup>
import {AdminIcon, useLanguage} from '@myparcel-pdk/frontend-admin-core/src';
import BaseButton from './BaseButton.vue';
import {PropType} from 'vue';
import {Size} from '@myparcel-pdk/common/src';

defineProps({
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

const {translate} = useLanguage();
</script>
