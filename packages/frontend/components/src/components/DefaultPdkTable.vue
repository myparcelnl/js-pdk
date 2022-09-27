<template>
  <table class="table table-borderless text-nowrap">
    <thead v-if="$slots.header">
      <slot name="header" />
    </thead>

    <TransitionGroup
      tag="tbody"
      name="mypa__table">
      <slot />
    </TransitionGroup>

    <tfoot v-if="$slots.footer">
      <slot name="footer" />
    </tfoot>
  </table>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'DefaultPdkTable',
});
</script>
