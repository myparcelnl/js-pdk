<template>
  <div
    v-test="[AdminComponent.RadioInput, element]"
    class="form-check">
    <input
      :id="id"
      v-model="model"
      :name="id"
      :class="{
        'form-required': !element.isValid,
      }"
      :disabled="element.isDisabled || element.isSuspended"
      :value="element.props?.value"
      type="radio"
      v-bind="$attrs" />
    <label
      :for="id"
      class="form-check-label"
      v-text="element.label" />
  </div>
</template>

<script lang="ts">
export default {inheritAttrs: false};
</script>

<script lang="ts" setup>
import {AdminComponent, type RadioInputEmits, type RadioInputProps, useElementContext} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<RadioInputProps>();
const emit = defineEmits<RadioInputEmits>();

const {id, model} = useElementContext(props, emit);
</script>
