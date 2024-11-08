<template>
  <div
    v-test="AdminComponent.RadioInput"
    class="form-check">
    <input
      :id="id"
      v-model="model"
      :class="{
        'form-required': !element.isValid,
      }"
      :disabled="element.isDisabled || element.isSuspended"
      :name="id"
      :value="element.props?.value"
      type="radio"
      v-bind="$attrs" />
    <label
      :for="id"
      class="form-check-label">
      <PdkIcon
        v-if="element.props?.icon"
        :icon="element.props.icon" />

      <PdkImage
        v-if="element.props?.image"
        :alt="element.label ?? ''"
        :src="element.props.image"
        width="24" />

      {{ element.label }}
    </label>
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
