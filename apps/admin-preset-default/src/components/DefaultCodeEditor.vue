<template>
  <PdkTextArea
    v-model.trim="model"
    v-test="AdminComponent.CodeEditor"
    :element="element" />
</template>

<script lang="ts" setup>
import {useVModel} from '@vueuse/core';
import {AdminComponent, type CodeEditorEmits, type CodeEditorProps} from '@myparcel-dev/pdk-admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<CodeEditorProps>();
const emit = defineEmits<CodeEditorEmits>();

const model = useVModel(props, undefined, emit);
</script>
