<template>
  <component
    :is="component"
    v-test="AdminComponent.TableCol">
    <!-- Table column content -->
    <slot />
  </component>
</template>

<script lang="ts" setup>
/**
 * The component that is used to render a table column in a PdkTable.
 */

import {AdminComponent} from '@myparcel-pdk/common';

defineProps({
  /**
   * Component to use as the table column.
   */
  component: {
    type: String,
    default: 'td',
  },
});
</script>
