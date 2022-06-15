<template>
  <component :is="component">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PsTableRow',
  props: {
    component: {
      type: String,
      default: 'tr',
    },
  },
});
</script>
