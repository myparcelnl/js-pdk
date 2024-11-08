<template>
  <div
    v-test="AdminComponent.TriStateInput"
    class="gap-4 grid-cols-2 inline-grid items-center">
    <input
      v-model="model"
      type="hidden" />

    <PdkToggleInput
      v-model="toggleModel"
      :element="toggleElement" />

    <PdkCheckboxInput
      v-model="inheritModel"
      :element="{...inheritElement, label: undefined}" />
  </div>
</template>

<script generic="T extends TriState" lang="ts" setup>
import {
  AdminComponent,
  type TriState,
  type TriStateInputEmits,
  type TriStateInputProps,
  useTriStateInputContext,
} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<TriStateInputProps>();
const emit = defineEmits<TriStateInputEmits>();

const {model, inheritElement, inheritModel, toggleElement, toggleModel} = useTriStateInputContext(props, emit);
</script>
