<template>
  <table class="w-full">
    <thead
      v-if="$slots.header"
      class="text-left">
      <slot name="header" />
    </thead>

    <TransitionGroup
      :name="config?.transitions?.tableRow"
      tag="tbody">
      <slot />
    </TransitionGroup>

    <tfoot v-if="$slots.footer">
      <slot name="footer" />
    </tfoot>
  </table>
</template>

<script lang="ts" setup>
import {useAdminConfig} from '@myparcel-pdk/frontend-admin-core/src';

const config = useAdminConfig();
</script>
