<template>
  <textarea
    :id="id"
    v-model.trim="model"
    v-test="AdminComponent.TextArea"
    :disabled="element.isDisabled || element.isSuspended"
    :name="id"
    class="form-control" />
</template>

<script lang="ts" setup>
import {AdminComponent, type TextAreaEmits, type TextAreaProps, useElementContext} from '@myparcel-dev/pdk-admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<TextAreaProps>();
const emit = defineEmits<TextAreaEmits>();

const {id, model} = useElementContext(props, emit);
</script>
