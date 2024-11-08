<template>
  <component
    :is="component"
    v-test="AdminComponent.TableCol">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import {AdminComponent, type TableColProps, type TableColSlots} from '@myparcel-pdk/admin';

withDefaults(defineProps<TableColProps>(), {component: 'td'});
defineSlots<TableColSlots>();
</script>
