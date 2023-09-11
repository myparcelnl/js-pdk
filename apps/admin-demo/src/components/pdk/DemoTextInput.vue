<template>
  <input
    :id="id"
    v-model.trim="model"
    :name="id"
    :disabled="element.isDisabled || element.isSuspended"
    :readonly="element.isReadOnly"
    class="border px-3 py-2 rounded" />
</template>

<script lang="ts" setup>
import {toRefs} from 'vue';
import {useVModel} from '@vueuse/core';
import {generateFieldId, type TextInputEmits, type TextInputProps} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<TextInputProps>();
const emit = defineEmits<TextInputEmits>();

const propRefs = toRefs(props);

const model = useVModel(props, undefined, emit);

const id = generateFieldId(propRefs.element);
</script>
