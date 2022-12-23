<template>
  <component :is="component">
    <!-- Table column content -->
    <slot />
  </component>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

/**
 * The component that is used to render a table column in a PdkTable.
 * @see import('@myparcel/pdk-components').DefaultTableCol
 */
export default defineComponent({
  name: 'DemoTableCol',
  props: {
    /**
     * Component to use as the table column.
     */
    component: {
      type: String,
      default: 'td',
    },
  },
});
</script>
