<template>
  <div v-test="AdminComponent.Col">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {AdminComponent, type ColProps, type ColSlots} from '@myparcel-dev/pdk-admin';

defineProps<ColProps>();
defineSlots<ColSlots>();
</script>
