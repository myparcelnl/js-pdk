<template>
  <label v-test="AdminComponent.CheckboxInput">
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

<script lang="ts" setup>
import {useVModel} from '@vueuse/core';
import {AdminComponent, type ElementInstance, generateFieldId} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue?: string | number | symbol | boolean; element: ElementInstance}>();
const emit = defineEmits<(e: 'update:modelValue', value: string | number | symbol | boolean) => void>();

const model = useVModel(props, undefined, emit);

const id = generateFieldId(props.element);
</script>
