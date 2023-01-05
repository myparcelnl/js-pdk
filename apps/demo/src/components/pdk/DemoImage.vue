<template>
  <img
    class="w-full"
    :src="src"
    :alt="alt"
    :title="title"
    :width="width"
    :height="height" />
</template>

<script lang="ts">
import {defineComponent} from 'vue';

/**
 * @see import('@myparcel/pdk-components').DefaultImage
 * @see import('@myparcel/pdk-components').DefaultImage
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
