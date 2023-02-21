<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';

const props = defineProps<{
  columns?: number | string;
  collapseGutters?: boolean;
}>();

const classes = computed(() => {
  return [props.columns ? `row-cols-${props.columns}` : 'row', props.collapseGutters ? 'no-gutters' : ''];
});
</script>
