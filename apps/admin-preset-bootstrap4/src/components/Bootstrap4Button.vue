<template>
  <BaseButton
    :disabled="disabled"
    :icon="icon"
    :label="label"
    class="btn btn-primary text-nowrap"
    @click="$emit('click')">
    <slot />
  </BaseButton>
</template>

<script setup lang="ts">
import {AdminIcon} from '@myparcel-pdk/frontend-core/src';
import BaseButton from './common/BaseButton.vue';
import {PropType} from 'vue';

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
    default: 'action_save',
  },
});

defineEmits(['click']);
</script>
