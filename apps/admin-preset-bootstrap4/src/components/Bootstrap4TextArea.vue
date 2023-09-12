<template>
  <textarea
    :id="id"
    v-model.trim="model"
    :name="id"
    :disabled="element.isDisabled || element.isSuspended"
    class="form-control" />
</template>

<script lang="ts" setup>
import {type TextAreaEmits, type TextAreaProps, useElementContext} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<TextAreaProps>();
const emit = defineEmits<TextAreaEmits>();

const {id, model} = useElementContext(props, emit);
</script>
