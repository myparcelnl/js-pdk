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
import {type TextInputEmits, type TextInputProps, useElementContext} from '@myparcel-dev/pdk-admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<TextInputProps>();
const emit = defineEmits<TextInputEmits>();

const {id, model} = useElementContext(props, emit);
</script>
