<template>
  <input
    :id="id"
    v-model.trim="model"
    v-test="AdminComponent.TextInput"
    :disabled="element.isDisabled || element.isSuspended"
    :name="id"
    class="form-control" />
</template>

<script lang="ts" setup>
import {AdminComponent, type TextInputEmits, type TextInputProps, useElementContext} from '@myparcel-dev/pdk-admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<TextInputProps>();
const emit = defineEmits<TextInputEmits>();

const {id, model} = useElementContext(props, emit);
</script>
