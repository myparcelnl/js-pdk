<template>
  <div v-test="AdminComponent.Row">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {AdminComponent} from '@myparcel-pdk/common';

defineProps<{
  /**
   * The width of the row.
   */
  // eslint-disable-next-line vue/no-unused-properties
  width?: string;
}>();
</script>
