<template>
  <img
    class="img-responsive"
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
 */
export default defineComponent({
  name: 'Bootstrap4Image',

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
