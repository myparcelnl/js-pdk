<template>
  <textarea
    :id="id"
    v-model.trim="model"
    v-test="AdminComponent.TextArea"
    :name="id"
    :disabled="element.isDisabled || element.isSuspended"
    :readonly="element.isReadOnly" />
</template>

<script lang="ts" setup>
import {toRefs} from 'vue';
import {useVModel} from '@vueuse/core';
import {AdminComponent, generateFieldId, type TextAreaEmits, type TextAreaProps} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<TextAreaProps>();
const emit = defineEmits<TextAreaEmits>();

const propRefs = toRefs(props);

const model = useVModel(props, undefined, emit);

const id = generateFieldId(propRefs.element);
</script>
