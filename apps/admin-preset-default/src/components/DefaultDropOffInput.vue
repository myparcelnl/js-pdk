<template>
  <div v-test="AdminComponent.DropOffInput">
    <ul>
      <template
        v-for="[day, human] in Object.entries(weekdaysObject)"
        :key="day">
        <li>
          <span>{{ human }}</span>

          <PdkToggleInput
            v-model="toggleRefs[day]"
            :element="toggleElements[day]" />

          <div v-if="toggleRefs[day]">
            <PdkTimeInput
              v-model="cutoffRefs[day]"
              :element="cutoffElements[day]" />
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import {type PropType} from 'vue';
import {AdminComponent, type Settings, useDropOffInputContext} from '@myparcel-pdk/admin';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Settings.ModelDropOffPossibilities>,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

const {weekdaysObject, cutoffElements, toggleElements, toggleRefs, cutoffRefs} = useDropOffInputContext(
  props.modelValue,
  emit,
);
</script>
