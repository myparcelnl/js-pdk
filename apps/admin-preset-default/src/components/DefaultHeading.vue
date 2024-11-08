<template>
  <component
    :is="`h${level}`"
    v-test="AdminComponent.Heading">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import {AdminComponent, type HeadingProps, type HeadingSlots} from '@myparcel-pdk/admin';

withDefaults(defineProps<HeadingProps>(), {
  level: 1,
});
defineSlots<HeadingSlots>();
</script>
