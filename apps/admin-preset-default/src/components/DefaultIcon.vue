<template>
  <i v-text="icon" />
</template>

<script lang="ts" setup>
import {AdminIcon} from '@myparcel-pdk/frontend-admin-core';
import {PropType} from 'vue';

defineProps({
  /**
   * The icon to display.
   */
  icon: {
    type: String as PropType<AdminIcon>,
    required: true,
  },
});
</script>
