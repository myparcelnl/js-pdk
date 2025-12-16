<template>
  <div v-test="AdminComponent.MultiDateInput">
    <Datepicker
      v-model="model"
      class="datepicker"
      multi-dates
      :enable-time-picker="false"
      :disabled-dates="disablePastAndToday"></Datepicker>
  </div>
</template>

<script setup lang="ts">
import {useVModel} from '@vueuse/core';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import {AdminComponent, type MultiDateInputEmits, type MultiDateInputProps} from '@myparcel-dev/pdk-admin';

const props = defineProps<MultiDateInputProps>();
const emit = defineEmits<MultiDateInputEmits>();

const model = useVModel(props, 'modelValue', emit);

const disablePastAndToday = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date <= today;
};
</script>

<style>
.datepicker {
  max-width: 400px;
}
</style>
