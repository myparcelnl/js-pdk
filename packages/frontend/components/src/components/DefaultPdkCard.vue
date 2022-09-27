<template>
  <div class="border mb-4 overflow-hidden rounded-xl">
    <div
      v-if="$slots.header"
      class="bg-zinc-50 border-newItem font-bold px-4 py-2 text-lg"
      @click="$emit('clickHeader')">
      <slot name="header" />
    </div>

    <div class="p-4">
      <slot />
    </div>

    <div
      v-if="$slots.footer"
      class="d-flex p-4">
      <slot name="footer" />
    </div>
    <!--    <LoaderOverlay :show="loading" /> -->
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'DefaultPdkCard',

  props: {
    loading: {
      type: Boolean,
    },
  },

  emits: ['click-header', 'clickHeader'],
});
</script>
