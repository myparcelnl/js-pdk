<template>
  <img
    :alt="alt"
    :height="height"
    :src="src"
    :title="title"
    :width="width" />
</template>

<script lang="ts" setup>
defineProps<{
  /**
   * The source of the image.
   */
  src: string;

  /**
   * The alternative text of the image.
   */
  alt: string;

  /**
   * The title of the image.
   */
  title: string | null;

  /**
   * The width of the image.
   */
  width: number | string | null;

  /**
   * The height of the image.
   */
  height: number | string | null;
}>();
</script>
