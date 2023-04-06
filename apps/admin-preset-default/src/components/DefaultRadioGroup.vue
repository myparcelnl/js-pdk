<template>
  <div>
    <PdkRadioInput
      v-for="option in options"
      :key="option.value"
      v-model="model"
      :name="id"
      :disabled="element.isDisabled || element.isSuspended || options.length <= 1"
      :element="elements[option.value]" />
  </div>
</template>

<script lang="ts" setup>
import {ElementInstance, OptionsProp, useRadioGroupContext} from '@myparcel-pdk/frontend-admin-core/src';
import {Keyable} from '@myparcel-pdk/common/src';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: string; element: ElementInstance<OptionsProp<Keyable>>}>();
const emit = defineEmits<(e: 'update:modelValue', value: string) => void>();

const {options, id, model, elements} = useRadioGroupContext(props, emit);
</script>
