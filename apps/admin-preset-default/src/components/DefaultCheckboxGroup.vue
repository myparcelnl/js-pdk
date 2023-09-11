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

<script generic="T extends CheckboxGroupModelValue" lang="ts" setup>
import {
  AdminComponent,
  type CheckboxGroupEmits,
  type CheckboxGroupModelValue,
  type CheckboxGroupProps,
  useCheckboxGroupContext,
} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<CheckboxGroupProps<T>>();
const emit = defineEmits<CheckboxGroupEmits<T>>();

const {options, model} = useCheckboxGroupContext(props, emit);
</script>
