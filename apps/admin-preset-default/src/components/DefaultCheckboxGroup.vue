<template>
  <div>
    <PdkCheckboxInput
      v-for="(option, index) in options"
      :key="`${option.value}_${index}`"
      v-model="model"
      :element="element"
      :disabled="option.disabled || element.isDisabled || element.isSuspended"
      :label="option.label"
      :value="option.value" />
  </div>
</template>

<script lang="ts" setup>
import {ElementInstance, OptionsProp, useCheckboxGroupContext} from '@myparcel-pdk/frontend-admin-core/src';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: string | boolean; element: ElementInstance<OptionsProp<string | boolean>>}>();
const emit = defineEmits<(e: 'update:modelValue', value: string | boolean) => void>();

const {options, model} = useCheckboxGroupContext(props, emit);
</script>
