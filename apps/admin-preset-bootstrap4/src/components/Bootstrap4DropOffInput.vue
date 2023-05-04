<template>
  <div class="card container w-100">
    <template
      v-for="[day, human] in Object.entries(weekdaysObject)"
      :key="day">
      <div class="row">
        <span class="col-12">{{ human }}</span>
      </div>
      <div class="row">
        <span class="col-3">
          <PdkToggleInput
            v-model="toggleRefs[day]"
            :element="toggleElements[day]" />
        </span>

        <span class="col-9">
          <div :class="{invisible: !toggleRefs[day]}">
            <PdkTimeInput
              v-model="cutoffRefs[day]"
              :element="cutoffElements[day]" />
          </div>
        </span>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import {PropType} from 'vue';
import {Settings} from '@myparcel-pdk/common/src';
import {useDropOffInputContext} from '@myparcel-pdk/frontend-admin-core/src';

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
