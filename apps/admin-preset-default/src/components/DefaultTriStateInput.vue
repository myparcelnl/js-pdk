<template>
  <div v-test="AdminComponent.TriStateInput">
    <input
      v-model="model"
      type="hidden" />

    <PdkToggleInput
      v-model="toggleModel"
      :element="toggleElement" />

    <PdkCheckboxInput
      v-model="inheritModel"
      :element="inheritElement" />
  </div>
</template>

<script lang="ts" setup>
import {
  AdminComponent,
  type TriStateInputEmits,
  type TriStateInputProps,
  useTriStateInputContext,
} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<TriStateInputProps>();
const emit = defineEmits<TriStateInputEmits>();

const {model, inheritElement, inheritModel, toggleElement, toggleModel} = useTriStateInputContext(props, emit);
</script>
