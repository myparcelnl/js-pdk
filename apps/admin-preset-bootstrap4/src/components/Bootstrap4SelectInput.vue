<template>
  <select
    :id="id"
    v-model="model"
    :class="{
      disabled: element.props?.options?.length === 1 || element.isDisabled || element.isSuspended,
    }"
    class="custom-select form-control">
    <option
      v-for="(item, index) in element.props?.options ?? []"
      :key="index"
      :value="item.value"
      v-text="item.label" />
  </select>
</template>

<script setup lang="ts">
import {generateFieldId, useElement} from '@myparcel-pdk/frontend-core/src';
import {useVModel} from '@vueuse/core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: string | number | null}>();
const emit = defineEmits(['update:modelValue']);

const model = useVModel(props, undefined, emit);

const element = useElement();
const id = generateFieldId();
</script>
