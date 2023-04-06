<template>
  <component :is="`h${level}`">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import {ElementInstance} from '@myparcel-pdk/frontend-core/src';
import {PropType} from 'vue';

defineProps({
  // eslint-disable-next-line vue/no-unused-properties
  element: {
    type: Object as PropType<ElementInstance>,
    default: null,
  },

  level: {
    type: [Number, String],
    default: 1,
  },
});
</script>
