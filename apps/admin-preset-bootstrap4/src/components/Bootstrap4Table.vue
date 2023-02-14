<template>
  <div class="table-responsive">
    <table class="table table-sm table-striped">
      <thead v-if="$slots.header">
        <slot name="header" />
      </thead>

      <TransitionGroup
        :name="config?.transitions.tableRow"
        tag="tbody">
        <slot />
      </TransitionGroup>

      <tfoot v-if="$slots.footer">
        <slot name="footer" />
      </tfoot>
    </table>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useAdminConfig} from '@myparcel-pdk/frontend-core/src';

/**
 * @see import('@myparcel-pdk/admin-components').DefaultTable
 */
export default defineComponent({
  name: 'Bootstrap4Table',
  setup: () => ({
    config: useAdminConfig(),
  }),
});
</script>
