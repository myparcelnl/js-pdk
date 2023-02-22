<template>
  <div>
    <input
      :id="id"
      v-model="model"
      :disabled="element.isDisabled || element.isSuspended"
      :value="element.props?.value"
      type="radio" />
    <label :for="id">
      {{ translate(`toggle_${model ? 'yes' : 'no'}`) }}
    </label>
  </div>
</template>

<script lang="ts" setup>
import {generateFieldId, useLanguage} from '@myparcel-pdk/frontend-core/src';
import {useElement} from '@myparcel/vue-form-builder/src';
import {useVModel} from '@vueuse/core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: boolean}>();
const emit = defineEmits(['update:modelValue']);

const model = useVModel(props, undefined, emit);

const id = generateFieldId();
const element = useElement();

const {translate} = useLanguage();
</script>
