<template>
  <img
    v-test="AdminComponent.Image"
    v-bind="$props" />
</template>

<script lang="ts" setup>
/* eslint-disable vue/no-unused-properties */
import {AdminComponent} from '@myparcel-pdk/common';

/**
 * Image component.
 */
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
