<template>
  <div
    v-test="[AdminComponent.TriStateInput, element]"
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

<script setup lang="ts" generic="T extends TriStateValue">
import {
  AdminComponent,
  type PdkElementEmits,
  type PdkElementProps,
  type TriStateValue,
  useTriStateInputContext,
} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<PdkElementProps<T>>();
const emit = defineEmits<PdkElementEmits<T>>();

const {model, inheritElement, inheritModel, toggleElement, toggleModel} = useTriStateInputContext(props, emit);
</script>
