<template>
  <component
    :is="`h${level}`"
    v-test="AdminComponent.Heading">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import {type PropType} from 'vue';
import {AdminComponent, type ElementInstance} from '@myparcel-pdk/admin';

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
