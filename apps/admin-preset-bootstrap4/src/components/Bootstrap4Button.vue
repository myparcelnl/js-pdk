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
import {defineProps} from 'vue';

defineProps<{
  disabled?: boolean;
  icon?: AdminIcon;
  label?: string;
}>();

defineEmits<(event: 'click') => void>();
</script>
