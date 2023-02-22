<template>
  <img
    :alt="alt"
    :height="height"
    :src="src"
    :title="title"
    :width="width"
    class="img-responsive" />
</template>

<script setup lang="ts">
defineProps<{
  src: string;
  alt: string;
  title?: string;
  width?: number | string;
  height?: number | string;
}>();
</script>
