<template>
  <component :is="component">
    <!-- Table row content -->
    <slot />
  </component>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

/**
 * The component that is used to render a table row in a PdkTable.
 */
export default defineComponent({
  name: 'DefaultPdkTableRow',
  props: {
    /**
     * Component to use as the table row.
     */
    component: {
      type: String,
      default: 'tr',
    },
  },
});
</script>
