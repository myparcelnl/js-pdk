<template>
  <div>
    <PdkButton @click="toggle = !toggle"
      >{{ toggle ? 'Hide' : 'Show' }} {{ title }}</PdkButton
    >

    <div v-show="toggle">
      <pre v-text="data" />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'DebugView',

  props: {
    title: {
      type: String,
      required: true,
    },

    data: {
      type: [String, Object, Array, Number],
      required: true,
    },
  },

  setup: () => {
    return {
      toggle: ref(false),
    };
  },
});
</script>
