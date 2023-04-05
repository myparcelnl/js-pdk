<template>
  <img
    :alt="alt"
    :height="height"
    :src="src"
    :title="title"
    :width="width"
    class="w-full" />
</template>

<script lang="ts">
import {defineComponent} from 'vue';

/**
 * @see import('@myparcel-pdk/admin-preset-default').DefaultImage
 * @see import('@myparcel-pdk/admin-preset-default').DefaultImage
 */
export default defineComponent({
  name: 'DemoImage',

  props: {
    src: {
      type: String,
      required: true,
    },

    alt: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      default: null,
    },

    width: {
      type: [Number, String],
      default: null,
    },

    height: {
      type: [Number, String],
      default: null,
    },
  },
});
</script>
