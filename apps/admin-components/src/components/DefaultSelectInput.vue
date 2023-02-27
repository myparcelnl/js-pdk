<template>
  <select
    :id="id"
    v-model="model"
    :disabled="options.length === 1 || element.isDisabled || element.isSuspended">
    <option
      v-for="(item, index) in options"
      :key="index"
      :disabled="item.disabled"
      :value="item.value"
      v-text="item.label" />
  </select>
</template>

<script lang="ts" setup>
/**
 * A select box. Renders a list of options which each have their own value.
 */

import {generateFieldId, useElement, useSelectInputContext} from '@myparcel-pdk/frontend-core/src';
import {useVModel} from '@vueuse/core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps({modelValue: {type: [String, Number], default: null}});
const emit = defineEmits(['update:modelValue']);

const model = useVModel(props, undefined, emit);

const element = useElement();
const id = generateFieldId();

// @ts-expect-error props are not typed
const {options} = useSelectInputContext(model, element.props?.options ?? []);
</script>
