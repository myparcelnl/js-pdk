<template>
  <div class="table-responsive">
    <table
      v-test="AdminComponent.Table"
      class="table table-sm table-striped">
      <thead v-if="$slots.header">
        <slot name="header" />
      </thead>

      <TransitionGroup
        v-if="transition"
        :name="transition"
        tag="tbody">
        <slot />
      </TransitionGroup>

      <tbody v-else>
        <slot />
      </tbody>

      <tfoot v-if="$slots.footer">
        <slot name="footer" />
      </tfoot>
    </table>
  </div>
</template>

<script lang="ts" setup>
import {useTableContext} from '@myparcel-pdk/admin';
import {AdminComponent, type TableProps, type TableSlots} from '@myparcel-pdk/admin';

const props = defineProps<TableProps>();

defineSlots<TableSlots>();

const {transition} = useTableContext(props);
</script>
