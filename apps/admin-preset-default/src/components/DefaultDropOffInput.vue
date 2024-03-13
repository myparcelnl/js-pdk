<template>
  <div v-test="[AdminComponent.DropOffInput, element]">
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
import {
  AdminComponent,
  type DropOffInputEmits,
  type DropOffInputProps,
  useDropOffInputContext,
} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<DropOffInputProps>();
const emit = defineEmits<DropOffInputEmits>();

const {weekdaysObject, cutoffElements, toggleElements, toggleRefs, cutoffRefs} = useDropOffInputContext(props, emit);
</script>
