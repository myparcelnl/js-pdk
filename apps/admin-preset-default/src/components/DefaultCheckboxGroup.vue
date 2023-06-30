<template>
  <div v-test="AdminComponent.CheckboxGroup">
    <PdkCheckboxInput
      v-for="(option, index) in options"
      :key="`${option.value}_${index}`"
      v-model="model"
      :disabled="option.disabled || element.isDisabled || element.isSuspended || element.isReadOnly"
      :readonly="element.isReadOnly"
      :element="element"
      :label="option.label"
      :value="option.value" />
  </div>
</template>

<script lang="ts" setup>
import {type ElementInstance, type OptionsProp, useCheckboxGroupContext} from '@myparcel-pdk/frontend-admin-core';
import {AdminComponent} from '@myparcel-pdk/common';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: string | boolean; element: ElementInstance<OptionsProp<string | boolean>>}>();
const emit = defineEmits<(e: 'update:modelValue', value: string | boolean) => void>();

const {options, model} = useCheckboxGroupContext(props, emit);
</script>
