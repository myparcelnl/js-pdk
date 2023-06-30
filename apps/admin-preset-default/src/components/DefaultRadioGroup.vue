<template>
  <div>
    <PdkRadioInput
      v-for="option in options"
      :key="option.value"
      v-model="model"
      :disabled="element.isDisabled || element.isSuspended || options.length <= 1"
      :readonly="element.isReadOnly"
      :element="elements[option.value]"
      :name="id" />
  </div>
</template>

<script lang="ts" setup>
import {type ElementInstance, type OptionsProp, useRadioGroupContext} from '@myparcel-pdk/frontend-admin-core';
import {type Keyable} from '@myparcel-pdk/common';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: string; element: ElementInstance<OptionsProp<Keyable>>}>();
const emit = defineEmits<(e: 'update:modelValue', value: string) => void>();

const {options, id, model, elements} = useRadioGroupContext(props, emit);
</script>
