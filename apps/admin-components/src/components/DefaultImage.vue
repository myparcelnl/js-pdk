<template>
  <img
    :alt="alt"
    :height="height"
    :src="src"
    :title="title"
    :width="width" />
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'DefaultImage',

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
