<template>
  <div>
    <PdkToggleInput
      v-model="toggleModel"
      :element="element" />

    <PdkCheckboxInput
      v-model="inheritValueModel"
      :element="inheritValueElement" />
  </div>
</template>

<script setup lang="ts" generic="T extends TriStateValue">
import {
  type PdkElementEmits,
  type PdkElementProps,
  type TriStateValue,
  useTriStateInputContext,
} from '@myparcel-pdk/frontend-admin-core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<PdkElementProps<T>>();
const emit = defineEmits<PdkElementEmits<T>>();

const {inheritValueElement, inheritValueModel, toggleModel} = useTriStateInputContext(props, emit);
</script>
