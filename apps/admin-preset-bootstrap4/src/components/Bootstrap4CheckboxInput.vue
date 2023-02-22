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
import {generateFieldId, useLanguage} from '@myparcel-pdk/frontend-core/src';
import {useElement} from '@myparcel/vue-form-builder/src';
import {useVModel} from '@vueuse/core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: string | number | null}>();
const emit = defineEmits(['update:modelValue']);

const model = useVModel(props, undefined, emit);

const element = useElement();
const id = generateFieldId();

const {translate} = useLanguage();
</script>
