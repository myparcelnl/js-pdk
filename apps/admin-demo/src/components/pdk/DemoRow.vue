<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';

const props = defineProps<{
  collapseGutters?: boolean;
  columns?: number;
}>();

const classes = computed(() => {
  return [
    'grid',
    props.collapseGutters ? '' : 'gap-4',
    props.columns ? `grid-cols-${props.columns}` : 'grid-cols-auto',
  ];
});
</script>
