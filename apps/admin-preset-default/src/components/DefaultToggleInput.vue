<template>
  <label>
    <input
      :id="id"
      v-model="model"
      :disabled="element.isDisabled || element.isSuspended"
      :value="true"
      type="checkbox" />

    <label :for="id">
      {{ translate(`toggle_${model ? 'yes' : 'no'}`) }}
    </label>
  </label>
</template>

<script lang="ts" setup>
import {ElementInstance, generateFieldId, useLanguage} from '@myparcel-pdk/frontend-admin-core';
import {useVModel} from '@vueuse/core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: boolean; element: ElementInstance}>();
const emit = defineEmits<(e: 'update:modelValue', value: boolean) => void>();

const model = useVModel(props, undefined, emit);

const id = generateFieldId(props.element);

const {translate} = useLanguage();
</script>
