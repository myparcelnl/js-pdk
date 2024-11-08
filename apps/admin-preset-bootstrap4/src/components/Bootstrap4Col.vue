<template>
  <div
    v-test="AdminComponent.Col"
    class="col">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {AdminComponent, type ColProps, type ColSlots} from '@myparcel-pdk/admin';

defineProps<ColProps>();
defineSlots<ColSlots>();
</script>
