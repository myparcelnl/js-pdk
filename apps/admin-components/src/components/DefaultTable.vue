<template>
  <table>
    <thead v-if="$slots.header">
      <!-- Table header -->
      <slot name="header" />
    </thead>

    <TransitionGroup
      :name="pdkConfig?.transitions.tableRow"
      tag="tbody">
      <!-- Table body -->
      <slot />
    </TransitionGroup>

    <tfoot v-if="$slots.footer">
      <!-- Table footer -->
      <slot name="footer" />
    </tfoot>
  </table>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {usePdkConfig} from '@myparcel-pdk/admin';

/**
 * A table component that can be used to render data via slots.
 */
export default defineComponent({
  name: 'DefaultTable',
  setup: () => ({
    pdkConfig: usePdkConfig(),
  }),
});
</script>
