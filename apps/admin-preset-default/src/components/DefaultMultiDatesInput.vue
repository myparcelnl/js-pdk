<template>
  <div v-test="AdminComponent.MultiDatesInput">
    <p>Multi date input works!!!</p>
  </div>
</template>

<script setup lang="ts">
import {AdminComponent, type MultiDatesInputEmits, type MultiDatesInputProps} from '@myparcel-pdk/admin';

const props = defineProps<MultiDatesInputProps>();
const emit = defineEmits<MultiDatesInputEmits>();
</script>

<style scoped></style>
