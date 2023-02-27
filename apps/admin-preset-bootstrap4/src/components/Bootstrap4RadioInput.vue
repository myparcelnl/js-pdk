<template>
  <div class="form-check">
    <input
      :id="id"
      v-model="model"
      :disabled="element.isDisabled || element.isSuspended"
      :value="element.props?.value"
      class="form-check-input"
      type="radio" />
    <label
      :for="id"
      class="form-check-label">
      {{ translate(`toggle_${model ? 'yes' : 'no'}`) }}
    </label>
  </div>
</template>

<script setup lang="ts">
import {ElementInstance, generateFieldId, useLanguage} from '@myparcel-pdk/frontend-core/src';
import {useVModel} from '@vueuse/core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: string | number | null; element: ElementInstance}>();
const emit = defineEmits<(e: 'update:modelValue', value: string | number) => void>();

const model = useVModel(props, undefined, emit);

const id = generateFieldId(props.element);

const {translate} = useLanguage();
</script>
