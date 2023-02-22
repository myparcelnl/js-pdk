<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  /**
   * The number of columns to span.
   */
  // eslint-disable-next-line vue/no-unused-properties
  span?: number;

  /**
   * The width of the row.
   */
  // eslint-disable-next-line vue/no-unused-properties
  width?: string;
}>();
</script>
