<template>
  <div class="table-responsive">
    <table class="table table-sm table-striped">
      <thead v-if="$slots.header">
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
  </div>
</template>

<script lang="ts" setup>
import {useAdminConfig} from '@myparcel-pdk/admin';

const config = useAdminConfig();
</script>
