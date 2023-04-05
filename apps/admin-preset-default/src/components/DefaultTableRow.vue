<template>
  <component :is="component">
    <!-- Table row content -->
    <slot />
  </component>
</template>

<script lang="ts" setup>
/**
 * The component that is used to render a table row in a PdkTable.
 */

defineProps({
  /**
   * Component to use as the table row.
   */
  component: {
    type: String,
    default: 'tr',
  },
});
</script>
