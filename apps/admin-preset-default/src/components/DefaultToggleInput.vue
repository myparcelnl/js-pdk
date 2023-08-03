<template>
  <label v-test="[AdminComponent.ToggleInput, element]">
    <input
      :id="id"
      v-model="model"
      :name="id"
      :disabled="element.isDisabled || element.isSuspended || element.isReadOnly"
      :readonly="element.isReadOnly"
      :value="true"
      type="checkbox" />

    <label :for="id">
      {{ translate(`toggle_${model ? 'yes' : 'no'}`) }}
    </label>
  </label>
</template>

<script lang="ts" setup>
import {useVModel} from '@vueuse/core';
import {AdminComponent, type ElementInstance, generateFieldId, useLanguage} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: boolean; element: ElementInstance}>();
const emit = defineEmits<(e: 'update:modelValue', value: boolean) => void>();

const model = useVModel(props, undefined, emit);

const id = generateFieldId(props.element);

const {translate} = useLanguage();
</script>
