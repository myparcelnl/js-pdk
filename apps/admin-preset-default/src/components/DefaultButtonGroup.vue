<template>
  <div v-test="AdminComponent.ButtonGroup">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {AdminComponent, type ButtonGroupProps, type ButtonGroupSlots} from '@myparcel-pdk/admin';

defineProps<ButtonGroupProps>();
defineSlots<ButtonGroupSlots>();
</script>
