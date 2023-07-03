<template>
  <table v-test="AdminComponent.Table">
    <thead v-if="$slots.header">
      <!-- Table header -->
      <slot name="header" />
    </thead>

    <TransitionGroup
      :name="config?.transitions?.tableRow"
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

<script lang="ts" setup>
/**
 * A table component that can be used to render data via slots.
 */
import {AdminComponent, useAdminConfig} from '@myparcel-pdk/admin';

const config = useAdminConfig();
</script>
