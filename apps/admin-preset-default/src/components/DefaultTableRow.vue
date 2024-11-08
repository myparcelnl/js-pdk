<template>
  <component
    :is="component"
    v-test="AdminComponent.TableRow">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import {AdminComponent, type TableRowProps, type TableRowSlots} from '@myparcel-pdk/admin';

withDefaults(defineProps<TableRowProps>(), {component: 'tr'});
defineSlots<TableRowSlots>();
</script>
