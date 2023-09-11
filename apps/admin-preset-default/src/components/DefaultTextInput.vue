<template>
  <input
    :id="id"
    v-model.trim="model"
    v-test="[AdminComponent.TextInput, element]"
    :name="id"
    :disabled="element.isDisabled || element.isSuspended"
    :readonly="element.isReadOnly" />
</template>

<script lang="ts" setup>
import {toRefs} from 'vue';
import {useVModel} from '@vueuse/core';
import {AdminComponent, generateFieldId, type TextInputEmits, type TextInputProps} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<TextInputProps>();
const emit = defineEmits<TextInputEmits>();

const propRefs = toRefs(props);

const model = useVModel(props, undefined, emit);

const id = generateFieldId(propRefs.element);
</script>
