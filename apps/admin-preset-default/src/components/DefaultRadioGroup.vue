<template>
  <div v-test="AdminComponent.RadioGroup">
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

<script generic="T extends RadioGroupModelValue" lang="ts" setup>
import {
  AdminComponent,
  type RadioGroupEmits,
  type RadioGroupModelValue,
  type RadioGroupProps,
  useRadioGroupContext,
} from '@myparcel-dev/pdk-admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<RadioGroupProps<T>>();
const emit = defineEmits<RadioGroupEmits<T>>();

const {options, id, model, elements} = useRadioGroupContext(props, emit);
</script>
