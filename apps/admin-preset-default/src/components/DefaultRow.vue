<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  /**
   * The width of the row.
   */
  // eslint-disable-next-line vue/no-unused-properties
  width?: string;
}>();
</script>
