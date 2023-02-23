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
import {generateFieldId, useElement, useLanguage} from '@myparcel-pdk/frontend-core/src';
import {useVModel} from '@vueuse/core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps({modelValue: {type: Boolean}});
const emit = defineEmits(['update:modelValue']);

const model = useVModel(props, undefined, emit);

const {translate} = useLanguage();

const element = useElement();
const id = generateFieldId();
</script>
