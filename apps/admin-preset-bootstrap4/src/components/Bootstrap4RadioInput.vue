<template>
  <div
    v-test="'RadioInput'"
    class="form-check">
    <input
      :id="id"
      v-model="model"
      :class="{
        'form-required': !element.isValid,
      }"
      :disabled="element.isDisabled || element.isSuspended"
      :value="element.props?.value"
      type="radio"
      v-bind="$attrs" />
    <label
      :for="id"
      class="form-check-label"
      v-text="element.label" />
  </div>
</template>

<script lang="ts">
export default {inheritAttrs: false};
</script>

<script lang="ts" setup>
import {ElementInstance, generateFieldId} from '@myparcel-pdk/frontend-admin-core';
import {useVModel} from '@vueuse/core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: string | number; element: ElementInstance}>();
const emit = defineEmits<(e: 'update:modelValue', value: string) => void>();

const model = useVModel(props, undefined, emit);

const id = generateFieldId(props.element);
</script>
