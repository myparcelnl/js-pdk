<template>
  <div class="form-check">
    <input
      :id="id"
      v-model="model"
      :disabled="element.isDisabled || element.isSuspended"
      class="form-check-input"
      type="checkbox" />
    <label
      :for="id"
      class="form-check-label">
    </label>
  </div>
</template>

<script setup lang="ts">
import {useVModel} from '@vueuse/core';
import {ElementInstance, generateFieldId} from '@myparcel-pdk/frontend-core/src';
import {useLanguage} from '@myparcel-pdk/frontend-core';

const props = defineProps<{
  element: ElementInstance;
  // eslint-disable-next-line vue/no-unused-properties
  modelValue: string | number | null;
}>();

const emit = defineEmits<(event: 'update:modelValue', value: string | number) => void>();

const model = useVModel(props, undefined, emit);
const id = generateFieldId(props.element);

const {translate} = useLanguage();
</script>
