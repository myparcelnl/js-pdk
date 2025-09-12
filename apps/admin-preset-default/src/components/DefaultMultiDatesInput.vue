<template>
  <div v-test="AdminComponent.MultiDatesInput">
    <Datepicker
      v-model="dates"
      multi-dates
      :enable-time-picker="false"
      :disabled-dates="disablePastAndToday"></Datepicker>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import {AdminComponent, type MultiDatesInputEmits, type MultiDatesInputProps} from '@myparcel-pdk/admin';
import '@vuepic/vue-datepicker/dist/main.css';

const props = defineProps<MultiDatesInputProps>();
const emit = defineEmits<MultiDatesInputEmits>();

const dates = ref();
console.log(props, 'this is props');
console.log(emit, 'this is emit');

const disablePastAndToday = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date <= today;
};
</script>

<style scoped></style>
