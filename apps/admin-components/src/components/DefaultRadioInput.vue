<template>
  <div>
    <input
      :id="id"
      v-model="model"
      :disabled="element.isDisabled || element.isSuspended"
      :value="element.props.value"
      type="radio" />
    <label :for="id">
      {{ translate(`toggle_${model ? 'yes' : 'no'}`) }}
    </label>
  </div>
</template>

<script lang="ts" setup>
import {ElementInstance, generateFieldId, useLanguage} from '@myparcel-pdk/frontend-core/src';
import {useVModel} from '@vueuse/core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: string | number; element: ElementInstance}>();
const emit = defineEmits<(e: 'update:modelValue', value: string | number) => void>();

const model = useVModel(props, undefined, emit);

const id = generateFieldId(props.element);

const {translate} = useLanguage();
</script>
