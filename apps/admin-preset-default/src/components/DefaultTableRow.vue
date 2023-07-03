<template>
  <component
    :is="component"
    v-test="AdminComponent.TableRow">
    <!-- Table row content -->
    <slot />
  </component>
</template>

<script lang="ts" setup>
/**
 * The component that is used to render a table row in a PdkTable.
 */

import {AdminComponent} from '@myparcel-pdk/admin';

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
