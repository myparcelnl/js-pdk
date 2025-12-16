<template>
  <img
    class="inline"
    v-bind="$props" />
</template>

<script lang="ts" setup>
/* eslint-disable vue/no-unused-properties */
/**
 * @see import('@myparcel-dev/pdk-admin-preset-default').DefaultImage
 */
defineProps<{
  src: string;
  alt: string;
  title?: string | null;
  width?: number | string | null;
  height?: number | string | null;
}>();
</script>
