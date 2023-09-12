<template>
  <label v-test="[AdminComponent.CheckboxInput, element]">
    {{ element.label }}
    <input
      :id="id"
      v-model="model"
      :name="id"
      :disabled="element.isDisabled || element.isSuspended || element.isReadOnly"
      :readonly="element.isReadOnly"
      :value="element.props?.value"
      type="checkbox" />
    <i />
  </label>
</template>

<script generic="T extends CheckboxInputModelValue" lang="ts" setup>
import {toRefs} from 'vue';
import {useVModel} from '@vueuse/core';
import {
  AdminComponent,
  type CheckboxInputEmits,
  type CheckboxInputModelValue,
  type CheckboxInputProps,
  generateFieldId,
} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<CheckboxInputProps<T>>();
const emit = defineEmits<CheckboxInputEmits<T>>();

const propRefs = toRefs(props);

const model = useVModel(props, undefined, emit);

const id = generateFieldId(propRefs.element);
</script>
