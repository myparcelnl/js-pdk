<template>
  <button
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

<script setup lang="ts">
import {AdminIcon, useLanguage} from '@myparcel-pdk/frontend-core/src';
import {defineProps} from 'vue';

defineProps<{
  disabled?: boolean;
  icon?: AdminIcon;
  label?: string;
}>();

defineEmits<(event: 'click') => void>();

const {translate} = useLanguage();
</script>
