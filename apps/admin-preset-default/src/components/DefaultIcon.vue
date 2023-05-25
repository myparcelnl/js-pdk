<template>
  <i v-text="icon" />
</template>

<script lang="ts" setup>
import {PropType} from 'vue';
import {AdminIcon} from '@myparcel-pdk/frontend-admin-core';

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
