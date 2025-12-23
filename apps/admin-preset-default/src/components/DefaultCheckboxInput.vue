<template>
  <label v-test="AdminComponent.CheckboxInput">
    {{ element.label }}
    <input
      :id="id"
      v-model="model"
      :disabled="element.isDisabled || element.isSuspended || element.isReadOnly"
      :name="id"
      :value="element.props?.value"
      type="checkbox" />
    <i />
  </label>
</template>

<script generic="T extends CheckboxInputModelValue" lang="ts" setup>
import {
  AdminComponent,
  type CheckboxInputEmits,
  type CheckboxInputModelValue,
  type CheckboxInputProps,
  useElementContext,
} from '@myparcel-dev/pdk-admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<CheckboxInputProps<T>>();
const emit = defineEmits<CheckboxInputEmits<T>>();

const {id, model} = useElementContext(props, emit);
</script>
