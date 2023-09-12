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
import {AdminComponent, type TextInputEmits, type TextInputProps, useElementContext} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<TextInputProps>();
const emit = defineEmits<TextInputEmits>();

const {id, model} = useElementContext(props, emit);
</script>
