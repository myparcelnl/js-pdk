<template>
  <div
    v-test="AdminComponent.Row"
    class="row">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {AdminComponent, type RowProps, type RowSlots} from '@myparcel-pdk/admin';

defineProps<RowProps>();
defineSlots<RowSlots>();
</script>
