<template>
  <table v-test="AdminComponent.Table">
    <thead v-if="$slots.header">
      <!-- Table header -->
      <slot name="header" />
    </thead>

    <TransitionGroup
      v-if="transitionName"
      :name="transitionName"
      tag="tbody">
      <!-- Table body -->
      <slot />
    </TransitionGroup>

    <tbody v-else>
      <slot />
    </tbody>

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
import {computed} from 'vue';
import {AdminComponent, useAdminConfig} from '@myparcel-pdk/admin';

const props = defineProps<{transition?: false | string}>();

const config = useAdminConfig();

const transitionName = computed(() => {
  return props.transition === false ? undefined : props.transition ?? config.transitions?.tableRow;
});
</script>
