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

<script lang="ts" setup>
import {
  AdminComponent,
  type ElementInstance,
  type Keyable,
  type OptionsProp,
  useRadioGroupContext,
} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: string; element: ElementInstance<OptionsProp<Keyable>>}>();
const emit = defineEmits<(e: 'update:modelValue', value: string) => void>();

const {options, id, model, elements} = useRadioGroupContext(props, emit);
</script>
