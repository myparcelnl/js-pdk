<template>
  <div v-test="AdminComponent.Row">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {AdminComponent, type RowProps, type RowSlots} from '@myparcel-dev/pdk-admin';

defineProps<RowProps>();
defineSlots<RowSlots>();
</script>
