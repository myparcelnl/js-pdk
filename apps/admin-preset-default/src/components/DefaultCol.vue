<template>
  <div v-test="AdminComponent.Col"><slot /></div>
</template>

<script lang="ts" setup>
import {AdminComponent} from '@myparcel-pdk/admin';

defineProps<{
  // eslint-disable-next-line vue/no-unused-properties
  span?: number;
}>();
</script>
